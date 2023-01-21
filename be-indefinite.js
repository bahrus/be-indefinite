import { define } from 'be-decorated/DE.js';
import { register } from 'be-hive/register.js';
export class BeIndefinite extends EventTarget {
    async checkForScript(pp, mold) {
        const { self, meta, proxy } = pp;
        const { exportableScript } = meta;
        if (exportableScript !== undefined) {
            const { _modExport } = exportableScript;
            if (_modExport) {
                return this.resolveHostProp(pp);
            }
            else {
                return [{}, {
                        resolveHostProp: { on: 'load', of: exportableScript }
                    }];
            }
        }
        const script = self.content.querySelector('script');
        if (script === null) {
            return mold;
        }
        const clonedScript = meta.exportableScript = script.cloneNode(true);
        script.remove();
        return await this.loadScript(pp, clonedScript);
    }
    resolveHostProp(pp) {
        const { meta, proxy } = pp;
        const { exportableScript } = meta;
        const { _modExport } = exportableScript;
        proxy.islet = _modExport.islet;
        return {
            resolved: true
        };
    }
    async loadScript(pp, script) {
        const be = 'be-exportable';
        if (customElements.get(be) === undefined) {
            import('be-exportable/be-exportable.js');
            await customElements.whenDefined(be);
            const decorator = document.createElement(be);
            await decorator.attach(script);
            script.remove();
        }
        else {
            const decorator = document.createElement(be);
            await decorator.attach(script);
        }
        return [{}, {
                resolveHostProp: { on: 'load', of: script }
            }];
    }
    //#transformer: Transformer | undefined;
    async instantiate(ip) {
        const { host, target } = ip;
        const pp = this.proxy;
        const { islet, transform, self, observe } = pp;
        const { DTR } = await import('trans-render/lib/DTR.js');
        const { getAdjacentChildren } = await import('trans-render/lib/getAdjacentChildren.js');
        const ctx = {
            host,
            match: transform,
        };
        const transformer = new DTR(ctx);
        const clone = self.content.cloneNode(true);
        if (islet !== undefined) {
            Object.assign(host, islet(host));
        }
        await transformer.transform(clone);
        const cnt = clone.childNodes.length;
        if (target.nextElementSibling === null && target.parentElement !== null) {
            target.parentElement.appendChild(clone);
        }
        else {
            const { insertAdjacentClone } = await import('trans-render/lib/insertAdjacentClone.js');
            insertAdjacentClone(clone, target, 'afterend');
        }
        const refTempl = document.createElement('template');
        refTempl.dataset.cnt = cnt + '';
        refTempl.beDecorated = {
        //scope: host
        };
        target.insertAdjacentElement('afterend', refTempl);
        host.addEventListener('prop-changed', e => {
            const prop = e.detail.prop;
            if (observe.includes(prop)) {
                islet(host);
                ctx.host = host;
                const children = getAdjacentChildren(refTempl);
                transformer.transform(children);
            }
        });
    }
}
const tagName = 'be-indefinite';
const ifWantsToBe = 'indefinite';
const upgrade = 'template';
define({
    config: {
        tagName,
        propDefaults: {
            ifWantsToBe,
            forceVisible: [upgrade],
            upgrade,
            virtualProps: [
                'transform', 'islet', 'meta',
                'isC', 'observe'
            ],
            proxyPropDefaults: {
                isC: true
            }
        },
        actions: {
            checkForScript: {
                ifAllOf: ['isC', 'meta'],
                returnObjMold: {
                    prepResolved: true
                }
            },
            cloneTemplate: {
                ifAllOf: ['host', 'prepResolved', 'transform'],
                ifNoneOf: ['ref']
            },
            // instantiate: {
            //     ifAllOf: ['clonedTemplate', 'target'],
            //     ifNoneOf: ['ref']
            // },
            // alter: {
            //     ifAllOf: ['ref'],
            //     ifKeyIn: ['host']
            // }
        }
    },
    complexPropDefaults: {
        controller: BeIndefinite
    }
});
register(ifWantsToBe, upgrade, tagName);

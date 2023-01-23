import { define } from 'be-decorated/DE.js';
import { register } from 'be-hive/register.js';
export class BeIndefinite extends EventTarget {
    async extractIslets(pp, mold) {
        const { self, meta, proxy } = pp;
        const scripts = Array.from(self.content.querySelectorAll('script'));
        meta.exportableScripts = [];
        meta.transformIslets = [];
        const { exportableScripts, transformIslets } = meta;
        for (const script of scripts) {
            const clonedScript = script.cloneNode(true);
            if (clonedScript.innerHTML.trim().startsWith('({')) {
                clonedScript.innerHTML = clonedScript.innerHTML.replace('({', 'export const islet = ({');
            }
            exportableScripts.push(clonedScript);
            transformIslets.push(await this.loadIslet(clonedScript));
            script.remove();
        }
        return mold;
    }
    loadIslet(script) {
        return new Promise(async (resolve) => {
            const be = 'be-exportable';
            script.addEventListener('load', e => {
                const transformIslet = {
                    islet: script._modExport.islet,
                    transform: JSON.parse(script.getAttribute('transform')),
                };
                resolve(transformIslet);
            }, { once: true });
            if (customElements.get(be) === undefined) {
                import('be-exportable/be-exportable.js');
                await customElements.whenDefined(be);
                const decorator = document.createElement(be);
                await decorator.attach(script);
            }
            else {
                const decorator = document.createElement(be);
                await decorator.attach(script);
            }
        });
    }
    //#transformer: Transformer | undefined;
    async instantiate(ip) {
        import('be-free-ranged/be-free-ranged.js');
        const bfr = 'be-free-ranged';
        await customElements.whenDefined(bfr);
        const bfrInstance = document.createElement(bfr);
        const refTempl = document.createElement('template');
        const { host, target } = ip;
        const pp = this.proxy;
        const { meta, insertPosition } = pp;
        target.insertAdjacentElement(insertPosition, refTempl);
        const { transformIslets } = meta;
        refTempl.beDecorated = {
            freeRanged: {
                transformIslets,
                host,
                template: this.proxy.self
            }
        };
        bfrInstance.attach(refTempl);
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
                'meta', 'insertPosition'
            ],
            proxyPropDefaults: {
                insertPosition: 'afterend',
            }
        },
        actions: {
            extractIslets: {
                ifAllOf: ['meta'],
                returnObjMold: {
                    resolved: true
                }
            },
        }
    },
    complexPropDefaults: {
        controller: BeIndefinite
    }
});
register(ifWantsToBe, upgrade, tagName);

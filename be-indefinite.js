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
        target.insertAdjacentElement('afterend', refTempl);
        const pp = this.proxy;
        const { meta } = pp;
        const { transformIslets } = meta;
        refTempl.beDecorated = {
            freeRanged: {
                transformIslets,
                host,
                template: this.proxy.self
            }
        };
        bfrInstance.attach(refTempl);
        // const {host, target} = ip;
        // const pp = (this as any).proxy as PP;
        // const {meta, self} = pp;
        // const {DTR} = await import('trans-render/lib/DTR.js');
        // const {getAdjacentChildren} = await import('trans-render/lib/getAdjacentChildren.js');
        // const {transformIslets} = meta!;
        // for(const transformIslet of transformIslets){
        //     const {transform, islet} = transformIslet;
        //     const ctx: RenderContext = {
        //         host,
        //         match: transform,
        //     };
        //     const transformer = new DTR(ctx);
        //     const clone = self.content.cloneNode(true) as DocumentFragment;
        //     if(islet !== undefined){
        //         Object.assign(host!, islet(host));
        //     }
        //     await transformer.transform(clone);
        //     const cnt = clone.childNodes.length;
        //     if(target!.nextElementSibling === null && target!.parentElement !== null){
        //         target!.parentElement.appendChild(clone);
        //     }else{
        //         const {insertAdjacentClone} = await import('trans-render/lib/insertAdjacentClone.js');
        //         insertAdjacentClone(clone, target!, 'afterend');
        //     }
        //     const refTempl = document.createElement('template') as any;
        //     refTempl.dataset.cnt = cnt + '';
        //     refTempl.beDecorated = {
        //         //scope: host
        //     };
        //     target!.insertAdjacentElement('afterend', refTempl);
        //     // host!.addEventListener('prop-changed', e => {
        //     //     const prop = (e as CustomEvent).detail.prop;
        //     //     if(observe!.includes(prop)){
        //     //         islet(host);
        //     //         ctx.host = host;
        //     //         const children = getAdjacentChildren(refTempl);
        //     //         transformer.transform(children);
        //     //     }
        //     // });
        // }
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
                'meta'
            ],
            proxyPropDefaults: {
                isC: true
            }
        },
        actions: {
            extractIslets: {
                ifAllOf: ['meta'],
                returnObjMold: {
                    resolved: true
                }
            },
            cloneTemplate: {
                ifAllOf: ['host', 'prepResolved', 'transform'],
                ifNoneOf: ['ref']
            },
        }
    },
    complexPropDefaults: {
        controller: BeIndefinite
    }
});
register(ifWantsToBe, upgrade, tagName);

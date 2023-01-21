import {define, BeDecoratedProps} from 'be-decorated/DE.js';
import {Proxy, PP, Actions, VirtualProps, PPP, PPE, Service, InstantiateProps, TransformIslet} from './types';
import {register} from 'be-hive/register.js';
import { ExportableScript } from 'be-exportable/types';
import { Attachable, Transformer, RenderContext } from 'trans-render/lib/types';

export class BeIndefinite extends EventTarget implements Actions, Service{
    async extractIslets(pp: PP, mold: PPP): Promise<PPP | PPE> {
        const {self, meta, proxy} = pp;
        const scripts = Array.from(self.content.querySelectorAll('script'));
        meta!.exportableScripts = [];
        meta!.transformIslets = [];
        const {exportableScripts, transformIslets} = meta!;
        for(const script of scripts){
            const clonedScript  = script.cloneNode(true) as ExportableScript;
            exportableScripts.push(clonedScript);
            transformIslets.push(await this.loadIslet(clonedScript));
            script.remove();
        }
        return mold;
        
    }

    loadIslet(script: ExportableScript): Promise<TransformIslet>{
        return new Promise(async resolve => {
            const be = 'be-exportable';
            script.addEventListener('load', e => {
                const transformIslet: TransformIslet = {
                    islet: script._modExport.islet,
                    transform: JSON.parse(script.getAttribute('transform')!),
                };
                resolve(transformIslet);
            }, {once: true});
            if(customElements.get(be) === undefined){
                import('be-exportable/be-exportable.js');
                await customElements.whenDefined(be);
                const decorator = document.createElement(be) as any as Attachable;
                await decorator.attach(script);   
                   
            }else{
                const decorator = document.createElement(be) as any as Attachable;
                await decorator.attach(script);
            }
        });

    }



    //#transformer: Transformer | undefined;
    async instantiate(ip: InstantiateProps){
        const {host, target} = ip;
        const pp = (this as any).proxy as PP;
        const {meta, self} = pp;
        const {DTR} = await import('trans-render/lib/DTR.js');
        const {getAdjacentChildren} = await import('trans-render/lib/getAdjacentChildren.js');
        const {transformIslets} = meta!;
        for(const transformIslet of transformIslets){
            const {transform, islet} = transformIslet;
            const ctx: RenderContext = {
                host,
                match: transform,
            };
            const transformer = new DTR(ctx);
            const clone = self.content.cloneNode(true) as DocumentFragment;
            if(islet !== undefined){
                Object.assign(host!, islet(host));
            }
            await transformer.transform(clone);
            const cnt = clone.childNodes.length;
            if(target!.nextElementSibling === null && target!.parentElement !== null){
                target!.parentElement.appendChild(clone);
            }else{
                const {insertAdjacentClone} = await import('trans-render/lib/insertAdjacentClone.js');
                insertAdjacentClone(clone, target!, 'afterend');
            }
            const refTempl = document.createElement('template') as any;
            refTempl.dataset.cnt = cnt + '';
            refTempl.beDecorated = {
                //scope: host
            };
            target!.insertAdjacentElement('afterend', refTempl);
            // host!.addEventListener('prop-changed', e => {
            //     const prop = (e as CustomEvent).detail.prop;
            //     if(observe!.includes(prop)){
            //         islet(host);
            //         ctx.host = host;
            //         const children = getAdjacentChildren(refTempl);
            //         transformer.transform(children);
            //     }
                
                
            // });
        }



    }
}

const tagName = 'be-indefinite';
const ifWantsToBe = 'indefinite';
const upgrade = 'template';

define<Proxy & BeDecoratedProps<Proxy, Actions>, Actions>({
    config:{
        tagName,
        propDefaults:{
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
        actions:{
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
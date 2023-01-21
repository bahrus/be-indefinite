import {define, BeDecoratedProps} from 'be-decorated/DE.js';
import {Proxy, PP, Actions, VirtualProps, PPP, PPE} from './types';
import {register} from 'be-hive/register.js';
import { ExportableScript } from 'be-exportable/types';
import { Attachable, Transformer, RenderContext } from 'trans-render/lib/types';

export class BeIndefinite extends EventTarget implements Actions{
    async checkForScript(pp: PP, mold: PPP): Promise<PPP | PPE> {
        const {self, meta, proxy} = pp;
        const {exportableScript} = meta!;
        if(exportableScript !== undefined){
            const {_modExport} = exportableScript;
            if(_modExport){
                return this.resolveHostProp(pp);
            }else{
                return [{}, {
                    resolveHostProp: {on: 'load', of: exportableScript}
                }] as PPE;
            }

        }
        const script = self.content.querySelector('script') as ExportableScript;
        if(script === null){
            return mold;
        }
        const clonedScript = meta!.exportableScript = script.cloneNode(true) as ExportableScript;
        script.remove();
        return await this.loadScript(pp, clonedScript);
        
    }

    resolveHostProp(pp: PP): PPP {
        const {meta, proxy} = pp;
        const {exportableScript} = meta!;
        const {_modExport} = exportableScript;
        proxy.hostPrep = _modExport.hostPrep;
        return {
            prepResolved: true
        } as PPP;
    }

    async loadScript(pp: PP, script: ExportableScript) {
        const be = 'be-exportable';
        if(customElements.get(be) === undefined){
            import('be-exportable/be-exportable.js');
            await customElements.whenDefined(be);
            const decorator = document.createElement(be) as any as Attachable;
            await decorator.attach(script);   
            script.remove();         
        }else{
            const decorator = document.createElement(be) as any as Attachable;
            await decorator.attach(script);
        }
        return [{}, {
            resolveHostProp: {on: 'load', of: script}
        }] as PPE;
    }

    //#transformer: Transformer | undefined;
    async cloneTemplate(pp: PP){
        const {host, hostPrep, transform, self, target, observe} = pp;
        //const {Tx} = await import('trans-render/lib/Tx.js');
        const {DTR} = await import('trans-render/lib/DTR.js');
        const {getAdjacentChildren} = await import('trans-render/lib/getAdjacentChildren.js');
        const ctx: RenderContext = {
            host,
            transform,
        };
        const transformer = new DTR(ctx);
        const clone = self.content.cloneNode(true) as DocumentFragment;
        if(hostPrep !== undefined){
            hostPrep(host);
        }
        await transformer.transform(clone);
        const cnt = clone.childNodes.length;
        if(target!.nextElementSibling === null && target!.parentElement !== null){
            target!.parentElement.appendChild(clone);
        }else{
            const {insertAdjacentClone} = await import('trans-render/lib/insertAdjacentClone.js');
            insertAdjacentClone(clone, target!, 'afterend');
        }
        const refTempl = document.createElement('template');
        refTempl.dataset.cnt = cnt + '';
        
        host!.addEventListener('prop-changed', e => {
            const prop = (e as CustomEvent).detail.prop;
            if(observe!.includes(prop)){
                hostPrep(host);
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

define<Proxy & BeDecoratedProps<Proxy, Actions>, Actions>({
    config:{
        tagName,
        propDefaults:{
            ifWantsToBe,
            forceVisible: [upgrade],
            upgrade,
            virtualProps: [
                'transform', 'hostPrep', 'target',  'host', 'meta',
                'isC', 'clonedTemplate', 'ref', 'prepResolved', 'observe'
            ],
            proxyPropDefaults: {
                isC: true
            }
        },
        actions:{
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
            instantiate: {
                ifAllOf: ['clonedTemplate', 'target'],
                ifNoneOf: ['ref']
            },
            alter: {
                ifAllOf: ['ref'],
                ifKeyIn: ['host']
            }
        }
    },
    complexPropDefaults: {
        controller: BeIndefinite
    }
});

register(ifWantsToBe, upgrade, tagName);
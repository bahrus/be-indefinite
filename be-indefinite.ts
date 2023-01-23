import {define, BeDecoratedProps} from 'be-decorated/DE.js';
import {Proxy, PP, Actions, PPP, PPE, Service, InstantiateProps} from './types';
import {register} from 'be-hive/register.js';
import { ExportableScript } from 'be-exportable/types';
import { Attachable, TransformIslet } from 'trans-render/lib/types';

export class BeIndefinite extends EventTarget implements Actions, Service{
    async extractIslets(pp: PP, mold: PPP): Promise<PPP | PPE> {
        const {self, meta, proxy} = pp;
        const scripts = Array.from(self.content.querySelectorAll('script'));
        meta!.exportableScripts = [];
        meta!.transformIslets = [];
        const {exportableScripts, transformIslets} = meta!;
        for(const script of scripts){
            const clonedScript  = script.cloneNode(true) as ExportableScript;
            if(clonedScript.innerHTML.trim().startsWith('({')){
                clonedScript.innerHTML = clonedScript.innerHTML.replace('({', 'export const islet = ({');
            }
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
        import('be-free-ranged/be-free-ranged.js');
        const bfr = 'be-free-ranged';
        await customElements.whenDefined(bfr);
        const bfrInstance = document.createElement(bfr) as any as Attachable;
        const refTempl = document.createElement('template') as any;
        const {host, target} = ip;
        const pp = (this as any).proxy as PP;
        const {meta, insertPosition} = pp;
        target!.insertAdjacentElement(insertPosition!, refTempl);
        const {transformIslets} = meta!;
        refTempl.beDecorated = {
            freeRanged: {
                transformIslets,
                host,
                template: (this as any).proxy.self
            }
        }
        bfrInstance.attach(refTempl)

    



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
                'meta', 'insertPosition'
            ],
            proxyPropDefaults: {
                insertPosition: 'afterend',
            }
        },
        actions:{
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
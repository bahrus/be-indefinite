import {define, BeDecoratedProps} from 'be-decorated/DE.js';
import {Proxy, PP, Actions, PPP, PPE, Meta} from './types';
import {register} from 'be-hive/register.js';
import { ExportableScript } from 'be-exportable/types';
import { Attachable, TransformIslet } from 'trans-render/lib/types';

export class BeIndefinite extends EventTarget implements Actions{
    async extractIslets(pp: PP): Promise<PPP> {
        const {self, proxy} = pp;
        const scripts = Array.from(self.content.querySelectorAll('script'));
        const meta: Meta = {
            exportableScripts: [],
            transformIslets: [],
        }
        const {exportableScripts, transformIslets} = meta!;
        for(const script of scripts){
            const clonedScript  = script.cloneNode(true) as ExportableScript;
            if(clonedScript.innerHTML.trim().startsWith('({')){
                clonedScript.innerHTML = clonedScript.innerHTML.replace('({', 'export const islet = ({');
            }
            exportableScripts!.push(clonedScript);
            transformIslets!.push(await this.loadIslet(clonedScript));
            script.remove();
        }
        return {
            meta,
            resolved: true,
        } as PPP;
        
    }

    loadIslet(script: ExportableScript): Promise<TransformIslet>{
        return new Promise(async resolve => {
            const {doBeHavings} = await import('trans-render/lib/doBeHavings.js');
            script.addEventListener('load', e => {
                const transformIslet = (script.dataset.settings ? JSON.parse(script.dataset.settings!) : {}) as TransformIslet;
                transformIslet.islet = script._modExport.islet;
                resolve(transformIslet);
            }, {once: true});
            await doBeHavings(script, [{
                be: 'exportable'
            }]);
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
                'meta', 
            ],
            proxyPropDefaults: {
                isC: true,
            }
        },
        actions:{
            extractIslets: 'isC',
        }
    },
    complexPropDefaults: {
        controller: BeIndefinite
    }
});

register(ifWantsToBe, upgrade, tagName);
import {define, BeDecoratedProps} from 'be-decorated/DE.js';
import {Proxy, PP, Actions, VirtualProps, PPP, PPE} from './types';
import {register} from 'be-hive/register.js';
import { ExportableScript } from 'be-exportable/types';
import { Attachable } from 'trans-render/lib/types';

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
                    resolveHostProp: {on: 'load', of: self}
                }] as PPE;
            }

        }
        const script = self.content.querySelector('script') as ExportableScript;
        if(script === null){
            return mold;
        }
        meta!.exportableScript = script;
        return await this.loadScript(pp, script);
        
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

    async loadScript(pp: PP, script: ExportableScript): PPE {
        const be = 'be-exportable';
        if(customElements.get(be) === undefined){
            import('be-exportable/be-exportable.js');
            await customElements.whenDefined(be);
            const decorator = document.createElement(be) as any as Attachable;
            decorator.attach(script);            
        }else{
            const decorator = document.createElement(be) as any as Attachable;
            decorator.attach(script);
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
            upgrade,
            virtualProps: [
                'transform', 'hostPrep', 'target',  'host', 'meta',
                'isC', 'clonedTemplate', 'ref', 'prepResolved'
            ]
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
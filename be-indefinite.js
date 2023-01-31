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
            const { doBeHavings } = await import('trans-render/lib/doBeHavings.js');
            script.addEventListener('load', e => {
                const transformIslet = (script.dataset.settings ? JSON.parse(script.dataset.settings) : {});
                transformIslet.islet = script._modExport.islet;
                resolve(transformIslet);
            }, { once: true });
            await doBeHavings(script, [{
                    be: 'exportable'
                }]);
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
                'meta',
            ],
            proxyPropDefaults: {
            //placement: 'appendAdjacent',
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

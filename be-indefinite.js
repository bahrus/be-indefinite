import { define } from 'be-decorated/DE.js';
import { register } from 'be-hive/register.js';
export class BeIndefinite extends EventTarget {
    checkForScript(pp) {
        const { self } = pp;
        const script = self.content.querySelector('script');
        if (script === null) {
            return {
                prepResolved: true,
            };
        }
    }
    loadScript(pp) {
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
            upgrade,
            virtualProps: [
                'transform', 'hostPrep', 'target', 'host',
                'isC', 'clonedTemplate', 'ref', 'prepResolved'
            ]
        },
        actions: {
            checkForScript: 'isC',
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

import { define } from 'be-decorated/DE.js';
import { register } from 'be-hive/register.js';
export class BeIndefinite extends EventTarget {
}
const tagName = 'be-indefinite';
const ifWantsToBe = 'indefinite';
const upgrade = '*';
define({
    config: {
        tagName,
        propDefaults: {
            ifWantsToBe,
            upgrade,
            virtualProps: [
                'transform', 'prep', 'target', 'prependTo', 'host',
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

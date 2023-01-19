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
            upgrade
        },
        actions: {}
    },
    complexPropDefaults: {
        controller: BeIndefinite
    }
});
register(ifWantsToBe, upgrade, tagName);

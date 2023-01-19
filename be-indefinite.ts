import {define, BeDecoratedProps} from 'be-decorated/DE.js';
import {Proxy, PP, Actions, VirtualProps, PPP} from './types';
import {register} from 'be-hive/register.js';

export class BeIndefinite extends EventTarget implements Actions{

}

const tagName = 'be-indefinite';
const ifWantsToBe = 'indefinite';
const upgrade = '*';

define<Proxy & BeDecoratedProps<Proxy, Actions>, Actions>({
    config:{
        tagName,
        propDefaults:{
            ifWantsToBe,
            upgrade
        },
        actions:{

        }
    },
    complexPropDefaults: {
        controller: BeIndefinite
    }
});

register(ifWantsToBe, upgrade, tagName);
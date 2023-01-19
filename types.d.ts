import {BeDecoratedProps, MinimalProxy, EventConfigs} from 'be-decorated/types';


export interface EndUserProps{
    transform: any,
    prep: any;
    target: Element;
    prependTo: any;
    host: any;
}

export interface VirtualProps extends EndUserProps, MinimalProxy{
    clonedTemplate: any;
    ref: any;
    prepResolved: boolean;
    isC: boolean;
}

export type Proxy = Element & VirtualProps;

export interface ProxyProps extends VirtualProps{
    proxy: Proxy;
}

export type PP = ProxyProps;

export type PPP = Partial<PP>;

export type PPE = [PPP, EventConfigs<PPP, Actions>];

export interface Actions{
    checkForScript(pp: PP): PPP;
    loadScript(pp: PP): PPP;
    cloneTemplate(pp: PP): Promise<PP>;
    instantiate(pp: PP): Promise<PPP>;
    alter(pp: PP): void;
    
}




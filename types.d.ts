import {BeDecoratedProps, MinimalProxy, EventConfigs} from 'be-decorated/types';


export interface EndUserProps{
    transform: any,
    prep: any;
    appendTo: any;
    prependTo: any;
}

export interface VirtualProps extends EndUserProps, MinimalProxy{}

export type Proxy = Element & VirtualProps;

export interface ProxyProps extends VirtualProps{
    proxy: Proxy;
}

export type PP = ProxyProps;

export type PPP = Partial<PP>;

export type PPE = [PPP, EventConfigs<PPP, Actions>];

export interface Actions{

}




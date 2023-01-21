import {BeDecoratedProps, MinimalProxy, EventConfigs} from 'be-decorated/types';
import {ExportableScript} from 'be-exportable/types';

export interface TransformIslet {
    transform: any,
    islet: (inp: any) => any,
}

export interface Meta {
    exportableScripts: ExportableScript[];
    transformIslets: TransformIslet[];
}

export interface EndUserProps{
    //transform?: any,
    //islet?: any;
    //target?: Element;
    //host?: EventTarget; // trans-render/lib/PropertyBag
    meta?: Meta;
    //observe?: string[];
}

export interface InstantiateProps{
    target?: Element;
    host?: EventTarget; // trans-render/lib/PropertyBag
}

export interface VirtualProps extends EndUserProps, MinimalProxy<HTMLTemplateElement>{
    //clonedTemplate: any;
    //ref: any;
    //prepResolved: boolean;
   // isC: boolean;
}

export type Proxy = HTMLTemplateElement & VirtualProps;

export interface PP extends VirtualProps{
    proxy: Proxy;
}

export type ProxyProps = PP;

export type PPP = Partial<PP>;

export type PPE = [PPP, EventConfigs<PPP, Actions>];

export interface Actions{
    extractIslets(pp: PP, mold: PPP): Promise<PPP | PPE>;
    // loadScript(pp: PP, script: ExportableScript): Promise<PPE>;
    // resolveHostProp(pp: PP): PPP;
    //cloneTemplate(pp: PP): void;//Promise<PP>;
    //instantiate(pp: PP): Promise<PPP>;
    //alter(pp: PP): void;
    
}

export interface Service{
    instantiate(ip: InstantiateProps): Promise<void>
}




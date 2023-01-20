import {BeDecoratedProps, MinimalProxy, EventConfigs} from 'be-decorated/types';
import {ExportableScript} from 'be-exportable/types';

export interface Meta {
    exportableScript: ExportableScript;
}

export interface EndUserProps{
    transform?: any,
    hostPrep?: any;
    target?: Element;
    targetSelector?: string;
    host?: EventTarget; // trans-render/lib/PropertyBag
    meta?: Meta;
    observe?: string[];
}

export interface VirtualProps extends EndUserProps, MinimalProxy<HTMLTemplateElement>{
    clonedTemplate: any;
    ref: any;
    prepResolved: boolean;
    isC: boolean;
}

export type Proxy = HTMLTemplateElement & VirtualProps;

export interface PP extends VirtualProps{
    proxy: Proxy;
}

export type ProxyProps = PP;

export type PPP = Partial<PP>;

export type PPE = [PPP, EventConfigs<PPP, Actions>];

export interface Actions{
    checkForScript(pp: PP, mold: PPP): Promise<PPP | PPE>;
    loadScript(pp: PP, script: ExportableScript): Promise<PPE>;
    resolveHostProp(pp: PP): PPP;
    cloneTemplate(pp: PP): Promise<PP>;
    instantiate(pp: PP): Promise<PPP>;
    alter(pp: PP): void;
    
}




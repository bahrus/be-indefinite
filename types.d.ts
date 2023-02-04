import {BeDecoratedProps, MinimalProxy, EventConfigs} from 'be-decorated/types';
import {ExportableScript} from 'be-exportable/types';
import {TransformIslet} from 'trans-render/lib/types';

// export interface TransformIslet {
//     transform: any,
//     islet: (inp: any) => any,
// }

export interface Meta {
    exportableScripts?: ExportableScript[];
    transformIslets?: TransformIslet[];
}

export interface EndUserProps{}


export interface VirtualProps extends EndUserProps, MinimalProxy<HTMLTemplateElement>{
    meta?: Meta;
    isC?:  boolean;
}

export type Proxy = HTMLTemplateElement & VirtualProps;

export interface PP extends VirtualProps{
    proxy: Proxy;
}

export type ProxyProps = PP;

export type PPP = Partial<PP>;

export type PPE = [PPP, EventConfigs<PPP, Actions>];

export interface Actions{
    extractIslets(pp: PP): Promise<PPP>;
}





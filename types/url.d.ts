declare type Url = {
    protocol: string;
    hostname: string;
    port: string;
    pathname: string;
    search: string;
    hash: string;
};
export declare function parse(url: string): Url | undefined;
export declare function stringify(url: Url): string;
export {};

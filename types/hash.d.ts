declare type Hash = {
    pathname: string;
    search: string;
};
export declare function parse(hash: string): Hash | undefined;
export declare function stringify(hash: Hash): string;
export {};

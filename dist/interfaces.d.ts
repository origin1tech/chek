export interface IMap<T> {
    [key: string]: T;
}
export interface IMetadata {
    [key: string]: any;
}
export interface IArrayResult {
    result: any[];
    val: any;
}
export interface IDateFormat extends Intl.DateTimeFormatOptions {
    locales?: string | string[];
}
export declare type IComparator = (a, b) => number;
export declare type IComparatorPrimer = (val: any) => any;
export declare type IComparatorOptions = {
    key: string;
    primer?: IComparatorPrimer;
    order?: string | number | boolean;
    comparator?: IComparator;
};
export declare type IComparatorOrder = 'asc' | 'desc' | 'ascending' | 'descending' | 0 | 1 | -1;
export declare type IComparatorTuple = [string, IComparatorOrder];
export declare type IComparatorField = (string | IComparatorOptions | IComparatorPrimer | IComparatorTuple);

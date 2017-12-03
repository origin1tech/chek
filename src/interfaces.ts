
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

export type IComparator = (a, b) => number;
export type IComparatorPrimer = (val: any) => any;
export type IComparatorOptions = { key: string, primer?: IComparatorPrimer, order?: string | number | boolean, comparator?: IComparator };
export type IComparatorOrder = 'asc' | 'desc' | 'ascending' | 'descending' | 0 | 1 | -1;
export type IComparatorTuple = [string, IComparatorOrder];
export type IComparatorField = (string | IComparatorOptions | IComparatorPrimer | IComparatorTuple);
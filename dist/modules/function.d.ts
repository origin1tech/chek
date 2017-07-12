/**
 * Noop
 */
export declare function noop(): void;
/**
 * Noop If
 * If function provided return no operation funciton.
 *
 * @param fn optional function.
 */
export declare function noopIf(fn?: Function): Function;
/**
 * Try Wrap
 * Generic helper for calling try catch on a method.
 * If a default method is provided it will return in on error
 * otherwise it will return null.
 *
 * @example
 * function func(val: any) { return isString(val); }
 * const result = tryWrap(func)();
 *
 * With params
 * tryWrap(JSON.stringify, { name: 'Adele', age: 30 }, null, 2)()
 *
 * With default
 * tryWrap(Number, '30')(35);
 * Where '35' is the default value on error.
 *
 * @param fn the parse method to be called in try/parse block.
 * @param args arguments to pass to above method.
 */
export declare function tryWrap(fn: Function, ...args: any[]): (def?: any) => any;
/**
 * Try Require
 * Tries to require a module returns null
 * if cannot require or empty object if safe
 * flag is provided.
 *
 * @param name the name of module to try and require.
 * @param def optional default value on null.
 */
export declare function tryRequire(name: string, def?: any): any;


import { isFunction, isNode } from './is';
import { toDefault } from './to';

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
export function tryWrap(fn: Function, ...args: any[]) {

  return function (def?: any) {
    try {
      return fn(...args);
    }
    catch (ex) {
      if (isFunction(def))
        return def(ex);
      return toDefault(def);
    }
  };

}

/**
 * Try Require
 * Tries to require a module returns null
 * if cannot require or empty object if safe
 * flag is provided.
 *
 * @param name the name of module to try and require.
 * @param safe when true returns empty object if error.
 */
export function tryRequire(name: string, safe?: boolean): any {

  function _require() {
    if (!isNode())
      /* istanbul ignore next */
      return false;
    return require(name);
  }
  if (safe)
    return tryWrap(_require)({});
  return tryWrap(_require)();

}
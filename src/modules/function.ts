
import { isFunction, isNode } from './is';
import { toDefault } from './to';

/* istanbul ignore next */
/**
 * Noop
 */
export function noop(...args: any[]) { }

/**
 * Noop If
 * If function provided return no operation funciton.
 *
 * @param fn optional function.
 */
export function noopIf(fn?: any) {
  return fn || noop;
}

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
 * @param def optional default value on null.
 * @param isRoot used internally by tryRootRequire to require root modules.
 */
export function tryRequire(name: string, def?: any, isRoot?: boolean): any {

  function _require() {
    if (!isNode())
      /* istanbul ignore next */
      return toDefault(null, def);
    if (isRoot)
      return require.main.require(name);
    return require(name);
  }
  return tryWrap(_require)(def);

}

/**
 * Try Root Require
 * Tries to require module relative from root module.
 *
 * @param name the name of the module to try and require.
 * @param def the default value if null.
 */
export function tryRootRequire(name: string, def?: any): any {
  return tryRequire(name, def);
}
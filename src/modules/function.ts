
/* istanbul ignore next */
/**
 * Noop
 */
export function noop() { }

/**
 * Noop If
 * If function provided return no operation funciton.
 *
 * @param fn optional function.
 */
export function noopIf(fn?: any) {
  return fn || noop;
}

import { isArray, isString, isUndefined, isPlainObject, isBoolean, isObject, isRegExp, isDate, isError, isNull, isValue, isFunction, isFloat, isInteger, isNumber } from './is';
import { toDate, toNumber, toArray, toFloat, toInteger, toBoolean, toString } from './to';
import { tryWrap } from './try';



/**
 * Cast Type
 * Attempts to cast a type to another type.
 *
 * @param val the value to be cast.
 * @param type the type to cast to.
 */
export function castType<T>(val: any, type: any): T | T[] {

  function cast() {

    if (!isValue(val))
      return null;

    if (isArray(type)) {
      return toArray(val)
        .map((v) => { return <T>castType(v, type[0]); });
    }

    else if (isFunction(type)) {
      return type(val);
    }

    else if (isString(type)) {

      type = (type || getType(val)).toLowerCase();

      let map = {
        'string': toString,
        'boolean': toBoolean,
        'integer': toInteger,
        'float': toFloat,
        'number': toNumber,
        'date': toDate,
        'any': (v) => val
      }[type];

      if (map)
        return map(val);
      else
        throw new Error(`Unknown type could not be cast.`);

    }

    else {
      return val;
    }

  }

  return tryWrap(cast)(val);

}

/**
 * Get Type
 * Gets the type of an object.
 *
 * Value                Type                  Strict
 * -------------------------------------------------
 * {}                   literal               object
 * true                 boolean               boolean
 * 'true'               boolean               string
 * 25                   integer               number
 * 25.5                 float                 number
 * new Date()           date                  date
 * '01/01/2017'         date                  string
 * RegExp               regexp                regexp
 * '/^test/g'           regexp                string
 * null                 null                  null
 * function() {}        function              function
 * []                   array                 array
 * 'some string'        string                string
 *
 * @param val the object to get type from.
 * @param strict when true returns the strict type see examples.
 * @param unknown the string name for unknown types.
 */
export function getType(val: any, strict?: boolean | string, unknown?: string): any {

  if (isString(strict)) {
    unknown = <string>strict;
    strict = undefined;
  }

  const type = typeof val;
  const parse = !isValue(strict) ? true : false;

  function isKnown() {
    return (
      type === 'undefined' ||
      (type !== 'object' &&
        type !== 'number' &&
        type !== 'string')
    );
  }

  // If not 'object', 'number' or 'string' just
  // return the type, numbers, objects and strings
  // should fall through for more specific type.
  if (isKnown())
    return type;

  if (isNull(val)) {
    return 'null';
  }

  else if (isDate(val)) {
    return 'date';
  }

  else if (isNumber(val)) {

    if (strict)
      return 'number';

    if (isFloat(val))
      return 'float';

    if (isInteger(val))
      return 'integer';

    /* istanbul ignore next */
    return 'number';

  }

  else if (isPlainObject(val)) {
    if (strict)
      return type;
    return 'literal';
  }

  else if (isError(val)) {
    return 'error';
  }

  else if (isRegExp(val)) {
    return 'regexp';
  }

  else if (isArray(val)) {
    return 'array';
  }

  else if (isString(val)) {
    return 'string';
  }

  else if (val.constructor && val.constructor.name) {
    if (strict)
      return type;
    return val.constructor.name;
  }

  /* istanbul ignore next */
  return unknown || 'any';

}

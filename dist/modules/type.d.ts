/**
 * Cast Type
 * Attempts to cast to specified type.
 *
 * @param type the type to cast to.
 * @param val the value to be cast.
 * @param def optional default value to return on null.
 * @param args optional args to pass when casting function.
 */
export declare function castType<T>(type: any, val: any, def?: any, ...args: any[]): T;
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
export declare function getType(val: any, strict?: boolean | string, unknown?: string): any;

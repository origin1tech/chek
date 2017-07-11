/**
 * Del
 * Deletes keys in an object.
 *
 * @param obj the object whose keys should be deleted.
 * @param props the property keys that should be deleted.
 */
export declare function del(obj: any, key: string | string[]): any;
/**
 * Get
 * Gets a property within the supplied object.
 *
 * @param obj the object to inspect.
 * @param prop
 */
export declare function get<T>(obj: any, key: string | string[]): T;
/**
 * Clone
 * Performs deep cloning of objects.
 *
 * @param obj object to be cloned.
 * @param json performs quick shallow clone using JSON.
 */
export declare function clone<T>(obj: any, json?: boolean): T;
/**
 * Extend
 * Extends objects similar to Object.assign
 * with the exception that undefined values are ignored.
 *
 * @example
 * extend({ name: 'Bob', active: true }, { active: undefined })
 * results in:
 * { name: 'Bob', active: true }
 *
 * @param obj primary object.
 * @param args unlimited number of objects to extend from.
 */
export declare function extend<T>(obj: any, ...args: any[]): T;
/**
 * Set
 * Sets a value on an object using dot notation or url path.
 *
 * @todo need to refactor this method.
 *
 * @param obj the object to set the value on.
 * @param key the property used for setting the value.
 * @param value the value used for updating the property.
 * @param dynamic when NOT false objects are dynamically created if required.
 */
export declare function set(obj: any, key: string | string[], val: any, dynamic?: boolean): any;

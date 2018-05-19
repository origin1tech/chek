/**
 * Assign
 * Convenience wrapper to Object.assign.
 *
 * @param obj object to assign.
 * @param args additional source object.
 */
export declare function assign<T>(obj: any, ...args: any[]): T;
/**
 * Del
 * Removes a property within the supplied object.
 *
 * @param obj the object to inspect.
 * @param key the dot notated key or array of keys.
 * @param immutable when true original object NOT mutated.
 */
export declare function del<T>(obj: any, key: string | string[], immutable?: boolean): T;
/**
 * Get
 * Gets a property within the supplied object.
 *
 * @param obj the object to inspect.
 * @param key the dot notated key or array of keys.
 * @param def a default value to set if not exists.
 */
export declare function get<T>(obj: any, key: string | string[], def?: any): T;
/**
 * Has
 * Checks if property exists in object.
 *
 * @param obj the object to be inpsected.
 * @param key the key to be found.
 */
export declare function has(obj: any, key: string | string[]): boolean;
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
 * NOTE: use Object.assign if available!!
 *
 * @example
 * extend({ name: 'Bob', active: true }, { active: undefined })
 * results in:
 * { name: 'Bob', active: true }
 *
 * @param obj primary target object.
 * @param args additional source objects to merge with target.
 */
export declare function extend<T>(obj: any, ...args: any[]): T;
/**
 * Reverse
 * Reverses arrays, strings or objects.
 * Only numbers, strings or booleans are supported
 * when reverse mapping objects.
 *
 * @param obj the object to reverse.
 */
export declare function reverse<T>(obj: any): T;
/**
 * Set
 * Sets a value on an object using dot notation or url path.
 *
 * @todo need to refactor this method.
 *
 * @param obj the object to set the value on.
 * @param key the property used for setting the value.
 * @param value the value used for updating the property.
 * @param immutable when true the original object is NOT mutated.
 *
 */
export declare function set<T>(obj: any, key: string | string[], val: any, immutable?: boolean): T;

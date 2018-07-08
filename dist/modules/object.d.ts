/**
 * Uses Object.assign if available or falls back to polyfill.
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
 * Extend properties between target/source objects. This is NOT
 * a deep copy.
 *
 * NOTE: use Object.assign if available!!
 *
 * @example extend({ name: 'Bob', active: true }, { active: undefined })
 *
 * @param obj primary target object.
 * @param args additional source objects to merge with target.
 */
export declare function extend<T>(obj: any, ...args: any[]): T;
/**
 * Extend properties between target/source objects. This is NOT
 * a deep copy.
 *
 * NOTE: use Object.assign if available!!
 *
 * @example extend(true, { name: 'Bob' }, { nested: { key: 'value' } })
 *
 * @param shallow when true only extends top level.
 * @param obj primary target object.
 * @param args additional source objects to merge with target.
 */
export declare function extend<T>(shallow: boolean, obj: any, ...args: any[]): T;
/**
 * Put a value to key. If the value is not currently an array it converts.
 *
 * @param obj the object to push value to.
 * @param key the key or array of keys to be joined as dot notation.
 * @param val the value to be pushed.
 * @param immutable when true update in immutable mode.
 */
export declare function put<T>(obj: any, key: string | string[], val: any, immutable?: boolean): T;
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
/**
 * Create is a convenience method that simply calls Object.create().
 * If no object is passed creates using null.
 *
 * @param obj optional object to use with Object.create.
 */
export declare function create<T>(obj?: any): any;
/**
 * Omits characters or words from strings, removes
 * trailing whitespace before punctuation and also double spaces.
 *
 * @param str the string to omit chars from.
 * @param chars the characters or words to be omitted.
 */
export declare function omit<T>(str: string, chars: string | string[]): T;
/**
 * Omits a value from an array.
 *
 * @param arr the array to be filtered.
 * @param elements the elements to be removed.
 */
export declare function omit<T>(arr: any[], elements: any | any[]): T;
/**
 * Omits properties from an object, supports dot notation nested removals.
 *
 * @example .omit({ name: 'bob', blogs: { blog1: 'Title }}, ['blogs.blog1']);
 *
 * @param obj the object to remove properties from.
 * @param props the properties to be removed.
 * @param immutable when true object is first cloned to not mutated source.
 */
export declare function omit<T>(obj: object, props: string | string[], immutable?: boolean): T;
/**
 * Picks values from object by property name.
 *
 * @param obj the object to pick from.
 * @param props the properties to be picked.
 */
export declare function pick<T>(obj: any, props: string | string[]): T;

<p align="left">
  <a href="http://github.com/origin1tech/chek"><img width="120" src="https://raw.githubusercontent.com/origin1tech/chek/master/assets/img/logo-120w.png"></a>
</p>

What is Chek? Well we have a guy we call Chekov, as in "I can do zat Captain I can do zat". So we shortened it to "Chek". Hey there's a logger named after "Winston" right.

Anyway Chek is a slimmed down lib for common tasks like check if "is" a type or convert to a type. There are helpers for dealing with strings, converting objects to arrays and back (handy for Firebase type apis) and so on.

Nothing special just a nice little toolkit preventing the need for large libs like Lodash or Underscore (both great of course).

The end game is simple. Have about 90% or so coverage for common tasks preventing the need for a larger footprint.

Comes with 100% test coverage out of the gate. Some handy methods like push, splice, shift, unshfit and so on that handle immutability as well as other methods where applicable.

## Installation

```sh
npm install chek -s
```

## Usage

**Using Typescript**

```ts
import * as ck from 'chek'; // or import { isString, slugify } from 'chek';

let slug = 'i can Do zAT';
if (ck.isString(slug))
  slug = ck.slugify(slug) // result: 'i-can-do-zat';
```

**Using ES5**

```js
const ck = require('chek');

// same as above.
```

## Methods

Methods are broken into several categories. Some have only a method or two and we'll likely expand a little on some. Have **any suggestions** be sure to post an issue we're all ears. Not prideful help out we all win!

+ **array**         - things like contains, containsAny, duplicates.
+ **from**          - things like fromEpoch, fromJSON, tryWrap & tryRequire.
+ **functions**     - noop and noopIf
+ **is**            - things like if isString, isBoolean, isFunction.
+ **object**        - things like get, set, clone, extend.
+ **string**        - things like lowercase, uppercase, slugify, padding, uuid.
+ **to**            - handles converting to a type like toBoolean, toRegExp.
+ **type**          - handles getting and casting types.

**Please Note the following tables are here for convenience you should ALWAYS reference the "docs" below for updated method signatues, there's only so much time in the day.**

## Array

<table>
    <thead>
    <tr>
    <th><strong>Method</strong></th><th><strong>Params</strong></th><th><strong>Returns</strong></th><th><strong>Description</strong></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>contains</td><td>arr: any[], val: any</td><td>boolean</td><td>Tests if array contains value.</td>
    </tr>
    <tr>
      <td>duplicates</td><td>arr: any[], val: any, breakable?: boolean</td><td>number</td><td>Counts duplicates in array.</td>
    </tr>
    <tr>
      <td>contains</td><td>arr: any[], compare: any[]</td><td>boolean</td><td>Tests if array contains any value.</td>
    </tr>
    <tr>
      <td>keys</td><td>obj: {}</td><td>string[]</td><td>Returns an array of key names within an object.</td>
    </tr>
    <tr>
      <td>flatten</td><td>...arr: any[]</td><td>any[]</td><td>Flattens nested arrays in immutable way.</td>
    </tr>
    <tr>
      <td>first</td><td>arr: any[]</td><td>any</td><td>Returns first value in array without mutating.</td>
    </tr>
    <tr>
      <td>last</td><td>arr: any[]</td><td>any</td><td>Returns last value in array without mutating.</td>
    </tr>
    <tr>
    <td>orderBy</td><td>arr: any[], ...fields: IComparatorField[]</td><td>T[]</td><td>Orders array of objects by property name, falls back to .sort() for convenience.</td>
    </tr>
    <tr>
      <td>pop</td><td>arr: any[]</td><td>IArrayResult</td><td>Pops value returns object w/o mutating w/ new array and val.</td>
    </tr>
    <tr>
      <td>push</td><td>arr: any[], ...args: any[]</td><td>IArrayResult</td><td>Pushes value without mutating returning new array and val.</td>
    </tr>
    <tr>
      <td>shift</td><td>arr: any[]</td><td>IArrayResult</td><td>Shifts value without mutating returning new array and val.</td>
    </tr>
    <tr>
      <td>splice</td><td>arr: any[], start?: number, remove?: number, ...items: any[]</td><td>IArrayResult</td><td>Splices value without mutating returning new array and val and any inserted items.</td>
    </tr>
    <tr>
      <td>unshift</td><td>arr: any[], ...items: any[]</td><td>IArrayResult</td><td>Unshifts inserting value returning new array and val.</td>
    </tr>
  </tbody>
</table>

## From

<table>
  <thead>
    <tr>
    <th><strong>Method</strong></th><th><strong>Params</strong></th><th><strong>Returns</strong></th><th><strong>Description</strong></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>fromEpoch</td><td>val: number, def?: Date</td><td>Date</td><td>Creates date from epoch.</td>
    </tr>
    <tr>
      <td>fromJSON</td><td>val: string, def? T</td><td>T</td><td>Safely parses JSON.</td>
    </tr>
  </tbody>
</table>

## Function

<table>
  <caption>CHEK FUNCTION</caption>
  <thead>
    <tr>
    <th><strong>Method</strong></th><th><strong>Params</strong></th><th><strong>Returns</strong></th><th><strong>Description</strong></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>noop</td><td>n/a</td><td>void</td><td>Non operation function.</td>
    </tr>
    <tr>
      <td>noopIf</td><td>fn?: Function</td><td>Function</td><td>Returns non-operation function or provided function.</td>
    </tr>
    <tr>
      <td>tryWrap</td><td>fn: Function, ...args: any[]</td><td>Function</td><td>Returns safely wrapped function.</td>
    </tr>
    <tr>
      <td>tryRequire</td><td>name: string, def?: any</td><td>any</td><td>Safely requires node module.</td>
    </tr>
    <tr>
      <td>tryRootRequire</td><td>name: string, def?: any</td><td>any</td><td>Safely requires Root node module.</td>
    </tr>
  </tbody>
</table>

## Is

<table>
  <caption>CHEK IS</caption>
  <thead>
    <tr>
    <th><strong>Method</strong></th><th><strong>Params</strong></th><th><strong>Returns</strong></th><th><strong>Description</strong></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>isArray</td><td>val: any</td><td>boolean</td><td>Checks if is array.</td>
    </tr>
    <tr>
      <td>isBoolean</td><td>val: any</td><td>boolean</td><td>Checks if is boolean.</td>
    </tr>
    <tr>
      <td>isBrowser</td><td>override?: string</td><td>boolean</td><td>Checks if is browser.</td>
    </tr>
    <tr>
      <td>isDate</td><td>val: any</td><td>boolean</td><td>Checks if is date.</td>
    </tr>
    <tr>
      <td>isDebug</td><td>debugging?: boolean</td><td>boolean</td><td>Checks if is node debug mode.</td>
    </tr>
    <tr>
      <td>isEmpty</td><td>val: any, comp: any, loose?: boolean</td><td>boolean</td><td>Checks if is empty.</td>
    </tr>
    <tr>
      <td>isEqual</td><td>val: any</td><td>boolean</td><td>Checks if is equal.</td>
    </tr>
    <tr>
      <td>isError</td><td>val: any, prop?: string</td><td>boolean</td><td>Checks if is an error.</td>
    </tr>
    <tr>
      <td>isFloat</td><td>val: any</td><td>boolean</td><td>Checks if is a flot.</td>
    </tr>
    <tr>
      <td>isFunction</td><td>val: any</td><td>boolean</td><td>Checks if is a function.</td>
    </tr>
    <tr>
      <td>isInfinite</td><td>val: any</td><td>boolean</td><td>Checks if is infinite.</td>
    </tr>
        <tr>
      <td>isInspect</td><td>inspecting?: boolean</td><td>boolean</td><td>Checks if is stated with --inspect or --inspect-brk.</td>
    </tr>
    <tr>
      <td>isInteger</td><td>val: any</td><td>boolean</td><td>Checks if is an integer.</td>
    </tr>
    <tr>
      <td>isNode</td><td>n/a</td><td>boolean</td><td>Checks if is running in node.</td>
    </tr>
    <tr>
      <td>isNumber</td><td>val: any</td><td>boolean</td><td>Checks if is a number.</td>
    </tr>
    <tr>
      <td>isMoment</td><td>val: any</td><td>boolean</td><td>Checks if is is a moment.</td>
    </tr>
    <tr>
      <td>isObject</td><td>val: any</td><td>boolean</td><td>Checks if is an object.</td>
    </tr>
    <tr>
      <td>isPlainObject</td><td>val: any</td><td>boolean</td><td>Checks if is an object literal.</td>
    </tr>
    <tr>
      <td>isPromise</td><td>val: any, name?: string</td><td>boolean</td><td>Checks if is a Promise.</td>
    </tr>
    <tr>
      <td>isRegExp</td><td>val: any</td><td>boolean</td><td>Checks if is a Regular Expression.</td>
    </tr>
    <tr>
      <td>isString</td><td>val: any</td><td>boolean</td><td>Checks if is a string.</td>
    </tr>
    <tr>
      <td>isSymbol</td><td>val: any</td><td>boolean</td><td>Checks if is a Symbol.</td>
    </tr>
    <tr>
      <td>isTruthy</td><td>val: any</td><td>boolean</td><td>Checks if value is truthy.</td>
    </tr>
    <tr>
      <td>isType</td><td>val: any, Type: any</td><td>boolean</td><td>Checks if is of specific class type.</td>
    </tr>
    <tr>
      <td>isUndefined</td><td>val: any</td><td>boolean</td><td>Checks if is undefined.</td>
    </tr>
    <tr>
      <td>isUnique</td><td>arr: any[], value: any</td><td>boolean</td><td>Checks if is unique value in array.</td>
    </tr>
    <tr>
      <td>isValue</td><td>val: any</td><td>boolean</td><td>Checks if is not null and is defined.</td>
    </tr>
  </tbody>
</table>

## Object

<table>
  <caption>CHEK OBJECT</caption>
  <thead>
    <tr>
    <th><strong>Method</strong></th><th><strong>Params</strong></th><th><strong>Returns</strong></th><th><strong>Description</strong></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>clone</td><td>obj: any, shallow?: boolean</td><td>T</td><td>Clones an object with shallow option.</td>
    </tr>
    <tr>
      <td>del</td><td>obj: any, key: string | string[], immutable?: boolean</td><td>T</td><td>Removes properties from object using dot notation optional immutable result.</td>
    </tr>
    <tr>
      <td>get</td><td>obj: any, key: string</td><td>T</td><td>Gets properties from object using dot notation.</td>
    </tr>
    <tr>
      <td>extend</td><td>obj: any, ...args: any[]</td><td>T</td><td>Extends objects pass true as first arg for shallow extend.</td>
    </tr>
    <tr>
      <td>has</td><td>obj: any, key: string</td><td>boolean</td><td>Checks if object has property path.</td>
    </tr>
    <tr>
      <td>reverse</td><td>obj: any</td><td>T</td><td>Reverses an object { error: 0 } becomes { 0: 'error' }.</td>
    </tr>
    <tr>
      <td>set</td><td>obj: any, key: string | string[], val: any, immutable?: boolean</td><td>T</td><td>Sets object value using dot notation optional immutable result.</td>
    </tr>
  </tbody>
</table>

## String

<table>
  <caption>CHEK STRING</caption>
  <thead>
    <tr>
    <th><strong>Method</strong></th><th><strong>Params</strong></th><th><strong>Returns</strong></th><th><strong>Description</strong></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>camelcase</td><td>val: string</td><td>string</td><td>Converts string to camelCase.</td>
    </tr>
    <tr>
      <td>capitalize</td><td>val: string</td><td>string</td><td>Converts string to Capitalized.</td>
    </tr>
    <tr>
      <td>decamelcase</td><td>val: string, separator?: string</td><td>string</td><td>Decamelizes a string to option/flag style with dashes.</td>
    </tr>
    <tr>
      <td>lowercase</td><td>val: string</td><td>string</td><td>Converts string to lowercase.</td>
    </tr>
    <tr>
      <td>padLeft</td><td>val: string, len: number, offset?: number | string, char?: string</td><td>string</td><td>Pads a string to the left.</td>
    </tr>
    <tr>
      <td>padRight</td><td>val: string, len: number, offset?: number | string, char?: string</td><td>string</td><td>Pads a string to the right.</td>
    </tr>
    <tr>
      <td>padValues</td><td>arr: string[], strategy?: string, offset?: number | string, char?: string</td><td>string[]</td><td>Pads and array of strings to the widest value.</td>
    </tr>
    <tr>
      <td>split</td><td>val: string | string[], chars?: string | string[]</td><td>string[]</td><td>Splits a string by provided char to scans for known chars.</td>
    </tr>
    <tr>
      <td>slugify</td><td>val: string</td><td>string</td><td>Slugifies a string.</td>
    </tr>
    <tr>
      <td>titlecase</td><td>val: string, conjunctions?: boolean</td><td>string</td><td>Converts a string to Title Case.</td>
    </tr>
    <tr>
      <td>uppercase</td><td>val: string</td><td>string</td><td>Converts a string to UPPERCASE.</td>
    </tr>
    <tr>
      <td>uuid</td><td>n/a</td><td>string</td><td>Creates a uuid using "performance" if available.</td>
    </tr>
  </tbody>
</table>

## To

<table>
  <caption>CHEK TO</caption>
  <thead>
    <tr>
    <th><strong>Method</strong></th><th><strong>Params</strong></th><th><strong>Returns</strong></th><th><strong>Description</strong></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>toArray</td><td>val: any, id?: string | T[], def?: T[]</td><td>T[]</td><td>Convers to an array.</td>
    </tr>
    <tr>
      <td>toBoolean</td><td>val: any, def?: boolean</td><td>boolean</td><td>Converts to boolean.</td>
    </tr>
    <tr>
      <td>toDate</td><td>val: any, def?: Date</td><td>Date</td><td>Converts to Date.</td>
    </tr>
    <tr>
      <td>toDefault</td><td>val: any, def?: any</td><td>any</td><td>Converts to default value if null.</td>
    </tr>
    <tr>
      <td>toEpoch</td><td>val: Date, def?: number</td><td>number</td><td>Converts to an Epoch.</td>
    </tr>
    <tr>
      <td>toFloat</td><td>val: Date, def?: number</td><td>number</td><td>Converts to a float (number w/ decimal).</td>
    </tr>
    <tr>
      <td>toJSON</td><td>obj: any, pretty?: number | boolean | string, def?: string</td><td>string</td><td>Converts to JSON safely.</td>
    </tr>
    <tr>
      <td>toInteger</td><td>val: any, def?: number</td><td>number</td><td>Converts to an integer (a whole number).</td>
    </tr>
    <tr>
      <td>toMap</td><td>val: any, id?: string | IMap<any>, def?: IMap<any></td><td>T</td><td>Converts to arrays and srings to an object map (see examples in method).</td>
    </tr>
    <tr>
      <td>toNested</td><td>val: IMap<any>, def?: IMap<any></td><td>T</td><td>Converts object from "toUnnested" to a nested object.</td>
    </tr>
    <tr>
      <td>toNumber</td><td>val: any, def?: number</td><td>number</td><td>Converts to a number.</td>
    </tr>
    <tr>
      <td>toRegExp</td><td>val: any, def?: RegExp</td><td>RegExp</td><td>Converts to a Regular Expression.</td>
    </tr>
    <tr>
      <td>toString</td><td>val: any, def?: string</td><td>string</td><td>Converts to a string.</td>
    </tr>
    <tr>
      <td>toUnnested</td><td>obj: IMap<any>, prefix?: boolean | IMap<any>, def?: IMap<any></td><td>T</td><td>Converts an object to one flattened level using dot notation keys.</td>
    </tr>
    <tr>
      <td>toWindow</td><td>key: any, val?: any</td><td>void</td><td>Adds methods to window used internally.</td>
    </tr>
  </tbody>
</table>

## Type

<table>
  <caption>CHEK TYPE</caption>
  <thead>
    <tr>
    <th><strong>Method</strong></th><th><strong>Params</strong></th><th><strong>Returns</strong></th><th><strong>Description</strong></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>castType</td><td>val: any, type: any, def?: any</td><td>T</td><td>Casts a type to specified type.</td>
    </tr>
    <tr>
      <td>getType</td><td>val: any, strict?: boolean | string, def?: string</td><td>T</td><td>Detects the type of the provided value.</td>
    </tr>
  </tbody>
</table>

## Docs

See [https://origin1tech.github.io/chek/](https://origin1tech.github.io/chek/)

## Changes

See [CHANGE.md](CHANGE.md)

## License

See [LICENSE](License)

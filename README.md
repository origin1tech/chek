# Chek

What is Chek? Well we have a guy we call Chekov, as in "I can do zat Captain I can do zat". So we shortened it to "Chek". Hey there's a logger named after "Winston" right.

Anyway Chek is a slimmed down lib for common tasks like check if "is" a type or convert to a type. There are helpers for dealing with strings, converting objects to arrays and back (handy for Firebase type apis) and so on. Nothing special just a nice little toolkit preventing the need for large libs like Lodash or Underscore (both great of course).

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

+ array         - things like contains, containsAny, duplicates.
+ from          - things like fromEpoch, fromJSON, tryWrap & tryRequire.
+ functions     - noop and noopIf
+ is            - things like if isString, isBoolean, isFunction.
+ object        - things like get, set, clone, extend.
+ string        - things like lowercase, uppercase, slugify, padding, uuid.
+ to            - handles converting to a type like toBoolean, toRegExp.
+ type          - handles get and casting types.

**Legend**

If you know TypeScript you already know this. The below params and return results are denoted by TypeScript syntax. Here are the basics if there's somethign that doesn't make sense pop on over the Microsft's TypeScript page I'm sure it will clear it up.

+ any       - means any type
+ ?         - means it's optional.
+ []        - means an array of some type like string[].
+ ...       - indicates a spread operator.
+ T         - indicates generic type (if not using TypeScript you can ignore).

<table>
  <caption>CHEK ARRAY</caption>
  <th>
    <tr>
    <td><strong>Method</strong></td><td><strong>Params</strong></td><td><strong>Returns</strong></td><td><strong>Description</strong></td>
    </tr>
  </th>
  <tbody>
    <tr>
      <td>duplicates</td><td>arr: any[], val: any, breakable?: boolean</td><td>number</td><td>Counts duplicates in array.</td>
    </tr>
    <tr>
      <td>contains</td><td>arr: any[], val: any</td><td>boolean</td><td>Tests if array contains value.</td>
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

<table>
  <caption>CHEK FROM</caption>
  <th>
    <tr>
    <td><strong>Method</strong></td><td><strong>Params</strong></td><td><strong>Returns</strong></td><td><strong>Description</strong></td>
    </tr>
  </th>
  <tbody>
    <tr>
      <td>fromEpoch</td><td>val: number, def?: Date</td><td>Date</td><td>Creates date from epoch.</td>
    </tr>
    <tr>
      <td>fromJSON</td><td>val: string, def? T</td><td>T</td><td>Safely parses JSON.</td>
    </tr>
  </tbody>
</table>


<table>
  <caption>CHEK FUNCTION</caption>
  <th>
    <tr>
    <td><strong>Method</strong></td><td><strong>Params</strong></td><td><strong>Returns</strong></td><td><strong>Description</strong></td>
    </tr>
  </th>
  <tbody>
    <tr>
      <td>noop</td><td>n/a</td><td>n/a</td><td>Non operation function.</td>
    </tr>
    <tr>
      <td>noopIf</td><td>fn?: Function</td><td>Function</td><td>Returns non-operation function or provided function.</td>
    </tr>
    <tr>
      <td>tryWrap</td><td>fn: Function, ...args: any[]</td><td>Function</td><td>Returns safely wrapped function.</td>
    </tr>
    <tr>
      <td>tryRequire</td><td>name: string, def?: any</td><td>T</td><td>Safely requires node module.</td>
    </tr>
  </tbody>
</table>

## License

See [LICENSE](License)
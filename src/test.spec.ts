
import * as chai from 'chai';
import * as mocha from 'mocha';

const expect = chai.expect;
const should = chai.should;
const assert = chai.assert;

import * as ck from './';
import * as moment from 'moment';
import * as freeze from 'deep-freeze';

let testObj: any = {
  name: 'Bob Smith',
  age: 35,
  phone: {
    mobile: '8885551212',
    home: '7775551212'
  }
};

const extObj = {
  name: 'Bob Smith',
  age: 35,
  phone: {
    mobile: '8885551212',
    home: '7775551212'
  },
  active: true
};

const qsObj = {
  person: {
    name: 'james',
    nickname: 'jimmy',
    langs: ['c', 'java', 'go', 'node']
  }
};

const nested = {
  name: 'Julie',
  posts: {
    101: { title: 'How to make an omelette.', category: 'Breakfast' },
    102: { title: 'How to make corn chowder.', category: 'Lunch' }
  }
};

const unnested = {
  name: 'Julie',
  'posts.101.title': 'How to make an omelette.',
  'posts.101.category': 'Breakfast',
  'posts.102.title': 'How to make corn chowder.',
  'posts.102.category': 'Lunch',
};

const isCI = process.env.WERCKER ? true : false;

describe('Chek', () => {

  before((done) => {
    done();
  });

  // ARRAY CHEKS

  it('should Sort an array.', () => {
    const nums = [44, 7, 3, 1, 32];
    const names = ['jade', 'tiffany', 'ginger', 'sam'];
    const actual = [
      { start: 11, end: 13, row: 9 },
      { start: 5, end: 6, row: 0 },
      { start: 23, end: 31, row: 2 },
      { start: 17, end: 19, row: 0 }
    ];
    const expected = [
      { start: 5, end: 6, row: 0 },
      { start: 17, end: 19, row: 0 },
      { start: 23, end: 31, row: 2 },
      { start: 11, end: 13, row: 9 }
    ];
    const actualTuple = actual.slice(0);
    const expectedTuple = [
      { start: 11, end: 13, row: 9 },
      { start: 23, end: 31, row: 2 },
      { start: 5, end: 6, row: 0 },
      { start: 17, end: 19, row: 0 }
    ];
    const actualStr = [
      { start: '11', end: 13, row: '9' },
      { start: '5', end: 6, row: '0' },
      { start: '23', end: 31, row: '2' },
      { start: '17', end: 19, row: '0' }
    ];
    const actualStrDesc = actualStr.slice(0);
    const expectedStr = [
      { start: '5', end: 6, row: '0' },
      { start: '17', end: 19, row: '0' },
      { start: '23', end: 31, row: '2' },
      { start: '11', end: 13, row: '9' }
    ];
    const expectedStrDesc = [
      { start: '11', end: 13, row: '9' },
      { start: '23', end: 31, row: '2' },
      { start: '5', end: 6, row: '0' },
      { start: '17', end: 19, row: '0' }
    ];
    const primer = v => parseInt(v);
    ck.orderBy(actual, 'row', 'start');
    ck.orderBy(actualStr, { key: 'row', primer: primer }, { key: 'start', primer: primer });
    ck.orderBy(actualStrDesc, { key: 'row', order: 'desc' }, { key: 'start' }, primer);
    ck.orderBy(nums);
    ck.orderBy(names);
    ck.orderBy(actualTuple, ['row', -1]);
    assert.deepEqual(actual, expected);
    assert.deepEqual(actualTuple, expectedTuple);
    assert.deepEqual(actualStr, expectedStr);
    assert.deepEqual(actualStrDesc, expectedStrDesc);
    assert.deepEqual(nums, [1, 3, 7, 32, 44]);
    assert.deepEqual(names, ['ginger', 'jade', 'sam', 'tiffany']);

  });

  it('should check if array Contains value.', () => {
    let arr;
    assert.equal(ck.contains([1, 2, 3], 3), true);
    assert.equal(ck.contains([1, 2, 3], 6), false);
    assert.equal(ck.contains(arr, null), false);
    assert.equal(ck.contains('1357', 7, (v) => parseInt(v)), true);
  });

  it('should check if source array Contains Any value in inspected array.', () => {
    assert.equal(ck.containsAny([1, 2, 3], [8, 6, 3]), true);
    assert.equal(ck.containsAny([1, 2, 3], [8, 6, 5]), false);
    assert.equal(ck.containsAny([1, 2, 3], 'test'), false);
    assert.equal(ck.containsAny('1357', [7, 9, 11], (v) => parseInt(v)), true);
  });

  it('should count the number of Duplicates in array.', () => {
    assert.equal(ck.duplicates(['Mary', 'Jim', 'John', 'Anthony', 'John'], 'John'), 2);
    assert.equal(ck.duplicates(['Mary', 'Jim', 'John', 'Anthony', 'John'], 'John', true), 1);
  });

  it('should get array of Keys from object.', () => {
    let obj;
    assert.equal(ck.keys(testObj).length, 3);
    assert.equal(ck.keys(obj).length, 0);
  });

  it('should Flatten nested array.', () => {
    assert.deepEqual(ck.flatten([1, 2, [3, 4, [5]]]), [1, 2, 3, 4, 5]);
  });

  it('should get the First value in array.', () => {
    assert.equal(ck.first([1, 2, 3]), 1);
  });

  it('should get the Last value in array.', () => {
    assert.equal(ck.last([1, 2, 3]), 3);
  });

  it('should Pop the last value in array.', () => {
    assert.equal(ck.pop([1, 2, 3]).val, 3);
  });

  it('should Push value to array.', () => {
    assert.deepEqual(ck.push([1, 2, 3], 4).result, [1, 2, 3, 4]);
    assert.deepEqual(ck.push([1, 2, 3], 4, 5, 6).result, [1, 2, 3, 4, 5, 6]);
  });

  it('should Shift value from array.', () => {
    const shiftArr = [1, 2, 3];
    const shiftVal = ck.shift(shiftArr);
    assert.equal(ck.shift([1, 2, 3]).val, 1);
    assert.deepEqual(ck.shift([1, 2, 3]).result, [2, 3]);
  });

  it('should Splice value from array.', () => {
    assert.deepEqual(ck.splice([1, 2, 3, 4, 5], 1).val, [2, 3, 4, 5]);
    assert.deepEqual(ck.splice([1, 2, 3, 4, 5], 2, 1).val, [3]);
    assert.deepEqual(ck.splice([1, 2, 4, 5], 2, 0, 3).result, [1, 2, 3, 4, 5]);
  });

  it('should Unshift value from array.', () => {
    assert.equal(ck.unshift([2, 3], 1).val, 3);
  });

  // FROM CHEKS

  it('should get date from Epoch.', () => {
    const epoch = Date.now();
    assert.equal(ck.fromEpoch(epoch).getTime(), (new Date(epoch)).getTime());
    assert.equal(ck.fromEpoch(null), null);
  });

  it('should get object from JSON.', () => {
    const obj = { name: 'CNN', lies: true };
    const json = JSON.stringify(obj);
    assert.deepEqual(ck.fromJSON(json), obj);
  });

  // FUNCTION CHEKS

  it('should return a noop Function.', () => {
    assert.isFunction(ck.noop);
  });

  it('should return a noopIf Function.', () => {
    const myFunc = function () { };
    assert.equal(ck.noopIf(myFunc), myFunc);
    assert.equal(ck.noopIf(), ck.noop);
  });

  it('should Try to Wrap method safely.', () => {
    const msg = 'whoops you can\'t do that!';
    function test() {
      return {}['pop']();
    }
    assert.equal(ck.tryWrap(test)(), null);
    assert.equal(ck.tryWrap(test)(msg), msg);
    assert.equal(ck.tryWrap(test)(() => { return msg; }), msg);
  });

  it('should Try to Require a module safely.', () => {
    assert.equal(ck.tryRequire('unknown'), null);
    assert.deepEqual(ck.tryRequire('unknown', {}), {});
    assert.isFunction(ck.tryRequire('path').resolve);
    assert.isFunction(ck.tryRequire('clone', null, true));
  });

  it('should Try to Require a Root module safely.', () => {
    assert.equal(ck.tryRootRequire('unknown'), null);
    assert.deepEqual(ck.tryRootRequire('unknown', {}), {});
    assert.isFunction(ck.tryRootRequire('clone'));
  });

  // IS CHEKS

  it('should check if is Array.', () => {
    assert.equal(ck.isArray([]), true);
  });

  it('should check if is Boolean.', () => {
    assert.equal(ck.isBoolean(false), true);
  });

  it('should check if is Browser.', () => {
    assert.equal(ck.isBrowser(), false);
    process.env.BROWSER = 'true';
    assert.equal(ck.isBrowser('BROWSER'), true);
    delete process.env.BROWSER;
  });

  it('should check if is Buffer.', () => {
    const buf = new Buffer('hello');
    const d: any = new Date();
    assert.equal(ck.isBuffer(buf), true);
    assert.equal(ck.isBuffer('hello'), false);
  });

  it('should check if is Date', () => {

    // Standard date.
    assert.equal(ck.isDate(new Date()), true);

    // Epochs not supported for parsing should fail.
    assert.equal(ck.isDate(12345780), false);

    // Should fail shouldn't try to parse strings
    // that look like epochs. Too difficult to
    // determine if number or date.
    assert.equal(ck.isDate(ck.toDate('12345780')), false);

    // Should parse string but fail as not valid date.
    assert.equal(ck.isDate(ck.toDate('12:345:780')), false);

    // Should parse string and result in valid date.
    assert.equal(ck.isDate(ck.toDate('01/01/2017 12:34:26')), true);

  });

  it('should check if is Directory in file system.', () => {
    assert.equal(ck.isDirectory(__dirname), true);
  });

  it('should check if is running in Docker container', () => {
    assert.equal(ck.isDocker(), isCI);
  });

  it('should check if is Node Debug.', () => {
    assert.equal(ck.isDebug(), false);
    assert.equal(ck.isDebug(true), true);
  });

  it('should check is Empty', () => {
    let x;
    assert.equal(ck.isEmpty({}), true);
    assert.equal(ck.isEmpty([]), true);
    assert.equal(ck.isEmpty(''), true);
    assert.equal(ck.isEmpty(0), false);
  });

  it('should check if is Equal', () => {
    assert.equal(ck.isEqual('test', 'test'), true);
    assert.equal(ck.isEqual('test', 'test', true), true);
    const date = new Date();
    const date2 = new Date(date.getTime());
    assert.equal(ck.isEqual(date, date2), true);
  });

  it('should check if is Error.', () => {
    assert.equal(ck.isError(new Error()), true);
    assert.equal(ck.isError({ __custom_prop__: true }, '__custom_prop__'), true);
  });

  it('should check if is File in file system.', () => {
    assert.equal(ck.isFile(__dirname + '/' + 'test.spec.ts'), true);
  });

  it('should check if is Float.', () => {
    assert.equal(ck.isFloat(123.50), true);
  });

  it('should check if is Function.', () => {
    assert.equal(ck.isFunction(ck.noop), true);
  });

  it('should check if is Infinite.', () => {
    assert.equal(ck.isInfinite(Math.pow(10, 1000)), true);
  });

  it('should check if is Node Inspect mode.', () => {
    assert.equal(ck.isInspect(), false);
    assert.equal(ck.isInspect(true), true);
  });

  it('should check if is Integer.', () => {
    assert.equal(ck.isInteger(123), true);
  });

  it('should check if is NodeJS', () => {
    assert.equal(ck.isNode(), true);
  });

  it('should check if is Null.', () => {
    assert.equal(ck.isNull(null), true);
  });

  it('should check if is Number.', () => {
    assert.equal(ck.isNumber(12), true);
  });

  it('should check if is Moment.', () => {
    assert.equal(ck.isMoment(moment()), true);
  });

  it('should check if is Object.', () => {
    assert.equal(ck.isObject({}), true);
    assert.equal(ck.isObject([]), true);
    assert.equal(ck.isObject('not an object'), false);
    assert.equal(ck.isObject(new (class MyClass { })), true);
  });

  it('should check if is PlainObject.', () => {
    assert.equal(ck.isPlainObject({}), true);
    assert.equal(ck.isPlainObject(new (class MyClass { })), false);
  });

  it('should check if is Promise', () => {
    const prom = new Promise((resolve, reject) => {
      resolve();
    });
    assert.equal(ck.isPromise(prom), true);
  });

  it('should check if is RegExp.', () => {
    assert.equal(ck.isRegExp(/test/), true);
  });

  it('should check if is running sudo as root.', () => {
    assert.equal(ck.isRoot(), isCI);
  });

  it('should check if is String.', () => {
    assert.equal(ck.isString('test'), true);
  });

  it('should check if is Symbol', () => {
    assert.equal(ck.isSymbol('symbol'), false);
  });

  it('should check if is Truthy.', () => {
    assert.equal(ck.isTruthy('true'), true);
    assert.equal(ck.isTruthy(0), false);
    assert.equal(ck.isTruthy('false'), true);
    assert.equal(ck.isTruthy(''), false);
    assert.equal(ck.isTruthy(null), false);
    assert.equal(ck.isTruthy(undefined), false);
    assert.equal(ck.isTruthy(['false']), true);
  });

  it('should check if is Type.', () => {
    class MyClass { }
    const myClass = new MyClass();
    assert.equal(ck.isType(myClass, MyClass), true);
  });

  it('should check if is Undefined.', () => {
    assert.equal(ck.isUndefined(undefined), true);
  });

  it('should check if is Unique.', () => {
    assert.equal(ck.isUnique([1, 2, 3, 4, 5], 3), true);
    assert.equal(ck.isUnique([1, 4, 2, 3, 4, 5], 4), false);
  });

  it('should check if is Value.', () => {
    assert.equal(ck.isValue({}), true);
    assert.equal(ck.isValue(0), true);
    assert.equal(ck.isValue(''), true);
    assert.equal(ck.isValue(), false);
  });

  it('should check if is Windows.', () => {
    const isWin = process.platform.indexOf('win') === 0;
    if (isWin)
      assert.equal(ck.isWindows(), true);
    else
      assert.equal(ck.isWindows(), false);
  });

  // OBJECT CHEKS

  it('should Get value by dot notated property.', () => {
    let prop;
    assert.equal(ck.get({}, prop), null);
    assert.equal(ck.get(testObj, 'phone.mobile'), '8885551212');
    testObj.langs = ['java', 'c', 'erlang'];
    assert.equal(ck.get(testObj, 'langs[1]'), 'c');
    delete testObj.langs;
  });

  it('should clone object.', () => {

    // Object literal test.
    const clone: any = ck.clone(extObj);
    clone.age = 25;
    assert.notEqual(clone.age, extObj.age);

    // Error clone test.
    const err = new Error('test clone error.');
    const errClone: any = ck.clone(err);
    assert.equal(errClone.message, 'test clone error.');

    // Class clone test.
    class MyClass {
      test() {
        return 'cloned';
      }
    }
    const myClass = new MyClass();
    const myClassClone = ck.clone<MyClass>(myClass);
    assert.equal(myClassClone.test(), 'cloned');
    const jsonSrc: any = { name: 'bob' };
    const jsonClone: any = ck.clone(jsonSrc, true);
    assert.deepEqual(jsonSrc, jsonClone);
    // jsonClone.nickname = 'bobby';
    // assert.notEqual(jsonSrc.nickname, jsonClone.nickname);

  });

  it('should Extend objects from objects.', () => {
    testObj['tags'] = ['red', 'green', 'blue'];
    extObj['tags'] = ['red', 'cyan', 'blue'];
    assert.deepEqual(ck.extend({}, testObj, { active: true, tags: ['red', 'cyan', 'blue'] }), extObj);
    assert.deepEqual(ck.extend(testObj), testObj);
    assert.deepEqual(ck.extend(true), {});
    assert.deepEqual(ck.extend(true, { name: 'bob' }, { age: 31 }, { 'save-dev': true }, 'not an object'), { name: 'bob', age: 31, 'save-dev': true });
    assert.deepEqual(ck.extend('not an object'), 'not an object');
  });

  it('should check if Has property path in object', () => {
    const obj = {
      title: 'My Blog',
      author: {
        name: 'Joe'
      },
      tags: ['one', 'two', [{
        name: 'three',
      }]]
    };
    assert.isTrue(ck.has(obj, 'author.name'));
    assert.isTrue(ck.has(obj, 'tags[1]'));
    assert.isTrue(ck.has(obj, 'tags[2][0].name'));
    assert.isFalse(ck.has(obj, 'tags[2][0].bad'));
  });

  it('should Set value by dot notated property.', () => {
    const movies: any = {
      startrek: {
        beyond: { title: 'Star Trek Beyond' },
        darkness: { title: 'Star Trek Into Darkness' }
      }
    };
    ck.set(testObj, 'phone.home', '3335551212');
    testObj = ck.set(testObj, 'phone.home', '3335551212', true); // immutable test.
    assert.equal(ck.get(testObj, 'phone.home'), '3335551212');
    const setMovie = ck.set(movies, 'startrek.beyond.year', 2016);
    assert.deepEqual(ck.get(movies, 'startrek.beyond.year'), 2016);
    let empty;
    ck.set(testObj, null, null);
    ck.set(testObj, 'tags[0]', 'orange');
    assert.equal(ck.get(testObj, 'tags[0]'), 'orange');
  });

  it('should Remove value by dot notated property.', () => {
    assert.equal(ck.del({}, null), null);
    testObj = ck.del(testObj, 'phone.home', true);
    assert.equal(ck.get(testObj, 'phone.home'), undefined);
    ck.del(testObj, 'tags[0]', true); // don't mutate obj.
  });

  it('should should Reverse the object keys and values.', () => {
    const result = ck.reverse({ error: 'red', warn: 'yellow', enabled: true, level: 2, func: function () { } });
    assert.deepEqual(result, { red: 'error', yellow: 'warn', true: 'enabled', 2: 'level' });
    assert.equal(ck.reverse('1234'), '4321');
    assert.deepEqual(ck.reverse([5, 4, 3, 2, 1]), [1, 2, 3, 4, 5]);
    assert.deepEqual(ck.reverse(null), null);
  });

  // STRING CHEKS

  it('should convert string to Camelcase.', () => {
    assert.equal(ck.camelcase('CamelCase'), 'camelCase');
    assert.equal(ck.camelcase('Camel.Case'), 'camelCase');
    assert.equal(ck.camelcase('Camel_case'), 'camelCase');
    assert.equal(ck.camelcase(null), null);
  });

  it('should convert string to Capitalize.', () => {
    assert.equal(ck.capitalize('capitalize'), 'Capitalize');
    assert.equal(ck.capitalize(null), null);
  });

  it('should convert string to Lowercase.', () => {
    assert.equal(ck.lowercase('LOWERCASE'), 'lowercase');
    assert.equal(ck.lowercase(null), null);
  });

  it('should convert string to Titlecase.', () => {
    assert.equal(ck.titlecase('luke i am your father.'), 'Luke I Am Your Father.');
    assert.equal(ck.titlecase('red White AND blue'), 'Red White and Blue');
    assert.equal(ck.titlecase('red White AND blue', false), 'Red White And Blue');
    assert.equal(ck.titlecase(null), null);
  });

  it('should convert string to Uppercase.', () => {
    assert.equal(ck.uppercase('uppercase'), 'UPPERCASE');
    assert.equal(ck.uppercase(null), null);
  });

  it('should Split a string by custom or common chars.', () => {
    const str = 'user.posts.1234';
    const str2 = str.replace(/\./g, '|');
    const invalid: any = {};
    // split should figure this out
    // result in duplicate arrays.
    assert.deepEqual(ck.split(str), ck.split(str2));
    assert.deepEqual(ck.split('.' + str), ck.split(str2));
    assert.deepEqual(ck.split('1 2 3', [',', ' ']), ['1', '2', '3']);
    assert.deepEqual(ck.split('1, 2,  3'), ['1', '2', '3']);
    assert.equal(ck.split(invalid), null);
  });

  it('should convert string to Slug.', () => {
    assert.equal(ck.slugify('luke I-am your father'), 'luke-i-am-your-father');
    assert.equal(ck.slugify(null), null);
  });

  it('should generate a UUID.', () => {
    const uuidExp = /^[\da-z]{8}-[\da-z]{4}-4[\da-z]{3}-[\da-z]{4}-[\da-z]{12}$/i;
    const uuid = ck.uuid();
    assert.equal(uuidExp.test(uuid), true);
  });

  it('should Pad a string to the Left 5 spaces.', () => {
    assert.equal(ck.padLeft('padded', 5), '     padded');
    assert.equal(ck.padLeft('padded', 5, 'four'), '         padded');
  });

  it('should Pad a string to the right 5 spaces.', () => {
    assert.equal(ck.padRight('padded', 5), 'padded     ');
    assert.equal(ck.padRight('padded', 5, 'four'), 'padded         ');
  });

  it('should Pad an array of values by the Widest length.', () => {
    assert.deepEqual(ck.padValues(['error', 'warn', 'info', 'verbose'], 'left'), ['  error', '   warn', '   info', 'verbose']);
    assert.deepEqual(ck.padValues(['error', 'warn', 'info', 'verbose'], 'left', 'four'), ['      error', '       warn', '       info', '    verbose']);
    assert.deepEqual(ck.padValues(['error', 'warn', 'info', 'verbose'], 'none'), ['error', 'warn', 'info', 'verbose']);
  });

  // TO CHEKS

  it('should convert To Array.', () => {
    const obj = {
      '100': { name: 'Jane', age: 22 },
      '101': { name: 'Lauren', age: 27 },
      '102': { name: 'Frank', age: 23 }
    };
    const objArr = [
      { $id: '100', name: 'Jane', age: 22 },
      { $id: '101', name: 'Lauren', age: 27 },
      { $id: '102', name: 'Frank', age: 23 }
    ];
    assert.equal(ck.toArray([]).length, 0);
    assert.equal(ck.toArray(null), null);
    assert.deepEqual(ck.toArray('test'), ['test']);
    assert.deepEqual(ck.toArray(obj), objArr);
    assert.deepEqual(ck.toArray(obj, []), objArr);
    assert.deepEqual(ck.toArray({ 100: 'one' }), <any[]>[{ 100: 'one' }]);
    assert.deepEqual(ck.toArray({ 100: { name: 'jeff' } }), <any[]>[{ $id: '100', name: 'jeff' }]);
    assert.deepEqual(ck.toArray({ 100: { name: 'jeff' } }, 'key'), <any[]>[{ key: '100', name: 'jeff' }]);
    assert.deepEqual(ck.toArray('one, two, three'), ['one', 'two', 'three']);

  });

  it('should convert To Boolean.', () => {
    assert.equal(ck.toBoolean(true), true);
    assert.equal(ck.toBoolean(null), null);
    assert.equal(ck.toBoolean('true'), true);
    assert.equal(ck.toBoolean(1), true);
    assert.equal(ck.toBoolean(0), false);
    assert.equal(ck.toBoolean('yes'), true);
    assert.equal(ck.toBoolean('-'), false);
  });

  it('should convert To Date.', () => {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const date = new Date();
    const date2 = ck.toDate('01/01/2017 12:34:26', { locales: 'en-US', timeZone: tz });
    assert.equal(ck.toDate(date, new Date()), date);
    assert.equal(ck.toDate(date.toISOString()).getTime(), date.getTime());
    assert.equal(ck.toDate('123:4447:22'), null);
  });

  it('should convert To Default.', () => {
    assert.equal(ck.toDefault(null, 'test'), 'test');
  });

  it('should convert To Epoch.', () => {
    const date = new Date();
    assert.equal(ck.toEpoch(date), date.getTime());
  });

  it('should convert To Float.', () => {

    assert.equal(ck.toFloat(123.50), 123.50);
    assert.equal(ck.toFloat('123.50'), 123.50);
    assert.equal(ck.toFloat('123.50a'), 123.50);
    assert.equal(ck.toFloat(null), null);
    assert.equal(ck.toFloat('yes'), 1);
    assert.equal(ck.toFloat('no'), 0);
  });

  it('should convert To JSON.', () => {
    const obj = { name: 'Beth', age: 33 };
    const defStr = '{"name": "bob"}';
    assert.equal(ck.toJSON(obj), JSON.stringify(obj));
    assert.equal(ck.toJSON(null), null);
    assert.equal(ck.toJSON(null, defStr), defStr);
    assert.equal(ck.toJSON(obj, true), JSON.stringify(obj, null, 2));
  });

  it('should convert To Integer.', () => {
    assert.equal(ck.toInteger(123), 123);
    assert.equal(ck.toInteger(null), null);
    assert.equal(ck.toInteger('123.50'), 123);
    assert.equal(ck.toInteger('123.50a'), 123);
    assert.equal(ck.toInteger('yes'), 1);
    assert.equal(ck.toInteger('no'), 0);
  });

  it('should convert To Map.', () => {
    assert.equal(ck.toMap(null), null);
    assert.deepEqual(ck.toMap('one'), <any>{ 0: 'one' });
    assert.deepEqual(ck.toMap('one,two'), <any>{ 0: 'one', 1: 'two' });
    assert.deepEqual(ck.toMap([{ key: '123', name: 'Joe' }], 'key'), <any>{ '123': { name: 'Joe' } });
    assert.deepEqual(ck.toMap([{ name: 'Joe' }, { name: 'Amy' }]), <any>{ '0': { name: 'Joe' }, '1': { name: 'Amy' } });
    assert.deepEqual(ck.toMap({}, {}), {});
    assert.deepEqual(ck.toMap(['one', 'two']), <any>{ 0: 'one', 1: 'two' });
  });

  it('should convert to Nested.', () => {
    assert.deepEqual(ck.toNested(unnested), nested);
  });

  it('should convert To Number.', () => {
    assert.equal(ck.toNumber('123.50'), 123.50);
    assert.equal(ck.toNumber('123.50a'), 123.50);
  });

  it('should convert To RegExp.', () => {
    const exp = new RegExp('test');
    const exp2 = ck.toRegExp(exp.toString());
    const exp3 = new RegExp('just some string');
    assert.equal(ck.toRegExp(exp), exp);
    assert.equal(exp2.test('test'), exp.test('test'));
    assert.equal(ck.toRegExp(null), null);
    assert.equal(ck.toRegExp('just some string').toString(), exp3.toString());
    assert.instanceOf(ck.toRegExp('just some string'), RegExp);
    assert.instanceOf(ck.toRegExp('/^test$/gi'), RegExp);
  });

  it('should convert To String.', () => {
    assert.equal(ck.toString('test'), 'test');
    assert.equal(ck.toString(123), '123');
    assert.equal(ck.toString(null), null);
  });

  it('should convert to Unnested.', () => {
    assert.deepEqual(ck.toUnnested(nested, nested), unnested);
    // this should be null since disabling
    // key prefixing would result in dupes.
    assert.equal(ck.toUnnested(nested, false), null);
  });

  it('should add to Window.', () => {
    // Fake window object set env.BROWSER to true
    // then disable when test is done.
    const helpers = {
      sayhi: () => { /* just a placeholder */ },
      alert: () => { /* just a placeholder */ }
    };
    global['window'] = {};
    process.env['BROWSER'] = 'true';
    ck.toWindow('helpers', helpers);
    ck.toWindow('key', 'value');
    assert.deepEqual(global['window'], { helpers: helpers, key: 'value' });
    global['window'] = {};
    ck.toWindow(helpers);
    assert.deepEqual(global['window'], helpers);
    delete process.env['BROWSER'];
    delete global['window'];
  });

  // TYPE CHEKS

  it('should get the value\'s Type.', () => {
    class TypeClass { }
    assert.equal(ck.getType(new Date()), 'date');
    assert.equal(ck.getType(new RegExp(/test/)), 'regexp');
    assert.equal(ck.getType(12), 'integer');
    assert.equal(ck.getType(12.5), 'float');
    assert.equal(ck.getType(12.5, true), 'number');
    assert.equal(ck.getType('test'), 'string');
    assert.equal(ck.getType([]), 'array');
    assert.equal(ck.getType({}), 'literal');
    assert.equal(ck.getType({}, true), 'object');
    assert.equal(ck.getType(new Error()), 'error');
    assert.equal(ck.getType(null), 'null');
    assert.equal(ck.getType(true, false, 'any'), 'boolean');
    assert.equal(ck.getType(false, 'any'), 'boolean');
    assert.equal(ck.getType(function () { }), 'function');
    assert.equal(ck.getType(new TypeClass(), true), 'object');
    assert.equal(ck.getType(new TypeClass()), 'TypeClass');
  });

  it('should should Cast Type.', () => {
    assert.isBoolean(ck.castType(1, 'boolean'));
    assert.equal(ck.castType('test', function (v) { return v; }), 'test');
    assert.deepEqual(ck.castType([1, 0], ['boolean']), [true, false]);
    assert.deepEqual(ck.castType(['1', '0'], ['integer']), [1, 0]);
    assert.deepEqual(ck.castType(['1', '0'], ['float']), [1, 0]);
    assert.equal(ck.castType(null, 'string'), null);
    assert.deepEqual(ck.castType({}, {}), {});
    assert.equal(ck.castType('test', 'any'), 'test');
    assert.equal(ck.castType(123.25, 'integer'), 123);
    assert.equal(ck.castType('123.25', 'float'), 123.25);
    assert.equal(ck.castType('123.25', 'number'), 123.25);
    assert.equal(ck.castType<RegExp>('/test/', 'regexp').toString(), (new RegExp('test')).toString());
    assert.equal(ck.castType<Date>('01/01/2017 12:30:22', 'date').getTime(), (new Date('01/01/2017 12:30:22').getTime()));
    assert.equal(ck.castType('test', 'other', 'default'), 'default');
  });

});
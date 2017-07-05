import * as chai from 'chai';
import * as mocha from 'mocha';

const expect = chai.expect;
const should = chai.should;
const assert = chai.assert;

import * as ck from './';

const testObj = {
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
    // home: '3335551212' note removed above in test.
  },
  active: true
};

describe('Chek', () => {

  before((done) => {
    done();
  });

  // IS CHEKS

  it('should check if is NodeJS', () => {
    assert.equal(ck.isNode(), true);
  });

  it('should check if is Array.', () => {
    assert.equal(ck.isArray([]), true);
  });

  it('should check if is Boolean.', () => {
    assert.equal(ck.isBoolean(false), true);
  });

  it('should check if is Date', () => {
    assert.equal(ck.isDate(new Date()), true);
  });

  it('should check is Empty', () => {
    assert.equal(ck.isEmpty({}), true);
    assert.equal(ck.isEmpty([]), true);
  });

  it('should check if is Equal', () => {
    assert.equal(ck.isEqual('test', 'test'), true);
  });

  it('should check if is Error.', () => {
    assert.equal(ck.isError(new Error()), true);
  });

  it('should check if is Function.', () => {
    assert.equal(ck.isFunction(ck.noop), true);
  });

  it('should check if is Instance.', () => {
    class MyClass { };
    const myClass = new MyClass();
    assert.equal(ck.isInstance(myClass, MyClass), true);
  });

  it('should check if is Function', () => {
    assert.equal(ck.isNan('test'), true);
  });

  it('should check if is Null.', () => {
    assert.equal(ck.isNull(null), true);
  });

  it('should check if is Number.', () => {
    assert.equal(ck.isNumber(12), true);
  });

  it('should check if is Object.', () => {
    assert.equal(ck.isObject({}), true);
    assert.equal(ck.isObject([]), true);
    assert.equal(ck.isObject(new (class MyClass { })), true);
  });

  it('should check if is Plain Object.', () => {
    assert.equal(ck.isPlainObject({}), true);
    assert.equal(ck.isPlainObject(new (class MyClass { })), false);
  });

  it('should check if is RegExp.', () => {
    assert.equal(ck.isRegExp(/test/), true);
  });

  it('should check if is Unique.', () => {
    assert.equal(ck.isUnique([1, 2, 3, 4, 5], 3), true);
    assert.equal(ck.isUnique([1, 4, 2, 3, 4, 5], 4), false);
  });

  // OBJECT CHEKS

  it('should get phone.mobile from object literal.', () => {
    assert.equal(ck.get(testObj, 'phone.mobile'), '8885551212');
  });

  it('should set phone.mobile in object literal.', () => {
    ck.set(testObj, 'phone.home', '3335551212');
    assert.equal(ck.get(testObj, 'phone.home'), '3335551212');
  });

  it('should remove phone.home from object literal.', () => {
    ck.del(testObj, 'phone.home');
    assert.equal(ck.get(testObj, 'phone.home'), undefined);
  });

  it('should count the number of duplicates in array.', () => {
    assert.equal(ck.duplicates(['Mary', 'Jim', 'John', 'Anthony', 'John'], 'John'), 2);
  });

  it('should check if array contains value.', () => {
    assert.equal(ck.contains([1, 2, 3], 3), true);
    assert.equal(ck.contains([1, 2, 3], 6), false);
  });

  it('should check if source array contains any value in inspected array.', () => {
    assert.equal(ck.containsAny([1, 2, 3], [8, 6, 3]), true);
    assert.equal(ck.containsAny([1, 2, 3], [8, 6, 5]), false);
  });

  it('should get array of keys from object.', () => {
    assert.equal(ck.keys(testObj).length, 3);
  });

  it('should flatten nested array.', () => {
    assert.deepEqual(ck.flatten([1, 2, [3, 4, 5]]), [1, 2, 3, 4, 5]);
  });

  it('should get the first value in array.', () => {
    assert.equal(ck.first([1, 2, 3]), 1);
  });

  it('should get the last value in array.', () => {
    assert.equal(ck.last([1, 2, 3]), 3);
  });

  it('should get extend object with property.', () => {
    assert.deepEqual(ck.extend({}, testObj, { active: true }), extObj);
  });

  it('should clone object', () => {
    const clone: any = ck.clone(extObj);
    clone.age = 25;
    assert.notEqual(clone.age, extObj.age);
    class CloneClass { test() { return 'cloned'; } }
    const uncloned = new CloneClass();
    const copy = uncloned;
    const cloned = ck.clone<CloneClass>(uncloned, true);
    console.log(cloned.test());
  });


});
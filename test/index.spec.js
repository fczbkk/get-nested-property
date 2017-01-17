import {
  getNestedProperty,
  deleteNestedProperty
} from './../src/';


describe('getNestedProperty', function () {

  it('should get referenced value', function () {
    const data = {aaa: 'bbb'};
    expect(getNestedProperty(data, 'aaa')).toEqual('bbb');
  });

  it('should not throw if data is `undefined`', function () {
    expect(getNestedProperty(undefined, 'aaa')).toEqual(undefined);
  });

  it('should not throw if data is `null`', function () {
    expect(getNestedProperty(null, 'aaa')).toEqual(undefined);
  });

  it('should get deep referenced value via dot notation', function () {
    const data = {aaa: {bbb: 'ccc'}};
    expect(getNestedProperty(data, 'aaa')).toEqual({bbb: 'ccc'});
    expect(getNestedProperty(data, 'aaa.bbb')).toEqual('ccc');
  });

  it('should get deep referenced value via array notation', function () {
    const data = {aaa: {bbb: 'ccc'}};
    expect(getNestedProperty(data, ['aaa', 'bbb'])).toEqual('ccc');
  });

  it('should get deep referenced value via combined notation', function () {
    const data = {aaa: {bbb: {ccc: 'ddd'}}};
    expect(getNestedProperty(data, ['aaa.bbb', 'ccc'])).toEqual('ddd');
  });

  it('should get deep referenced value via variables', function () {
    const data = {aaa: {bbb: 'ccc'}};
    const ddd = 'aaa', eee = 'bbb';
    expect(getNestedProperty(data, [ddd, eee])).toEqual('ccc');
  });

  it('should get `undefined` on missing value', function () {
    const data = {};
    expect(getNestedProperty(data, 'xxx')).toEqual(undefined);
  });

  it('should get `undefined` on missing nested value', function () {
    const data = {aaa: {bbb: 'ccc'}};
    expect(getNestedProperty(data, 'aaa.xxx')).toEqual(undefined);
  });

  it('should get `undefined` on missing path', function () {
    const data = {};
    expect(getNestedProperty(data, 'xxx.yyy')).toEqual(undefined);
  });

  it('should get `null` value', function () {
    const data = {aaa: null};
    expect(getNestedProperty(data, 'aaa')).toEqual(null);
  });

  it('should use `window` as data is undefined', function () {
    window.aaa = 'bbb';
    expect(getNestedProperty(undefined, 'aaa')).toEqual('bbb');
    delete window.aaa;
  });

  it('should return whole data object if path is undefined', function () {
    const data = {aaa: 'bbb'};
    expect(getNestedProperty(data)).toEqual(data);
  });

  it('should throw an error if path is not a string or array', function () {
    let fn;

    fn = function () {getNestedProperty({}, '')};
    expect(fn).not.toThrow();

    fn = function () {getNestedProperty({}, [])};
    expect(fn).not.toThrow();

    fn = function () {getNestedProperty({}, null)};
    expect(fn).toThrow();
  });

  it('should return optional default value', function () {
    expect(getNestedProperty({}, 'xxx', 'aaa')).toEqual('aaa');
  });

  it('should allow to invoke returned value', function () {
    const fn = function () {
      getNestedProperty(window, 'getComputedStyle')();
    };
    expect(fn).not.toThrow();
  });

  it('should allow to invoke fallback value', function () {
    const fallback_fn = function () {};
    const fn = function () {
      getNestedProperty(window, 'xxx', fallback_fn)();
    };
    expect(fn).not.toThrow();
  });

  it('should not throw when encountering `null` within path', function () {
    const fn = function () {
      getNestedProperty({aaa: null}, 'aaa.bbb.ccc');
    };
    expect(fn).not.toThrow();
  });

  it('should return `undefined` when encountering `undefined` within path', function () {
    const result = getNestedProperty({aaa: undefined}, 'aaa.bbb.ccc');
    expect(result).toEqual(undefined);
  });

  it('should not throw when encountering `null` within path', function () {
    const fn = function () {
      getNestedProperty({aaa: null}, 'aaa.bbb.ccc');
    };
    expect(fn).not.toThrow();
  });

  it('should return `undefined` when encountering `undefined` within path', function () {
    const result = getNestedProperty({aaa: undefined}, 'aaa.bbb.ccc');
    expect(result).toEqual(undefined);
  });

  it('should not throw when input object is `undefined`', function () {
    const result = getNestedProperty(undefined, 'aaa.bbb.ccc');
    expect(result).toEqual(undefined);
  });

  it('should return `undefined` when input object is `undefined`', function () {
    const fn = function () {
      getNestedProperty(undefined, 'aaa');
    };
    expect(fn).not.toThrow();
  });

});

describe('deleteNestedProperty', function () {

  it('should delete shallow property', function () {
    const data = {aaa: 'bbb', ccc: 'ddd'};
    const result = deleteNestedProperty(data, 'aaa');
    expect(result).toEqual({ccc: 'ddd'});
  });

  it('should delete property via dot notation', function () {
    const data = {aaa: {bbb: 'ccc', ddd: 'eee'}, fff: 'ggg'};
    const result = deleteNestedProperty(data, 'aaa.bbb');
    expect(result).toEqual({aaa: {ddd: 'eee'}, fff: 'ggg'});
  });

  it('should delete property via array notation', function () {
    const data = {aaa: {bbb: 'ccc', ddd: 'eee'}, fff: 'ggg'};
    const result = deleteNestedProperty(data, ['aaa', 'bbb']);
    expect(result).toEqual({aaa: {ddd: 'eee'}, fff: 'ggg'});
  });

  it('should delete property via combined notation', function () {
    const data = {aaa: {bbb: {ccc: 'ddd', eee: 'fff'}}};
    const result = deleteNestedProperty(data, ['aaa', 'bbb.ccc']);
    expect(result).toEqual({aaa: {bbb: {eee: 'fff'}}});
  });

  it('should ignore non-existing property', function () {
    const data = {aaa: 'bbb'};
    const result = deleteNestedProperty(data, 'xxx');
    expect(result).toEqual({aaa: 'bbb'});
  });

});

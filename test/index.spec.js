import getNestedProperty from './../src/';


describe('getNestedProperty', function () {

  it('should get referenced value', function () {
    const data = {aaa: 'bbb'};
    expect(getNestedProperty(data, 'aaa')).toEqual('bbb');
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

});

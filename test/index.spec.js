import getNestedProperty from './../src/';


describe('getNestedProperty', function () {

  it('should get referenced value', function () {
    const data = {aaa: 'bbb'};
    expect(getNestedProperty(data, 'aaa')).toEqual('bbb');
  });

  it('should get deep referenced value', function () {
    const data = {aaa: {bbb: 'ccc'}};
    expect(getNestedProperty(data, 'aaa')).toEqual({bbb: 'ccc'});
    expect(getNestedProperty(data, 'aaa.bbb')).toEqual('ccc');
  });

  it('should get `undefined` on missing value', function () {
    const data = {};
    expect(getNestedProperty(data, 'xxx')).toEqual(undefined);
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

  it('should throw an error if path is not a string', function () {
    const fn = function () {getNestedProperty({}, [])};
    expect(fn).toThrow();
  });

});

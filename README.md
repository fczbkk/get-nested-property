# getNestedProperty

Get specific property of nested object, without the need for checking each step separately.

## Documentation

### getNestedProperty

Returns nested property by path.

**Parameters**

-   `data` **\[[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)]** Data object in which we will be looking for property. (optional, default `window`)
-   `path` **\[([string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) \| [Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array))]** Dot separated path to the nested property inside object. If array is used, it will be merged together as a single path. (optional, default `''`)
-   `default_value` **\[Any]** Returned if property at given path is not defined.

**Examples**

```javascript
var data = {aaa: {bbb: 'ccc'}};
getNestedProperty(data, 'aaa.bbb');       // --> 'ccc'
getNestedProperty(data, ['aaa', 'bbb']);  // --> 'ccc'
```

Returns **Any** Found property of the object or `undefined` if not found.

## Bug reports, feature requests and contact

If you found any bugs, if you have feature requests or any questions, please, either [file an issue at GitHub](https://github.com/fczbkk/get-nested-property/issues) or send me an e-mail at <a href="mailto:riki@fczbkk.com">riki@fczbkk.com</a>.

## License

getNestedProperty is published under the [MIT license](https://github.com/fczbkk/get-nested-property/blob/master/LICENSE).

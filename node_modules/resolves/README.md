# resolves

Resolves is a small utility that will resolve the parent folder of the
supplied root until the iterator function returns a given value.

## Installation

```
npm install --save resolves
```

## Usage

```js
var resolves = require('resolves');
var path = require('path');
var fs = require('fs');

var gitignore = resolves(process.cwd(), function next(dir) {
  var ignore = path.join(dir, '.gitignore');

  if (fs.existsSync(ignore)) return fs.readFileSync(ignore, 'utf-8');
});
```

As seen in the snippet above, the `resolve` method requires 2 arguments:

- `dir` The initial directory that we start resolving in.
- `iteractor` A function that is called for every directory until it returns
  a value that can be returned. This includes the directory you initially
  provided.

If the iterator does not find anything, it will keep iterating until it reaches
the root folder. 

## License

MIT

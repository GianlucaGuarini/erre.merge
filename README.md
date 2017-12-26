<img alt="erre.js" src="https://cdn.rawgit.com/GianlucaGuarini/erre/master/erre-logo.svg" width="50%"/>

# erre.merge

[erre](https://github.com/GianlucaGuarini/erre) plugin to merge the results multiple streams into one

[![Build Status][travis-image]][travis-url]

[![NPM version][npm-version-image]][npm-url]
[![NPM downloads][npm-downloads-image]][npm-url]
[![MIT License][license-image]][license-url]

## Usage

```js
import merge from 'erre.merge'
import erre from 'erre'

erre.install('merge', merge)

const stream1 = erre(val => val + 1)
const stream2 = erre(val => val * 2)
const stream = erre.merge(stream1, stream2)

stream.on.value(([val1, val2]) => {
  console.log(val1, val2) // 3, 8
})

stream1.push(2)
stream2.push(4)
```

[travis-image]:https://img.shields.io/travis/GianlucaGuarini/erre.merge.svg?style=flat-square
[travis-url]:https://travis-ci.org/GianlucaGuarini/erre.merge

[license-image]:http://img.shields.io/badge/license-MIT-000000.svg?style=flat-square
[license-url]:LICENSE

[npm-version-image]:http://img.shields.io/npm/v/erre.merge.svg?style=flat-square
[npm-downloads-image]:http://img.shields.io/npm/dm/erre.merge.svg?style=flat-square
[npm-url]:https://npmjs.org/package/erre.merge


<img alt="erre.js" src="https://cdn.rawgit.com/GianlucaGuarini/erre/main/erre-logo.svg" width="50%"/>

# erre.merge

[erre](https://github.com/GianlucaGuarini/erre) plugin to merge the results multiple streams into one

[![Build Status][ci-image]][ci-url]

[![NPM version][npm-version-image]][npm-url]
[![NPM downloads][npm-downloads-image]][npm-url]
[![MIT License][license-image]][license-url]

## Installation

```sh
npm i erre.merge -S
```

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

[ci-image]: https://img.shields.io/github/actions/workflow/status/gianlucaguarini/erre.merge/test.yml?style=flat-square
[ci-url]: https://github.com/gianlucaguarini/erre.merge/actions
[license-image]: http://img.shields.io/badge/license-MIT-000000.svg?style=flat-square
[license-url]: LICENSE
[npm-version-image]: http://img.shields.io/npm/v/erre.merge.svg?style=flat-square
[npm-downloads-image]: http://img.shields.io/npm/dm/erre.merge.svg?style=flat-square
[npm-url]: https://npmjs.org/package/erre.merge

## API

### merge

Create a single stream merging multiple erre streams

**Parameters**

-   `streams` **...Generator** [erre streams generators]((https://github.com/GianlucaGuarini/erre#stream))

Returns **Generator** a [new erre stream generator]((https://github.com/GianlucaGuarini/erre#stream))

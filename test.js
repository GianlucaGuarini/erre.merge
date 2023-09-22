import assert from 'node:assert'
import erre from 'erre'
import merge from './index.next.js'

erre.install('merge', merge)

describe('erre.merge', () => {
  it('it can properly listen multiple streams', (done) => {
    const stream1 = erre(val => val + 1)
    const stream2 = erre(val => val * 2)
    const stream = erre.merge(stream1, stream2)

    stream.on.value(([val1, val2]) => {
      assert.equal(val1, 2)
      assert.equal(val2, 4)
      done()
    })

    stream1.push(1)
    stream2.push(2)
  })

  it('it ends when one of the streams will end', (done) => {
    const stream1 = erre(val => val + 1)
    const stream2 = erre(val => val * 2)
    const stream = erre.merge(stream1, stream2)

    stream.on.value(() => {
      throw 'you should be never called'
    })

    stream.on.end(done)

    stream1.push(1)
    stream2.end()
    stream2.push(2)
  })
})

import erre from 'erre'
import curry from 'curri'

/**
 * Create a single stream merging multiple erre streams
 * @param   {...Generator} streams - erre streams generators
 * @returns {Generator} - a new erre stream generator
 */
export default function merge(...streams) {
  const stream = erre()
  const channels = new Map()
  const canDispatch = () => channels.size === streams.length

  // dispatch only when all the streams will send a value
  function onValue(s, v) {
    // cache the value received
    channels.set(s, v)

    // check if the main stream can dispatch the values received
    if (canDispatch()) {
      stream.push(Array.from(channels.values()))
      // clean up the channels
      channels.clear()
    }
  }

  // end the stream if one of the sub streams will be eneded
  stream.on.end(() => channels.clear())

  // sync all the children streams
  streams.forEach(s => {
    s.on.value(curry(onValue, s))
    s.on.end(stream.end)
  })

  return stream
}
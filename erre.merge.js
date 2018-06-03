(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('erre')) :
  typeof define === 'function' && define.amd ? define(['erre'], factory) :
  (global.merge = factory(global.erre));
}(this, (function (erre) { 'use strict';

  erre = erre && erre.hasOwnProperty('default') ? erre['default'] : erre;

  /**
   * Function to curry any javascript method
   * @param   {Function}  fn - the target function we want to curry
   * @param   {...[args]} acc - initial arguments
   * @returns {Function|*} it will return a function until the target function
   *                       will receive all of its arguments
   */
  function curry(fn, ...acc) {
    return (...args) => {
      args = [...acc, ...args];

      return args.length < fn.length ?
        curry(fn, ...args) :
        fn(...args)
    }
  }

  /**
   * Create a single stream merging multiple erre streams
   * @param   {...Generator} streams - [erre streams generators]((https://github.com/GianlucaGuarini/erre#stream))
   * @returns {Generator} - a [new erre stream generator]((https://github.com/GianlucaGuarini/erre#stream))
   */
  function merge(...streams) {
    const stream = erre();
    const channels = new Map();
    const canDispatch = () => channels.size === streams.length;

    // dispatch only when all the streams will send a value
    function onValue(s, v) {
      // cache the value received
      channels.set(s, v);

      // check if the main stream can dispatch the values received
      if (canDispatch()) {
        stream.push(Array.from(channels.values()));
        // clean up the channels
        channels.clear();
      }
    }

    // end the stream if one of the sub streams will be eneded
    stream.on.end(() => channels.clear());

    // sync all the children streams
    streams.forEach(s => {
      s.on.value(curry(onValue, s));
      s.on.end(stream.end);
    });

    return stream
  }

  return merge;

})));

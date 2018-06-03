import resolve from 'rollup-plugin-node-resolve'

export default {
  input: 'index.next.js',
  external: ['erre'],
  globals: {
    erre: 'erre'
  },
  plugins: [
    resolve({
      jsnext: true
    })
  ],
  output: [
    {
      name: 'merge',
      file: 'erre.merge.js',
      format: 'umd'
    }
  ]
}
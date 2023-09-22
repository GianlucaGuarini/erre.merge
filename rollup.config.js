import { nodeResolve } from '@rollup/plugin-node-resolve'

const globals = {
  erre: 'erre'
}

export default {
  input: 'index.next.js',
  external: ['erre'],
  plugins: [
    nodeResolve()
  ],
  output: [
    {
      name: 'merge',
      file: 'index.cjs',
      format: 'umd',
      globals
    },
    {
      name: 'merge',
      file: 'index.js',
      format: 'es',
      globals
    }
  ]
}

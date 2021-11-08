import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import { terser } from "rollup-plugin-terser";

const commonTerser = terser(require('./terser.config.js'))

const commonOutput = {
    name: 'globalFP',
    exports: 'named',
  }

export default {
    input: 'src/index.ts',    
    output: [{
    ...commonOutput,
      file: 'dist/gfp.js',
      format: 'iife'
    },
    {
      ...commonOutput,
        file: 'dist/gfp.min.js',
        format: 'iife',
        plugins: [commonTerser]
      }],
    plugins: [
        typescript({module: "ESNext"}),
        nodeResolve({ preferBuiltins: false }), // or `true`
        commonjs()      
    ],
    external: ['moment']
  };
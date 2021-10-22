import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';

const commonOutput = {
    name: 'GlobalFingerPrint',
    exports: 'named',
  }

export default {
    input: 'src/index.ts',    
    output: {
    ...commonOutput,
      file: 'dist/gfp.js',
      format: 'iife'
    },
    plugins: [
        typescript({module: "ESNext"}),
        nodeResolve({ preferBuiltins: false }), // or `true`
        commonjs()      
    ],
    external: ['moment']
  };
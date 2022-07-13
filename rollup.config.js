import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import { terser } from "rollup-plugin-terser";
import json from "@rollup/plugin-json";

const commonTerser = terser(require('./terser.config.js'))

const commonOutput = {
    name: 'globalFP',
    exports: 'named',
  }

const commonInput={
  input: 'src/index.ts', 
  plugins: [
    typescript({module: "ESNext"}),
    nodeResolve({ preferBuiltins: false }), // or `true`
    commonjs(),
    json()     
], 
}

export default [{
    ...commonInput, 
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
      }    
    ],   
    external: ['moment']
  }
  ];
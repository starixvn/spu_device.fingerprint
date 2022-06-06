import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import { terser } from "rollup-plugin-terser";
import json from "@rollup/plugin-json";
import {dependencies} from "./package.json";

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

const robotOutput={
  name: 'robotFP',
  exports: 'named'
}

const robotInput={
  input: 'src/robotDetection/index.ts',
  plugins: [
    typescript({module: "ESNext"}),
    nodeResolve({ preferBuiltins: false }), // or `true`
    commonjs(),
    json()     
  ]
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
  },
  {
    ...commonInput, 
    output: [{
    ...commonOutput,
      file: 'dist/gfp.cjs.js',
      format: 'cjs'
    },
    {
      ...commonOutput,
        file: 'dist/gfp.es.js',
        format: 'es'
      }     
    ],   
    external: Object.keys(dependencies)
  },
  {
    ...robotInput,
    output: [
      {
        ...robotOutput,
        file: 'dist/fprobot.js',
        format: 'iife'
      },
      {
        ...robotOutput,
        file: 'dist/fprobot.min.js',
        format: 'iife',
        plugins: [commonTerser]
      }
    ],   
    external: ['moment']
  }
  ];
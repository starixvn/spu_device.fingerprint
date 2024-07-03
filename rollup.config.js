import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import { terser } from "rollup-plugin-terser";
import json from "@rollup/plugin-json";

const commonTerser = terser(require('./terser.config.js'))

const commonInput = {
  input: 'src/fingerprint/index.ts',
  plugins: [
    typescript({ module: "ESNext" }),
    nodeResolve({ preferBuiltins: false }), // or `true`
    commonjs(),
    json()
  ]
}

const newCookieInput = {
  input: 'src/newCookie/index.ts',
  plugins: [
    typescript({ module: "ESNext" }),
    nodeResolve({ preferBuiltins: false }), // or `true`
    commonjs(),
    json()
  ]
}

const botDInput = {
  input: 'src/botD/index.ts',
  plugins: [
    typescript({ module: "ESNext" }),
    nodeResolve({ preferBuiltins: false }), // or `true`
    commonjs(),
    json()
  ]
}

const encryptInput = {
  input: 'src/encrypt.ts',
  plugins: [
    typescript({ module: "ESNext" }),
    nodeResolve({ preferBuiltins: false }), // or `true`
    commonjs(),
    json()
  ]
}

const encryptOutPut = {
  name: 'encrypt',
  exports: 'named'
}

export default [
  {
    ...commonInput,
    output: [{
      name: 'gfpCode',
      exports: 'named',
      file: 'dist/gfp.js',
      format: 'iife'
    },
    {
      name: 'gfpCode',
      exports: 'named',
      file: 'dist/gfp.min.js',
      format: 'iife',
      plugins: [commonTerser]
    }
    ],
    external: ['moment']
  },
  {
    ...newCookieInput,
    output: [{
      name: 'gfpCandy',
      file: 'dist/newCookie.js',
      format: 'iife'
    }, {
      name: 'gfpCandy',
      file: 'dist/newCookie.min.js',
      format: 'iife',
      plugins: [commonTerser]
    }]
  },
  {
    ...botDInput,
    output: [{
      file: 'dist/Detecas.BotD.js',
      format: 'iife',
      banner: "Detecas.BotD = "
    }]
  },
  {
    ...encryptInput,
    output: [{
      ...encryptOutPut,
      file: 'dist/encrypt.js',
      format: 'iife'
    }, {
      ...encryptOutPut,
      file: 'dist/encrypt.min.js',
      format: 'iife',
      plugins: [commonTerser]
    }]
  },
];
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
  input: 'src/fp.ts', 
  plugins: [
    typescript({module: "ESNext"}),
    nodeResolve({ preferBuiltins: false }), // or `true`
    commonjs(),
    json()
  ]
}

const newCookieOutPut={
  name:'fpNewCookie',
  exports: 'named'
}

const newCookieInput={
  input: 'src/newCookie.ts', 
  plugins: [
    typescript({module: "ESNext"}),
    nodeResolve({ preferBuiltins: false }), // or `true`
    commonjs(),
    json()
]}

const headlessInput={
  input: 'src/headlessDetection.ts', 
  plugins: [
    typescript({module: "ESNext"}),
    nodeResolve({ preferBuiltins: false }), // or `true`
    commonjs(),
    json()
]}

const headlessOutPut={
  name:'fpHeadless',
  exports: 'named'
}

const browserInfoInput={
  input: 'src/browserDetect.ts', 
  plugins: [
    typescript({module: "ESNext"}),
    nodeResolve({ preferBuiltins: false }), // or `true`
    commonjs(),
    json()
]}

const browserInfoOutPut={
  name:'fpBrowserDetect',
  exports: 'named'
}

const cryptInput={
  input: 'src/crypt.ts', 
  plugins: [
    typescript({module: "ESNext"}),
    nodeResolve({ preferBuiltins: false }), // or `true`
    commonjs(),
    json()
]}

const cryptOutPut={
  name:'crypt',
  exports: 'named'
}

const subtleCryptInput={
  input: 'src/subtleCrypto.ts', 
  plugins: [
    typescript({module: "ESNext"}),
    nodeResolve({ preferBuiltins: false }), // or `true`
    commonjs(),
    json()
]}

const subtleCryptOutPut={
  name:'subtleCrypto',
  exports: 'named'
}

const botDInput={
  input: 'src/botD/index.ts',
  plugins: [
    typescript({module: "ESNext"}),
    nodeResolve({ preferBuiltins: false }), // or `true`
    commonjs(),
    json()
]}

const botDOutPut={
  name:'BotD',
  export: 'named'
}

const deviceTypeInput={
  input: 'src/deviceType/index.ts',
  plugins: [
    typescript({module: "ESNext"}),
    nodeResolve({ preferBuiltins: false }), // or `true`
    commonjs(),
    json()
]}

const deviceTypeOutPut={
  name:'deviceType',
  export: 'named'
}

export default [
  {
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
    ...newCookieInput,
    output:[{
      ...newCookieOutPut,
      file:'dist/newCookie.js',
      format: 'iife'
    },{
      ...newCookieOutPut,
      file:'dist/newCookie.min.js',
      format: 'iife',
      plugins: [commonTerser]
    }]
  },
  {
    ...headlessInput,
    output:[{
      ...headlessOutPut,
      file:'dist/headlessBrowser.js',
      format: 'iife'
    },{
      ...headlessOutPut,
      file:'dist/headlessBrowser.min.js',
      format: 'iife',
      plugins: [commonTerser]
    }]
  },
  {
    ...browserInfoInput,
    output:[{
      ...browserInfoOutPut,
      file:'dist/browserInfo.js',
      format: 'iife'
    },{
      ...browserInfoOutPut,
      file:'dist/browserInfo.min.js',
      format: 'iife',
      plugins: [commonTerser]
    }]
  },
  {
    ...cryptInput,
    output:[{
      ...cryptOutPut,
      file:'dist/crypt.js',
      format: 'iife'
    },{
      ...cryptOutPut,
      file:'dist/crypt.min.js',
      format: 'iife',
      plugins: [commonTerser]
    }]
  },
  {
    ...subtleCryptInput,
    output:[{
      ...subtleCryptOutPut,
      file:'dist/subtleCrypt.js',
      format: 'iife'
    },{
      ...cryptOutPut,
      file:'dist/subtleCrypt.min.js',
      format: 'iife',
      plugins: [commonTerser]
    }]
  },
  {
    ...botDInput,
    output:[{
      ...botDOutPut,
      file:'dist/BotD.js',
      format: 'iife'
    }]
  },
  {
    ...deviceTypeInput,
    output:[{
      ...deviceTypeOutPut,
      file:'dist/deviceType.js',
      format: 'iife'
    },{
      ...deviceTypeOutPut,
      file:'dist/deviceType.min.js',
      format: 'iife',
      plugins: [commonTerser]
    }]
  }
  ];
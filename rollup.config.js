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
]}

const cookieOutPut={
  name:'fpCookie',
  export: 'named'
}

const cookieInput={
  input: 'src/cookie.ts', 
  plugins: [
    typescript({module: "ESNext"}),
    nodeResolve({ preferBuiltins: false }), // or `true`
    commonjs(),
    json()
]}

const newCookieOutPut={
  name:'fpNewCookie',
  export: 'named'
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
  export: 'named'
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
  export: 'named'
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
  export: 'named'
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
    ...cookieInput,
    output:[{
      ...cookieOutPut,
      file:'dist/cookie.js',
      format: 'iife'
    },{
      ...cookieOutPut,
      file:'dist/cookie.min.js',
      format: 'iife',
      plugins: [commonTerser]
    }]
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
  }
  ];
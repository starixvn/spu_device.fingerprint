"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.config = config;
exports.isDebug = isDebug;

var _fingerprintjs = _interopRequireWildcard(require("@fingerprintjs/fingerprintjs"));

var _localforage = _interopRequireDefault(require("localforage"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return generator._invoke = function (innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; }(innerFn, self, context), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; this._invoke = function (method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); }; } function maybeInvokeDelegate(delegate, context) { var method = delegate.iterator[context.method]; if (undefined === method) { if (context.delegate = null, "throw" === context.method) { if (delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method)) return ContinueSentinel; context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method"); } return ContinueSentinel; } var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) { if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; } return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, define(Gp, "constructor", GeneratorFunctionPrototype), define(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (object) { var keys = []; for (var key in object) { keys.push(key); } return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) { "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); } }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
function __rest(s, e) {
  var t = {};

  for (var p in s) {
    if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  }

  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
}

function __awaiter(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
}

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function commonjsRequire(path) {
  throw new Error('Could not dynamically require "' + path + '". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.');
}

var cryptoJs = {
  exports: {}
};
var core = {
  exports: {}
};

(function (module, exports) {
  (function (root, factory) {
    {
      // CommonJS
      module.exports = factory();
    }
  })(commonjsGlobal, function () {
    /*globals window, global, require*/

    /**
     * CryptoJS core components.
     */
    var CryptoJS = CryptoJS || function (Math, undefined$1) {
      var crypto; // Native crypto from window (Browser)

      if (typeof window !== 'undefined' && window.crypto) {
        crypto = window.crypto;
      } // Native crypto in web worker (Browser)


      if (typeof self !== 'undefined' && self.crypto) {
        crypto = self.crypto;
      } // Native crypto from worker


      if (typeof globalThis !== 'undefined' && globalThis.crypto) {
        crypto = globalThis.crypto;
      } // Native (experimental IE 11) crypto from window (Browser)


      if (!crypto && typeof window !== 'undefined' && window.msCrypto) {
        crypto = window.msCrypto;
      } // Native crypto from global (NodeJS)


      if (!crypto && typeof commonjsGlobal !== 'undefined' && commonjsGlobal.crypto) {
        crypto = commonjsGlobal.crypto;
      } // Native crypto import via require (NodeJS)


      if (!crypto && typeof commonjsRequire === 'function') {
        try {
          crypto = require('crypto');
        } catch (err) {}
      }
      /*
       * Cryptographically secure pseudorandom number generator
       *
       * As Math.random() is cryptographically not safe to use
       */


      var cryptoSecureRandomInt = function cryptoSecureRandomInt() {
        if (crypto) {
          // Use getRandomValues method (Browser)
          if (typeof crypto.getRandomValues === 'function') {
            try {
              return crypto.getRandomValues(new Uint32Array(1))[0];
            } catch (err) {}
          } // Use randomBytes method (NodeJS)


          if (typeof crypto.randomBytes === 'function') {
            try {
              return crypto.randomBytes(4).readInt32LE();
            } catch (err) {}
          }
        }

        throw new Error('Native crypto module could not be used to get secure random number.');
      };
      /*
       * Local polyfill of Object.create
         */


      var create = Object.create || function () {
        function F() {}

        return function (obj) {
          var subtype;
          F.prototype = obj;
          subtype = new F();
          F.prototype = null;
          return subtype;
        };
      }();
      /**
       * CryptoJS namespace.
       */


      var C = {};
      /**
       * Library namespace.
       */

      var C_lib = C.lib = {};
      /**
       * Base object for prototypal inheritance.
       */

      var Base = C_lib.Base = function () {
        return {
          /**
           * Creates a new object that inherits from this object.
           *
           * @param {Object} overrides Properties to copy into the new object.
           *
           * @return {Object} The new object.
           *
           * @static
           *
           * @example
           *
           *     var MyType = CryptoJS.lib.Base.extend({
           *         field: 'value',
           *
           *         method: function () {
           *         }
           *     });
           */
          extend: function extend(overrides) {
            // Spawn
            var subtype = create(this); // Augment

            if (overrides) {
              subtype.mixIn(overrides);
            } // Create default initializer


            if (!subtype.hasOwnProperty('init') || this.init === subtype.init) {
              subtype.init = function () {
                subtype.$super.init.apply(this, arguments);
              };
            } // Initializer's prototype is the subtype object


            subtype.init.prototype = subtype; // Reference supertype

            subtype.$super = this;
            return subtype;
          },

          /**
           * Extends this object and runs the init method.
           * Arguments to create() will be passed to init().
           *
           * @return {Object} The new object.
           *
           * @static
           *
           * @example
           *
           *     var instance = MyType.create();
           */
          create: function create() {
            var instance = this.extend();
            instance.init.apply(instance, arguments);
            return instance;
          },

          /**
           * Initializes a newly created object.
           * Override this method to add some logic when your objects are created.
           *
           * @example
           *
           *     var MyType = CryptoJS.lib.Base.extend({
           *         init: function () {
           *             // ...
           *         }
           *     });
           */
          init: function init() {},

          /**
           * Copies properties into this object.
           *
           * @param {Object} properties The properties to mix in.
           *
           * @example
           *
           *     MyType.mixIn({
           *         field: 'value'
           *     });
           */
          mixIn: function mixIn(properties) {
            for (var propertyName in properties) {
              if (properties.hasOwnProperty(propertyName)) {
                this[propertyName] = properties[propertyName];
              }
            } // IE won't copy toString using the loop above


            if (properties.hasOwnProperty('toString')) {
              this.toString = properties.toString;
            }
          },

          /**
           * Creates a copy of this object.
           *
           * @return {Object} The clone.
           *
           * @example
           *
           *     var clone = instance.clone();
           */
          clone: function clone() {
            return this.init.prototype.extend(this);
          }
        };
      }();
      /**
       * An array of 32-bit words.
       *
       * @property {Array} words The array of 32-bit words.
       * @property {number} sigBytes The number of significant bytes in this word array.
       */


      var WordArray = C_lib.WordArray = Base.extend({
        /**
         * Initializes a newly created word array.
         *
         * @param {Array} words (Optional) An array of 32-bit words.
         * @param {number} sigBytes (Optional) The number of significant bytes in the words.
         *
         * @example
         *
         *     var wordArray = CryptoJS.lib.WordArray.create();
         *     var wordArray = CryptoJS.lib.WordArray.create([0x00010203, 0x04050607]);
         *     var wordArray = CryptoJS.lib.WordArray.create([0x00010203, 0x04050607], 6);
         */
        init: function init(words, sigBytes) {
          words = this.words = words || [];

          if (sigBytes != undefined$1) {
            this.sigBytes = sigBytes;
          } else {
            this.sigBytes = words.length * 4;
          }
        },

        /**
         * Converts this word array to a string.
         *
         * @param {Encoder} encoder (Optional) The encoding strategy to use. Default: CryptoJS.enc.Hex
         *
         * @return {string} The stringified word array.
         *
         * @example
         *
         *     var string = wordArray + '';
         *     var string = wordArray.toString();
         *     var string = wordArray.toString(CryptoJS.enc.Utf8);
         */
        toString: function toString(encoder) {
          return (encoder || Hex).stringify(this);
        },

        /**
         * Concatenates a word array to this word array.
         *
         * @param {WordArray} wordArray The word array to append.
         *
         * @return {WordArray} This word array.
         *
         * @example
         *
         *     wordArray1.concat(wordArray2);
         */
        concat: function concat(wordArray) {
          // Shortcuts
          var thisWords = this.words;
          var thatWords = wordArray.words;
          var thisSigBytes = this.sigBytes;
          var thatSigBytes = wordArray.sigBytes; // Clamp excess bits

          this.clamp(); // Concat

          if (thisSigBytes % 4) {
            // Copy one byte at a time
            for (var i = 0; i < thatSigBytes; i++) {
              var thatByte = thatWords[i >>> 2] >>> 24 - i % 4 * 8 & 0xff;
              thisWords[thisSigBytes + i >>> 2] |= thatByte << 24 - (thisSigBytes + i) % 4 * 8;
            }
          } else {
            // Copy one word at a time
            for (var j = 0; j < thatSigBytes; j += 4) {
              thisWords[thisSigBytes + j >>> 2] = thatWords[j >>> 2];
            }
          }

          this.sigBytes += thatSigBytes; // Chainable

          return this;
        },

        /**
         * Removes insignificant bits.
         *
         * @example
         *
         *     wordArray.clamp();
         */
        clamp: function clamp() {
          // Shortcuts
          var words = this.words;
          var sigBytes = this.sigBytes; // Clamp

          words[sigBytes >>> 2] &= 0xffffffff << 32 - sigBytes % 4 * 8;
          words.length = Math.ceil(sigBytes / 4);
        },

        /**
         * Creates a copy of this word array.
         *
         * @return {WordArray} The clone.
         *
         * @example
         *
         *     var clone = wordArray.clone();
         */
        clone: function clone() {
          var clone = Base.clone.call(this);
          clone.words = this.words.slice(0);
          return clone;
        },

        /**
         * Creates a word array filled with random bytes.
         *
         * @param {number} nBytes The number of random bytes to generate.
         *
         * @return {WordArray} The random word array.
         *
         * @static
         *
         * @example
         *
         *     var wordArray = CryptoJS.lib.WordArray.random(16);
         */
        random: function random(nBytes) {
          var words = [];

          for (var i = 0; i < nBytes; i += 4) {
            words.push(cryptoSecureRandomInt());
          }

          return new WordArray.init(words, nBytes);
        }
      });
      /**
       * Encoder namespace.
       */

      var C_enc = C.enc = {};
      /**
       * Hex encoding strategy.
       */

      var Hex = C_enc.Hex = {
        /**
         * Converts a word array to a hex string.
         *
         * @param {WordArray} wordArray The word array.
         *
         * @return {string} The hex string.
         *
         * @static
         *
         * @example
         *
         *     var hexString = CryptoJS.enc.Hex.stringify(wordArray);
         */
        stringify: function stringify(wordArray) {
          // Shortcuts
          var words = wordArray.words;
          var sigBytes = wordArray.sigBytes; // Convert

          var hexChars = [];

          for (var i = 0; i < sigBytes; i++) {
            var bite = words[i >>> 2] >>> 24 - i % 4 * 8 & 0xff;
            hexChars.push((bite >>> 4).toString(16));
            hexChars.push((bite & 0x0f).toString(16));
          }

          return hexChars.join('');
        },

        /**
         * Converts a hex string to a word array.
         *
         * @param {string} hexStr The hex string.
         *
         * @return {WordArray} The word array.
         *
         * @static
         *
         * @example
         *
         *     var wordArray = CryptoJS.enc.Hex.parse(hexString);
         */
        parse: function parse(hexStr) {
          // Shortcut
          var hexStrLength = hexStr.length; // Convert

          var words = [];

          for (var i = 0; i < hexStrLength; i += 2) {
            words[i >>> 3] |= parseInt(hexStr.substr(i, 2), 16) << 24 - i % 8 * 4;
          }

          return new WordArray.init(words, hexStrLength / 2);
        }
      };
      /**
       * Latin1 encoding strategy.
       */

      var Latin1 = C_enc.Latin1 = {
        /**
         * Converts a word array to a Latin1 string.
         *
         * @param {WordArray} wordArray The word array.
         *
         * @return {string} The Latin1 string.
         *
         * @static
         *
         * @example
         *
         *     var latin1String = CryptoJS.enc.Latin1.stringify(wordArray);
         */
        stringify: function stringify(wordArray) {
          // Shortcuts
          var words = wordArray.words;
          var sigBytes = wordArray.sigBytes; // Convert

          var latin1Chars = [];

          for (var i = 0; i < sigBytes; i++) {
            var bite = words[i >>> 2] >>> 24 - i % 4 * 8 & 0xff;
            latin1Chars.push(String.fromCharCode(bite));
          }

          return latin1Chars.join('');
        },

        /**
         * Converts a Latin1 string to a word array.
         *
         * @param {string} latin1Str The Latin1 string.
         *
         * @return {WordArray} The word array.
         *
         * @static
         *
         * @example
         *
         *     var wordArray = CryptoJS.enc.Latin1.parse(latin1String);
         */
        parse: function parse(latin1Str) {
          // Shortcut
          var latin1StrLength = latin1Str.length; // Convert

          var words = [];

          for (var i = 0; i < latin1StrLength; i++) {
            words[i >>> 2] |= (latin1Str.charCodeAt(i) & 0xff) << 24 - i % 4 * 8;
          }

          return new WordArray.init(words, latin1StrLength);
        }
      };
      /**
       * UTF-8 encoding strategy.
       */

      var Utf8 = C_enc.Utf8 = {
        /**
         * Converts a word array to a UTF-8 string.
         *
         * @param {WordArray} wordArray The word array.
         *
         * @return {string} The UTF-8 string.
         *
         * @static
         *
         * @example
         *
         *     var utf8String = CryptoJS.enc.Utf8.stringify(wordArray);
         */
        stringify: function stringify(wordArray) {
          try {
            return decodeURIComponent(escape(Latin1.stringify(wordArray)));
          } catch (e) {
            throw new Error('Malformed UTF-8 data');
          }
        },

        /**
         * Converts a UTF-8 string to a word array.
         *
         * @param {string} utf8Str The UTF-8 string.
         *
         * @return {WordArray} The word array.
         *
         * @static
         *
         * @example
         *
         *     var wordArray = CryptoJS.enc.Utf8.parse(utf8String);
         */
        parse: function parse(utf8Str) {
          return Latin1.parse(unescape(encodeURIComponent(utf8Str)));
        }
      };
      /**
       * Abstract buffered block algorithm template.
       *
       * The property blockSize must be implemented in a concrete subtype.
       *
       * @property {number} _minBufferSize The number of blocks that should be kept unprocessed in the buffer. Default: 0
       */

      var BufferedBlockAlgorithm = C_lib.BufferedBlockAlgorithm = Base.extend({
        /**
         * Resets this block algorithm's data buffer to its initial state.
         *
         * @example
         *
         *     bufferedBlockAlgorithm.reset();
         */
        reset: function reset() {
          // Initial values
          this._data = new WordArray.init();
          this._nDataBytes = 0;
        },

        /**
         * Adds new data to this block algorithm's buffer.
         *
         * @param {WordArray|string} data The data to append. Strings are converted to a WordArray using UTF-8.
         *
         * @example
         *
         *     bufferedBlockAlgorithm._append('data');
         *     bufferedBlockAlgorithm._append(wordArray);
         */
        _append: function _append(data) {
          // Convert string to WordArray, else assume WordArray already
          if (typeof data == 'string') {
            data = Utf8.parse(data);
          } // Append


          this._data.concat(data);

          this._nDataBytes += data.sigBytes;
        },

        /**
         * Processes available data blocks.
         *
         * This method invokes _doProcessBlock(offset), which must be implemented by a concrete subtype.
         *
         * @param {boolean} doFlush Whether all blocks and partial blocks should be processed.
         *
         * @return {WordArray} The processed data.
         *
         * @example
         *
         *     var processedData = bufferedBlockAlgorithm._process();
         *     var processedData = bufferedBlockAlgorithm._process(!!'flush');
         */
        _process: function _process(doFlush) {
          var processedWords; // Shortcuts

          var data = this._data;
          var dataWords = data.words;
          var dataSigBytes = data.sigBytes;
          var blockSize = this.blockSize;
          var blockSizeBytes = blockSize * 4; // Count blocks ready

          var nBlocksReady = dataSigBytes / blockSizeBytes;

          if (doFlush) {
            // Round up to include partial blocks
            nBlocksReady = Math.ceil(nBlocksReady);
          } else {
            // Round down to include only full blocks,
            // less the number of blocks that must remain in the buffer
            nBlocksReady = Math.max((nBlocksReady | 0) - this._minBufferSize, 0);
          } // Count words ready


          var nWordsReady = nBlocksReady * blockSize; // Count bytes ready

          var nBytesReady = Math.min(nWordsReady * 4, dataSigBytes); // Process blocks

          if (nWordsReady) {
            for (var offset = 0; offset < nWordsReady; offset += blockSize) {
              // Perform concrete-algorithm logic
              this._doProcessBlock(dataWords, offset);
            } // Remove processed words


            processedWords = dataWords.splice(0, nWordsReady);
            data.sigBytes -= nBytesReady;
          } // Return processed words


          return new WordArray.init(processedWords, nBytesReady);
        },

        /**
         * Creates a copy of this object.
         *
         * @return {Object} The clone.
         *
         * @example
         *
         *     var clone = bufferedBlockAlgorithm.clone();
         */
        clone: function clone() {
          var clone = Base.clone.call(this);
          clone._data = this._data.clone();
          return clone;
        },
        _minBufferSize: 0
      });
      /**
       * Abstract hasher template.
       *
       * @property {number} blockSize The number of 32-bit words this hasher operates on. Default: 16 (512 bits)
       */

      C_lib.Hasher = BufferedBlockAlgorithm.extend({
        /**
         * Configuration options.
         */
        cfg: Base.extend(),

        /**
         * Initializes a newly created hasher.
         *
         * @param {Object} cfg (Optional) The configuration options to use for this hash computation.
         *
         * @example
         *
         *     var hasher = CryptoJS.algo.SHA256.create();
         */
        init: function init(cfg) {
          // Apply config defaults
          this.cfg = this.cfg.extend(cfg); // Set initial values

          this.reset();
        },

        /**
         * Resets this hasher to its initial state.
         *
         * @example
         *
         *     hasher.reset();
         */
        reset: function reset() {
          // Reset data buffer
          BufferedBlockAlgorithm.reset.call(this); // Perform concrete-hasher logic

          this._doReset();
        },

        /**
         * Updates this hasher with a message.
         *
         * @param {WordArray|string} messageUpdate The message to append.
         *
         * @return {Hasher} This hasher.
         *
         * @example
         *
         *     hasher.update('message');
         *     hasher.update(wordArray);
         */
        update: function update(messageUpdate) {
          // Append
          this._append(messageUpdate); // Update the hash


          this._process(); // Chainable


          return this;
        },

        /**
         * Finalizes the hash computation.
         * Note that the finalize operation is effectively a destructive, read-once operation.
         *
         * @param {WordArray|string} messageUpdate (Optional) A final message update.
         *
         * @return {WordArray} The hash.
         *
         * @example
         *
         *     var hash = hasher.finalize();
         *     var hash = hasher.finalize('message');
         *     var hash = hasher.finalize(wordArray);
         */
        finalize: function finalize(messageUpdate) {
          // Final message update
          if (messageUpdate) {
            this._append(messageUpdate);
          } // Perform concrete-hasher logic


          var hash = this._doFinalize();

          return hash;
        },
        blockSize: 512 / 32,

        /**
         * Creates a shortcut function to a hasher's object interface.
         *
         * @param {Hasher} hasher The hasher to create a helper for.
         *
         * @return {Function} The shortcut function.
         *
         * @static
         *
         * @example
         *
         *     var SHA256 = CryptoJS.lib.Hasher._createHelper(CryptoJS.algo.SHA256);
         */
        _createHelper: function _createHelper(hasher) {
          return function (message, cfg) {
            return new hasher.init(cfg).finalize(message);
          };
        },

        /**
         * Creates a shortcut function to the HMAC's object interface.
         *
         * @param {Hasher} hasher The hasher to use in this HMAC helper.
         *
         * @return {Function} The shortcut function.
         *
         * @static
         *
         * @example
         *
         *     var HmacSHA256 = CryptoJS.lib.Hasher._createHmacHelper(CryptoJS.algo.SHA256);
         */
        _createHmacHelper: function _createHmacHelper(hasher) {
          return function (message, key) {
            return new C_algo.HMAC.init(hasher, key).finalize(message);
          };
        }
      });
      /**
       * Algorithm namespace.
       */

      var C_algo = C.algo = {};
      return C;
    }(Math);

    return CryptoJS;
  });
})(core);

var md5 = {
  exports: {}
};

(function (module, exports) {
  (function (root, factory) {
    {
      // CommonJS
      module.exports = factory(core.exports);
    }
  })(commonjsGlobal, function (CryptoJS) {
    (function (Math) {
      // Shortcuts
      var C = CryptoJS;
      var C_lib = C.lib;
      var WordArray = C_lib.WordArray;
      var Hasher = C_lib.Hasher;
      var C_algo = C.algo; // Constants table

      var T = []; // Compute constants

      (function () {
        for (var i = 0; i < 64; i++) {
          T[i] = Math.abs(Math.sin(i + 1)) * 0x100000000 | 0;
        }
      })();
      /**
       * MD5 hash algorithm.
       */


      var MD5 = C_algo.MD5 = Hasher.extend({
        _doReset: function _doReset() {
          this._hash = new WordArray.init([0x67452301, 0xefcdab89, 0x98badcfe, 0x10325476]);
        },
        _doProcessBlock: function _doProcessBlock(M, offset) {
          // Swap endian
          for (var i = 0; i < 16; i++) {
            // Shortcuts
            var offset_i = offset + i;
            var M_offset_i = M[offset_i];
            M[offset_i] = (M_offset_i << 8 | M_offset_i >>> 24) & 0x00ff00ff | (M_offset_i << 24 | M_offset_i >>> 8) & 0xff00ff00;
          } // Shortcuts


          var H = this._hash.words;
          var M_offset_0 = M[offset + 0];
          var M_offset_1 = M[offset + 1];
          var M_offset_2 = M[offset + 2];
          var M_offset_3 = M[offset + 3];
          var M_offset_4 = M[offset + 4];
          var M_offset_5 = M[offset + 5];
          var M_offset_6 = M[offset + 6];
          var M_offset_7 = M[offset + 7];
          var M_offset_8 = M[offset + 8];
          var M_offset_9 = M[offset + 9];
          var M_offset_10 = M[offset + 10];
          var M_offset_11 = M[offset + 11];
          var M_offset_12 = M[offset + 12];
          var M_offset_13 = M[offset + 13];
          var M_offset_14 = M[offset + 14];
          var M_offset_15 = M[offset + 15]; // Working varialbes

          var a = H[0];
          var b = H[1];
          var c = H[2];
          var d = H[3]; // Computation

          a = FF(a, b, c, d, M_offset_0, 7, T[0]);
          d = FF(d, a, b, c, M_offset_1, 12, T[1]);
          c = FF(c, d, a, b, M_offset_2, 17, T[2]);
          b = FF(b, c, d, a, M_offset_3, 22, T[3]);
          a = FF(a, b, c, d, M_offset_4, 7, T[4]);
          d = FF(d, a, b, c, M_offset_5, 12, T[5]);
          c = FF(c, d, a, b, M_offset_6, 17, T[6]);
          b = FF(b, c, d, a, M_offset_7, 22, T[7]);
          a = FF(a, b, c, d, M_offset_8, 7, T[8]);
          d = FF(d, a, b, c, M_offset_9, 12, T[9]);
          c = FF(c, d, a, b, M_offset_10, 17, T[10]);
          b = FF(b, c, d, a, M_offset_11, 22, T[11]);
          a = FF(a, b, c, d, M_offset_12, 7, T[12]);
          d = FF(d, a, b, c, M_offset_13, 12, T[13]);
          c = FF(c, d, a, b, M_offset_14, 17, T[14]);
          b = FF(b, c, d, a, M_offset_15, 22, T[15]);
          a = GG(a, b, c, d, M_offset_1, 5, T[16]);
          d = GG(d, a, b, c, M_offset_6, 9, T[17]);
          c = GG(c, d, a, b, M_offset_11, 14, T[18]);
          b = GG(b, c, d, a, M_offset_0, 20, T[19]);
          a = GG(a, b, c, d, M_offset_5, 5, T[20]);
          d = GG(d, a, b, c, M_offset_10, 9, T[21]);
          c = GG(c, d, a, b, M_offset_15, 14, T[22]);
          b = GG(b, c, d, a, M_offset_4, 20, T[23]);
          a = GG(a, b, c, d, M_offset_9, 5, T[24]);
          d = GG(d, a, b, c, M_offset_14, 9, T[25]);
          c = GG(c, d, a, b, M_offset_3, 14, T[26]);
          b = GG(b, c, d, a, M_offset_8, 20, T[27]);
          a = GG(a, b, c, d, M_offset_13, 5, T[28]);
          d = GG(d, a, b, c, M_offset_2, 9, T[29]);
          c = GG(c, d, a, b, M_offset_7, 14, T[30]);
          b = GG(b, c, d, a, M_offset_12, 20, T[31]);
          a = HH(a, b, c, d, M_offset_5, 4, T[32]);
          d = HH(d, a, b, c, M_offset_8, 11, T[33]);
          c = HH(c, d, a, b, M_offset_11, 16, T[34]);
          b = HH(b, c, d, a, M_offset_14, 23, T[35]);
          a = HH(a, b, c, d, M_offset_1, 4, T[36]);
          d = HH(d, a, b, c, M_offset_4, 11, T[37]);
          c = HH(c, d, a, b, M_offset_7, 16, T[38]);
          b = HH(b, c, d, a, M_offset_10, 23, T[39]);
          a = HH(a, b, c, d, M_offset_13, 4, T[40]);
          d = HH(d, a, b, c, M_offset_0, 11, T[41]);
          c = HH(c, d, a, b, M_offset_3, 16, T[42]);
          b = HH(b, c, d, a, M_offset_6, 23, T[43]);
          a = HH(a, b, c, d, M_offset_9, 4, T[44]);
          d = HH(d, a, b, c, M_offset_12, 11, T[45]);
          c = HH(c, d, a, b, M_offset_15, 16, T[46]);
          b = HH(b, c, d, a, M_offset_2, 23, T[47]);
          a = II(a, b, c, d, M_offset_0, 6, T[48]);
          d = II(d, a, b, c, M_offset_7, 10, T[49]);
          c = II(c, d, a, b, M_offset_14, 15, T[50]);
          b = II(b, c, d, a, M_offset_5, 21, T[51]);
          a = II(a, b, c, d, M_offset_12, 6, T[52]);
          d = II(d, a, b, c, M_offset_3, 10, T[53]);
          c = II(c, d, a, b, M_offset_10, 15, T[54]);
          b = II(b, c, d, a, M_offset_1, 21, T[55]);
          a = II(a, b, c, d, M_offset_8, 6, T[56]);
          d = II(d, a, b, c, M_offset_15, 10, T[57]);
          c = II(c, d, a, b, M_offset_6, 15, T[58]);
          b = II(b, c, d, a, M_offset_13, 21, T[59]);
          a = II(a, b, c, d, M_offset_4, 6, T[60]);
          d = II(d, a, b, c, M_offset_11, 10, T[61]);
          c = II(c, d, a, b, M_offset_2, 15, T[62]);
          b = II(b, c, d, a, M_offset_9, 21, T[63]); // Intermediate hash value

          H[0] = H[0] + a | 0;
          H[1] = H[1] + b | 0;
          H[2] = H[2] + c | 0;
          H[3] = H[3] + d | 0;
        },
        _doFinalize: function _doFinalize() {
          // Shortcuts
          var data = this._data;
          var dataWords = data.words;
          var nBitsTotal = this._nDataBytes * 8;
          var nBitsLeft = data.sigBytes * 8; // Add padding

          dataWords[nBitsLeft >>> 5] |= 0x80 << 24 - nBitsLeft % 32;
          var nBitsTotalH = Math.floor(nBitsTotal / 0x100000000);
          var nBitsTotalL = nBitsTotal;
          dataWords[(nBitsLeft + 64 >>> 9 << 4) + 15] = (nBitsTotalH << 8 | nBitsTotalH >>> 24) & 0x00ff00ff | (nBitsTotalH << 24 | nBitsTotalH >>> 8) & 0xff00ff00;
          dataWords[(nBitsLeft + 64 >>> 9 << 4) + 14] = (nBitsTotalL << 8 | nBitsTotalL >>> 24) & 0x00ff00ff | (nBitsTotalL << 24 | nBitsTotalL >>> 8) & 0xff00ff00;
          data.sigBytes = (dataWords.length + 1) * 4; // Hash final blocks

          this._process(); // Shortcuts


          var hash = this._hash;
          var H = hash.words; // Swap endian

          for (var i = 0; i < 4; i++) {
            // Shortcut
            var H_i = H[i];
            H[i] = (H_i << 8 | H_i >>> 24) & 0x00ff00ff | (H_i << 24 | H_i >>> 8) & 0xff00ff00;
          } // Return final computed hash


          return hash;
        },
        clone: function clone() {
          var clone = Hasher.clone.call(this);
          clone._hash = this._hash.clone();
          return clone;
        }
      });

      function FF(a, b, c, d, x, s, t) {
        var n = a + (b & c | ~b & d) + x + t;
        return (n << s | n >>> 32 - s) + b;
      }

      function GG(a, b, c, d, x, s, t) {
        var n = a + (b & d | c & ~d) + x + t;
        return (n << s | n >>> 32 - s) + b;
      }

      function HH(a, b, c, d, x, s, t) {
        var n = a + (b ^ c ^ d) + x + t;
        return (n << s | n >>> 32 - s) + b;
      }

      function II(a, b, c, d, x, s, t) {
        var n = a + (c ^ (b | ~d)) + x + t;
        return (n << s | n >>> 32 - s) + b;
      }
      /**
       * Shortcut function to the hasher's object interface.
       *
       * @param {WordArray|string} message The message to hash.
       *
       * @return {WordArray} The hash.
       *
       * @static
       *
       * @example
       *
       *     var hash = CryptoJS.MD5('message');
       *     var hash = CryptoJS.MD5(wordArray);
       */


      C.MD5 = Hasher._createHelper(MD5);
      /**
       * Shortcut function to the HMAC's object interface.
       *
       * @param {WordArray|string} message The message to hash.
       * @param {WordArray|string} key The secret key.
       *
       * @return {WordArray} The HMAC.
       *
       * @static
       *
       * @example
       *
       *     var hmac = CryptoJS.HmacMD5(message, key);
       */

      C.HmacMD5 = Hasher._createHmacHelper(MD5);
    })(Math);

    return CryptoJS.MD5;
  });
})(md5);

var pbkdf2 = {
  exports: {}
};
var sha1 = {
  exports: {}
};

(function (module, exports) {
  (function (root, factory) {
    {
      // CommonJS
      module.exports = factory(core.exports);
    }
  })(commonjsGlobal, function (CryptoJS) {
    (function () {
      // Shortcuts
      var C = CryptoJS;
      var C_lib = C.lib;
      var WordArray = C_lib.WordArray;
      var Hasher = C_lib.Hasher;
      var C_algo = C.algo; // Reusable object

      var W = [];
      /**
       * SHA-1 hash algorithm.
       */

      var SHA1 = C_algo.SHA1 = Hasher.extend({
        _doReset: function _doReset() {
          this._hash = new WordArray.init([0x67452301, 0xefcdab89, 0x98badcfe, 0x10325476, 0xc3d2e1f0]);
        },
        _doProcessBlock: function _doProcessBlock(M, offset) {
          // Shortcut
          var H = this._hash.words; // Working variables

          var a = H[0];
          var b = H[1];
          var c = H[2];
          var d = H[3];
          var e = H[4]; // Computation

          for (var i = 0; i < 80; i++) {
            if (i < 16) {
              W[i] = M[offset + i] | 0;
            } else {
              var n = W[i - 3] ^ W[i - 8] ^ W[i - 14] ^ W[i - 16];
              W[i] = n << 1 | n >>> 31;
            }

            var t = (a << 5 | a >>> 27) + e + W[i];

            if (i < 20) {
              t += (b & c | ~b & d) + 0x5a827999;
            } else if (i < 40) {
              t += (b ^ c ^ d) + 0x6ed9eba1;
            } else if (i < 60) {
              t += (b & c | b & d | c & d) - 0x70e44324;
            } else
              /* if (i < 80) */
              {
                t += (b ^ c ^ d) - 0x359d3e2a;
              }

            e = d;
            d = c;
            c = b << 30 | b >>> 2;
            b = a;
            a = t;
          } // Intermediate hash value


          H[0] = H[0] + a | 0;
          H[1] = H[1] + b | 0;
          H[2] = H[2] + c | 0;
          H[3] = H[3] + d | 0;
          H[4] = H[4] + e | 0;
        },
        _doFinalize: function _doFinalize() {
          // Shortcuts
          var data = this._data;
          var dataWords = data.words;
          var nBitsTotal = this._nDataBytes * 8;
          var nBitsLeft = data.sigBytes * 8; // Add padding

          dataWords[nBitsLeft >>> 5] |= 0x80 << 24 - nBitsLeft % 32;
          dataWords[(nBitsLeft + 64 >>> 9 << 4) + 14] = Math.floor(nBitsTotal / 0x100000000);
          dataWords[(nBitsLeft + 64 >>> 9 << 4) + 15] = nBitsTotal;
          data.sigBytes = dataWords.length * 4; // Hash final blocks

          this._process(); // Return final computed hash


          return this._hash;
        },
        clone: function clone() {
          var clone = Hasher.clone.call(this);
          clone._hash = this._hash.clone();
          return clone;
        }
      });
      /**
       * Shortcut function to the hasher's object interface.
       *
       * @param {WordArray|string} message The message to hash.
       *
       * @return {WordArray} The hash.
       *
       * @static
       *
       * @example
       *
       *     var hash = CryptoJS.SHA1('message');
       *     var hash = CryptoJS.SHA1(wordArray);
       */

      C.SHA1 = Hasher._createHelper(SHA1);
      /**
       * Shortcut function to the HMAC's object interface.
       *
       * @param {WordArray|string} message The message to hash.
       * @param {WordArray|string} key The secret key.
       *
       * @return {WordArray} The HMAC.
       *
       * @static
       *
       * @example
       *
       *     var hmac = CryptoJS.HmacSHA1(message, key);
       */

      C.HmacSHA1 = Hasher._createHmacHelper(SHA1);
    })();

    return CryptoJS.SHA1;
  });
})(sha1);

var hmac = {
  exports: {}
};

(function (module, exports) {
  (function (root, factory) {
    {
      // CommonJS
      module.exports = factory(core.exports);
    }
  })(commonjsGlobal, function (CryptoJS) {
    (function () {
      // Shortcuts
      var C = CryptoJS;
      var C_lib = C.lib;
      var Base = C_lib.Base;
      var C_enc = C.enc;
      var Utf8 = C_enc.Utf8;
      var C_algo = C.algo;
      /**
       * HMAC algorithm.
       */

      C_algo.HMAC = Base.extend({
        /**
         * Initializes a newly created HMAC.
         *
         * @param {Hasher} hasher The hash algorithm to use.
         * @param {WordArray|string} key The secret key.
         *
         * @example
         *
         *     var hmacHasher = CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA256, key);
         */
        init: function init(hasher, key) {
          // Init hasher
          hasher = this._hasher = new hasher.init(); // Convert string to WordArray, else assume WordArray already

          if (typeof key == 'string') {
            key = Utf8.parse(key);
          } // Shortcuts


          var hasherBlockSize = hasher.blockSize;
          var hasherBlockSizeBytes = hasherBlockSize * 4; // Allow arbitrary length keys

          if (key.sigBytes > hasherBlockSizeBytes) {
            key = hasher.finalize(key);
          } // Clamp excess bits


          key.clamp(); // Clone key for inner and outer pads

          var oKey = this._oKey = key.clone();
          var iKey = this._iKey = key.clone(); // Shortcuts

          var oKeyWords = oKey.words;
          var iKeyWords = iKey.words; // XOR keys with pad constants

          for (var i = 0; i < hasherBlockSize; i++) {
            oKeyWords[i] ^= 0x5c5c5c5c;
            iKeyWords[i] ^= 0x36363636;
          }

          oKey.sigBytes = iKey.sigBytes = hasherBlockSizeBytes; // Set initial values

          this.reset();
        },

        /**
         * Resets this HMAC to its initial state.
         *
         * @example
         *
         *     hmacHasher.reset();
         */
        reset: function reset() {
          // Shortcut
          var hasher = this._hasher; // Reset

          hasher.reset();
          hasher.update(this._iKey);
        },

        /**
         * Updates this HMAC with a message.
         *
         * @param {WordArray|string} messageUpdate The message to append.
         *
         * @return {HMAC} This HMAC instance.
         *
         * @example
         *
         *     hmacHasher.update('message');
         *     hmacHasher.update(wordArray);
         */
        update: function update(messageUpdate) {
          this._hasher.update(messageUpdate); // Chainable


          return this;
        },

        /**
         * Finalizes the HMAC computation.
         * Note that the finalize operation is effectively a destructive, read-once operation.
         *
         * @param {WordArray|string} messageUpdate (Optional) A final message update.
         *
         * @return {WordArray} The HMAC.
         *
         * @example
         *
         *     var hmac = hmacHasher.finalize();
         *     var hmac = hmacHasher.finalize('message');
         *     var hmac = hmacHasher.finalize(wordArray);
         */
        finalize: function finalize(messageUpdate) {
          // Shortcut
          var hasher = this._hasher; // Compute HMAC

          var innerHash = hasher.finalize(messageUpdate);
          hasher.reset();
          var hmac = hasher.finalize(this._oKey.clone().concat(innerHash));
          return hmac;
        }
      });
    })();
  });
})(hmac);

(function (module, exports) {
  (function (root, factory, undef) {
    {
      // CommonJS
      module.exports = factory(core.exports, sha1.exports, hmac.exports);
    }
  })(commonjsGlobal, function (CryptoJS) {
    (function () {
      // Shortcuts
      var C = CryptoJS;
      var C_lib = C.lib;
      var Base = C_lib.Base;
      var WordArray = C_lib.WordArray;
      var C_algo = C.algo;
      var SHA1 = C_algo.SHA1;
      var HMAC = C_algo.HMAC;
      /**
       * Password-Based Key Derivation Function 2 algorithm.
       */

      var PBKDF2 = C_algo.PBKDF2 = Base.extend({
        /**
         * Configuration options.
         *
         * @property {number} keySize The key size in words to generate. Default: 4 (128 bits)
         * @property {Hasher} hasher The hasher to use. Default: SHA1
         * @property {number} iterations The number of iterations to perform. Default: 1
         */
        cfg: Base.extend({
          keySize: 128 / 32,
          hasher: SHA1,
          iterations: 1
        }),

        /**
         * Initializes a newly created key derivation function.
         *
         * @param {Object} cfg (Optional) The configuration options to use for the derivation.
         *
         * @example
         *
         *     var kdf = CryptoJS.algo.PBKDF2.create();
         *     var kdf = CryptoJS.algo.PBKDF2.create({ keySize: 8 });
         *     var kdf = CryptoJS.algo.PBKDF2.create({ keySize: 8, iterations: 1000 });
         */
        init: function init(cfg) {
          this.cfg = this.cfg.extend(cfg);
        },

        /**
         * Computes the Password-Based Key Derivation Function 2.
         *
         * @param {WordArray|string} password The password.
         * @param {WordArray|string} salt A salt.
         *
         * @return {WordArray} The derived key.
         *
         * @example
         *
         *     var key = kdf.compute(password, salt);
         */
        compute: function compute(password, salt) {
          // Shortcut
          var cfg = this.cfg; // Init HMAC

          var hmac = HMAC.create(cfg.hasher, password); // Initial values

          var derivedKey = WordArray.create();
          var blockIndex = WordArray.create([0x00000001]); // Shortcuts

          var derivedKeyWords = derivedKey.words;
          var blockIndexWords = blockIndex.words;
          var keySize = cfg.keySize;
          var iterations = cfg.iterations; // Generate key

          while (derivedKeyWords.length < keySize) {
            var block = hmac.update(salt).finalize(blockIndex);
            hmac.reset(); // Shortcuts

            var blockWords = block.words;
            var blockWordsLength = blockWords.length; // Iterations

            var intermediate = block;

            for (var i = 1; i < iterations; i++) {
              intermediate = hmac.finalize(intermediate);
              hmac.reset(); // Shortcut

              var intermediateWords = intermediate.words; // XOR intermediate with block

              for (var j = 0; j < blockWordsLength; j++) {
                blockWords[j] ^= intermediateWords[j];
              }
            }

            derivedKey.concat(block);
            blockIndexWords[0]++;
          }

          derivedKey.sigBytes = keySize * 4;
          return derivedKey;
        }
      });
      /**
       * Computes the Password-Based Key Derivation Function 2.
       *
       * @param {WordArray|string} password The password.
       * @param {WordArray|string} salt A salt.
       * @param {Object} cfg (Optional) The configuration options to use for this computation.
       *
       * @return {WordArray} The derived key.
       *
       * @static
       *
       * @example
       *
       *     var key = CryptoJS.PBKDF2(password, salt);
       *     var key = CryptoJS.PBKDF2(password, salt, { keySize: 8 });
       *     var key = CryptoJS.PBKDF2(password, salt, { keySize: 8, iterations: 1000 });
       */

      C.PBKDF2 = function (password, salt, cfg) {
        return PBKDF2.create(cfg).compute(password, salt);
      };
    })();

    return CryptoJS.PBKDF2;
  });
})(pbkdf2);

var aes = {
  exports: {}
};
var encBase64 = {
  exports: {}
};

(function (module, exports) {
  (function (root, factory) {
    {
      // CommonJS
      module.exports = factory(core.exports);
    }
  })(commonjsGlobal, function (CryptoJS) {
    (function () {
      // Shortcuts
      var C = CryptoJS;
      var C_lib = C.lib;
      var WordArray = C_lib.WordArray;
      var C_enc = C.enc;
      /**
       * Base64 encoding strategy.
       */

      C_enc.Base64 = {
        /**
         * Converts a word array to a Base64 string.
         *
         * @param {WordArray} wordArray The word array.
         *
         * @return {string} The Base64 string.
         *
         * @static
         *
         * @example
         *
         *     var base64String = CryptoJS.enc.Base64.stringify(wordArray);
         */
        stringify: function stringify(wordArray) {
          // Shortcuts
          var words = wordArray.words;
          var sigBytes = wordArray.sigBytes;
          var map = this._map; // Clamp excess bits

          wordArray.clamp(); // Convert

          var base64Chars = [];

          for (var i = 0; i < sigBytes; i += 3) {
            var byte1 = words[i >>> 2] >>> 24 - i % 4 * 8 & 0xff;
            var byte2 = words[i + 1 >>> 2] >>> 24 - (i + 1) % 4 * 8 & 0xff;
            var byte3 = words[i + 2 >>> 2] >>> 24 - (i + 2) % 4 * 8 & 0xff;
            var triplet = byte1 << 16 | byte2 << 8 | byte3;

            for (var j = 0; j < 4 && i + j * 0.75 < sigBytes; j++) {
              base64Chars.push(map.charAt(triplet >>> 6 * (3 - j) & 0x3f));
            }
          } // Add padding


          var paddingChar = map.charAt(64);

          if (paddingChar) {
            while (base64Chars.length % 4) {
              base64Chars.push(paddingChar);
            }
          }

          return base64Chars.join('');
        },

        /**
         * Converts a Base64 string to a word array.
         *
         * @param {string} base64Str The Base64 string.
         *
         * @return {WordArray} The word array.
         *
         * @static
         *
         * @example
         *
         *     var wordArray = CryptoJS.enc.Base64.parse(base64String);
         */
        parse: function parse(base64Str) {
          // Shortcuts
          var base64StrLength = base64Str.length;
          var map = this._map;
          var reverseMap = this._reverseMap;

          if (!reverseMap) {
            reverseMap = this._reverseMap = [];

            for (var j = 0; j < map.length; j++) {
              reverseMap[map.charCodeAt(j)] = j;
            }
          } // Ignore padding


          var paddingChar = map.charAt(64);

          if (paddingChar) {
            var paddingIndex = base64Str.indexOf(paddingChar);

            if (paddingIndex !== -1) {
              base64StrLength = paddingIndex;
            }
          } // Convert


          return parseLoop(base64Str, base64StrLength, reverseMap);
        },
        _map: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='
      };

      function parseLoop(base64Str, base64StrLength, reverseMap) {
        var words = [];
        var nBytes = 0;

        for (var i = 0; i < base64StrLength; i++) {
          if (i % 4) {
            var bits1 = reverseMap[base64Str.charCodeAt(i - 1)] << i % 4 * 2;
            var bits2 = reverseMap[base64Str.charCodeAt(i)] >>> 6 - i % 4 * 2;
            var bitsCombined = bits1 | bits2;
            words[nBytes >>> 2] |= bitsCombined << 24 - nBytes % 4 * 8;
            nBytes++;
          }
        }

        return WordArray.create(words, nBytes);
      }
    })();

    return CryptoJS.enc.Base64;
  });
})(encBase64);

var evpkdf = {
  exports: {}
};

(function (module, exports) {
  (function (root, factory, undef) {
    {
      // CommonJS
      module.exports = factory(core.exports, sha1.exports, hmac.exports);
    }
  })(commonjsGlobal, function (CryptoJS) {
    (function () {
      // Shortcuts
      var C = CryptoJS;
      var C_lib = C.lib;
      var Base = C_lib.Base;
      var WordArray = C_lib.WordArray;
      var C_algo = C.algo;
      var MD5 = C_algo.MD5;
      /**
       * This key derivation function is meant to conform with EVP_BytesToKey.
       * www.openssl.org/docs/crypto/EVP_BytesToKey.html
       */

      var EvpKDF = C_algo.EvpKDF = Base.extend({
        /**
         * Configuration options.
         *
         * @property {number} keySize The key size in words to generate. Default: 4 (128 bits)
         * @property {Hasher} hasher The hash algorithm to use. Default: MD5
         * @property {number} iterations The number of iterations to perform. Default: 1
         */
        cfg: Base.extend({
          keySize: 128 / 32,
          hasher: MD5,
          iterations: 1
        }),

        /**
         * Initializes a newly created key derivation function.
         *
         * @param {Object} cfg (Optional) The configuration options to use for the derivation.
         *
         * @example
         *
         *     var kdf = CryptoJS.algo.EvpKDF.create();
         *     var kdf = CryptoJS.algo.EvpKDF.create({ keySize: 8 });
         *     var kdf = CryptoJS.algo.EvpKDF.create({ keySize: 8, iterations: 1000 });
         */
        init: function init(cfg) {
          this.cfg = this.cfg.extend(cfg);
        },

        /**
         * Derives a key from a password.
         *
         * @param {WordArray|string} password The password.
         * @param {WordArray|string} salt A salt.
         *
         * @return {WordArray} The derived key.
         *
         * @example
         *
         *     var key = kdf.compute(password, salt);
         */
        compute: function compute(password, salt) {
          var block; // Shortcut

          var cfg = this.cfg; // Init hasher

          var hasher = cfg.hasher.create(); // Initial values

          var derivedKey = WordArray.create(); // Shortcuts

          var derivedKeyWords = derivedKey.words;
          var keySize = cfg.keySize;
          var iterations = cfg.iterations; // Generate key

          while (derivedKeyWords.length < keySize) {
            if (block) {
              hasher.update(block);
            }

            block = hasher.update(password).finalize(salt);
            hasher.reset(); // Iterations

            for (var i = 1; i < iterations; i++) {
              block = hasher.finalize(block);
              hasher.reset();
            }

            derivedKey.concat(block);
          }

          derivedKey.sigBytes = keySize * 4;
          return derivedKey;
        }
      });
      /**
       * Derives a key from a password.
       *
       * @param {WordArray|string} password The password.
       * @param {WordArray|string} salt A salt.
       * @param {Object} cfg (Optional) The configuration options to use for this computation.
       *
       * @return {WordArray} The derived key.
       *
       * @static
       *
       * @example
       *
       *     var key = CryptoJS.EvpKDF(password, salt);
       *     var key = CryptoJS.EvpKDF(password, salt, { keySize: 8 });
       *     var key = CryptoJS.EvpKDF(password, salt, { keySize: 8, iterations: 1000 });
       */

      C.EvpKDF = function (password, salt, cfg) {
        return EvpKDF.create(cfg).compute(password, salt);
      };
    })();

    return CryptoJS.EvpKDF;
  });
})(evpkdf);

var cipherCore = {
  exports: {}
};

(function (module, exports) {
  (function (root, factory, undef) {
    {
      // CommonJS
      module.exports = factory(core.exports, evpkdf.exports);
    }
  })(commonjsGlobal, function (CryptoJS) {
    /**
     * Cipher core components.
     */
    CryptoJS.lib.Cipher || function (undefined$1) {
      // Shortcuts
      var C = CryptoJS;
      var C_lib = C.lib;
      var Base = C_lib.Base;
      var WordArray = C_lib.WordArray;
      var BufferedBlockAlgorithm = C_lib.BufferedBlockAlgorithm;
      var C_enc = C.enc;
      C_enc.Utf8;
      var Base64 = C_enc.Base64;
      var C_algo = C.algo;
      var EvpKDF = C_algo.EvpKDF;
      /**
       * Abstract base cipher template.
       *
       * @property {number} keySize This cipher's key size. Default: 4 (128 bits)
       * @property {number} ivSize This cipher's IV size. Default: 4 (128 bits)
       * @property {number} _ENC_XFORM_MODE A constant representing encryption mode.
       * @property {number} _DEC_XFORM_MODE A constant representing decryption mode.
       */

      var Cipher = C_lib.Cipher = BufferedBlockAlgorithm.extend({
        /**
         * Configuration options.
         *
         * @property {WordArray} iv The IV to use for this operation.
         */
        cfg: Base.extend(),

        /**
         * Creates this cipher in encryption mode.
         *
         * @param {WordArray} key The key.
         * @param {Object} cfg (Optional) The configuration options to use for this operation.
         *
         * @return {Cipher} A cipher instance.
         *
         * @static
         *
         * @example
         *
         *     var cipher = CryptoJS.algo.AES.createEncryptor(keyWordArray, { iv: ivWordArray });
         */
        createEncryptor: function createEncryptor(key, cfg) {
          return this.create(this._ENC_XFORM_MODE, key, cfg);
        },

        /**
         * Creates this cipher in decryption mode.
         *
         * @param {WordArray} key The key.
         * @param {Object} cfg (Optional) The configuration options to use for this operation.
         *
         * @return {Cipher} A cipher instance.
         *
         * @static
         *
         * @example
         *
         *     var cipher = CryptoJS.algo.AES.createDecryptor(keyWordArray, { iv: ivWordArray });
         */
        createDecryptor: function createDecryptor(key, cfg) {
          return this.create(this._DEC_XFORM_MODE, key, cfg);
        },

        /**
         * Initializes a newly created cipher.
         *
         * @param {number} xformMode Either the encryption or decryption transormation mode constant.
         * @param {WordArray} key The key.
         * @param {Object} cfg (Optional) The configuration options to use for this operation.
         *
         * @example
         *
         *     var cipher = CryptoJS.algo.AES.create(CryptoJS.algo.AES._ENC_XFORM_MODE, keyWordArray, { iv: ivWordArray });
         */
        init: function init(xformMode, key, cfg) {
          // Apply config defaults
          this.cfg = this.cfg.extend(cfg); // Store transform mode and key

          this._xformMode = xformMode;
          this._key = key; // Set initial values

          this.reset();
        },

        /**
         * Resets this cipher to its initial state.
         *
         * @example
         *
         *     cipher.reset();
         */
        reset: function reset() {
          // Reset data buffer
          BufferedBlockAlgorithm.reset.call(this); // Perform concrete-cipher logic

          this._doReset();
        },

        /**
         * Adds data to be encrypted or decrypted.
         *
         * @param {WordArray|string} dataUpdate The data to encrypt or decrypt.
         *
         * @return {WordArray} The data after processing.
         *
         * @example
         *
         *     var encrypted = cipher.process('data');
         *     var encrypted = cipher.process(wordArray);
         */
        process: function process(dataUpdate) {
          // Append
          this._append(dataUpdate); // Process available blocks


          return this._process();
        },

        /**
         * Finalizes the encryption or decryption process.
         * Note that the finalize operation is effectively a destructive, read-once operation.
         *
         * @param {WordArray|string} dataUpdate The final data to encrypt or decrypt.
         *
         * @return {WordArray} The data after final processing.
         *
         * @example
         *
         *     var encrypted = cipher.finalize();
         *     var encrypted = cipher.finalize('data');
         *     var encrypted = cipher.finalize(wordArray);
         */
        finalize: function finalize(dataUpdate) {
          // Final data update
          if (dataUpdate) {
            this._append(dataUpdate);
          } // Perform concrete-cipher logic


          var finalProcessedData = this._doFinalize();

          return finalProcessedData;
        },
        keySize: 128 / 32,
        ivSize: 128 / 32,
        _ENC_XFORM_MODE: 1,
        _DEC_XFORM_MODE: 2,

        /**
         * Creates shortcut functions to a cipher's object interface.
         *
         * @param {Cipher} cipher The cipher to create a helper for.
         *
         * @return {Object} An object with encrypt and decrypt shortcut functions.
         *
         * @static
         *
         * @example
         *
         *     var AES = CryptoJS.lib.Cipher._createHelper(CryptoJS.algo.AES);
         */
        _createHelper: function () {
          function selectCipherStrategy(key) {
            if (typeof key == 'string') {
              return PasswordBasedCipher;
            } else {
              return SerializableCipher;
            }
          }

          return function (cipher) {
            return {
              encrypt: function encrypt(message, key, cfg) {
                return selectCipherStrategy(key).encrypt(cipher, message, key, cfg);
              },
              decrypt: function decrypt(ciphertext, key, cfg) {
                return selectCipherStrategy(key).decrypt(cipher, ciphertext, key, cfg);
              }
            };
          };
        }()
      });
      /**
       * Abstract base stream cipher template.
       *
       * @property {number} blockSize The number of 32-bit words this cipher operates on. Default: 1 (32 bits)
       */

      C_lib.StreamCipher = Cipher.extend({
        _doFinalize: function _doFinalize() {
          // Process partial blocks
          var finalProcessedBlocks = this._process(!!'flush');

          return finalProcessedBlocks;
        },
        blockSize: 1
      });
      /**
       * Mode namespace.
       */

      var C_mode = C.mode = {};
      /**
       * Abstract base block cipher mode template.
       */

      var BlockCipherMode = C_lib.BlockCipherMode = Base.extend({
        /**
         * Creates this mode for encryption.
         *
         * @param {Cipher} cipher A block cipher instance.
         * @param {Array} iv The IV words.
         *
         * @static
         *
         * @example
         *
         *     var mode = CryptoJS.mode.CBC.createEncryptor(cipher, iv.words);
         */
        createEncryptor: function createEncryptor(cipher, iv) {
          return this.Encryptor.create(cipher, iv);
        },

        /**
         * Creates this mode for decryption.
         *
         * @param {Cipher} cipher A block cipher instance.
         * @param {Array} iv The IV words.
         *
         * @static
         *
         * @example
         *
         *     var mode = CryptoJS.mode.CBC.createDecryptor(cipher, iv.words);
         */
        createDecryptor: function createDecryptor(cipher, iv) {
          return this.Decryptor.create(cipher, iv);
        },

        /**
         * Initializes a newly created mode.
         *
         * @param {Cipher} cipher A block cipher instance.
         * @param {Array} iv The IV words.
         *
         * @example
         *
         *     var mode = CryptoJS.mode.CBC.Encryptor.create(cipher, iv.words);
         */
        init: function init(cipher, iv) {
          this._cipher = cipher;
          this._iv = iv;
        }
      });
      /**
       * Cipher Block Chaining mode.
       */

      var CBC = C_mode.CBC = function () {
        /**
         * Abstract base CBC mode.
         */
        var CBC = BlockCipherMode.extend();
        /**
         * CBC encryptor.
         */

        CBC.Encryptor = CBC.extend({
          /**
           * Processes the data block at offset.
           *
           * @param {Array} words The data words to operate on.
           * @param {number} offset The offset where the block starts.
           *
           * @example
           *
           *     mode.processBlock(data.words, offset);
           */
          processBlock: function processBlock(words, offset) {
            // Shortcuts
            var cipher = this._cipher;
            var blockSize = cipher.blockSize; // XOR and encrypt

            xorBlock.call(this, words, offset, blockSize);
            cipher.encryptBlock(words, offset); // Remember this block to use with next block

            this._prevBlock = words.slice(offset, offset + blockSize);
          }
        });
        /**
         * CBC decryptor.
         */

        CBC.Decryptor = CBC.extend({
          /**
           * Processes the data block at offset.
           *
           * @param {Array} words The data words to operate on.
           * @param {number} offset The offset where the block starts.
           *
           * @example
           *
           *     mode.processBlock(data.words, offset);
           */
          processBlock: function processBlock(words, offset) {
            // Shortcuts
            var cipher = this._cipher;
            var blockSize = cipher.blockSize; // Remember this block to use with next block

            var thisBlock = words.slice(offset, offset + blockSize); // Decrypt and XOR

            cipher.decryptBlock(words, offset);
            xorBlock.call(this, words, offset, blockSize); // This block becomes the previous block

            this._prevBlock = thisBlock;
          }
        });

        function xorBlock(words, offset, blockSize) {
          var block; // Shortcut

          var iv = this._iv; // Choose mixing block

          if (iv) {
            block = iv; // Remove IV for subsequent blocks

            this._iv = undefined$1;
          } else {
            block = this._prevBlock;
          } // XOR blocks


          for (var i = 0; i < blockSize; i++) {
            words[offset + i] ^= block[i];
          }
        }

        return CBC;
      }();
      /**
       * Padding namespace.
       */


      var C_pad = C.pad = {};
      /**
       * PKCS #5/7 padding strategy.
       */

      var Pkcs7 = C_pad.Pkcs7 = {
        /**
         * Pads data using the algorithm defined in PKCS #5/7.
         *
         * @param {WordArray} data The data to pad.
         * @param {number} blockSize The multiple that the data should be padded to.
         *
         * @static
         *
         * @example
         *
         *     CryptoJS.pad.Pkcs7.pad(wordArray, 4);
         */
        pad: function pad(data, blockSize) {
          // Shortcut
          var blockSizeBytes = blockSize * 4; // Count padding bytes

          var nPaddingBytes = blockSizeBytes - data.sigBytes % blockSizeBytes; // Create padding word

          var paddingWord = nPaddingBytes << 24 | nPaddingBytes << 16 | nPaddingBytes << 8 | nPaddingBytes; // Create padding

          var paddingWords = [];

          for (var i = 0; i < nPaddingBytes; i += 4) {
            paddingWords.push(paddingWord);
          }

          var padding = WordArray.create(paddingWords, nPaddingBytes); // Add padding

          data.concat(padding);
        },

        /**
         * Unpads data that had been padded using the algorithm defined in PKCS #5/7.
         *
         * @param {WordArray} data The data to unpad.
         *
         * @static
         *
         * @example
         *
         *     CryptoJS.pad.Pkcs7.unpad(wordArray);
         */
        unpad: function unpad(data) {
          // Get number of padding bytes from last byte
          var nPaddingBytes = data.words[data.sigBytes - 1 >>> 2] & 0xff; // Remove padding

          data.sigBytes -= nPaddingBytes;
        }
      };
      /**
       * Abstract base block cipher template.
       *
       * @property {number} blockSize The number of 32-bit words this cipher operates on. Default: 4 (128 bits)
       */

      C_lib.BlockCipher = Cipher.extend({
        /**
         * Configuration options.
         *
         * @property {Mode} mode The block mode to use. Default: CBC
         * @property {Padding} padding The padding strategy to use. Default: Pkcs7
         */
        cfg: Cipher.cfg.extend({
          mode: CBC,
          padding: Pkcs7
        }),
        reset: function reset() {
          var modeCreator; // Reset cipher

          Cipher.reset.call(this); // Shortcuts

          var cfg = this.cfg;
          var iv = cfg.iv;
          var mode = cfg.mode; // Reset block mode

          if (this._xformMode == this._ENC_XFORM_MODE) {
            modeCreator = mode.createEncryptor;
          } else
            /* if (this._xformMode == this._DEC_XFORM_MODE) */
            {
              modeCreator = mode.createDecryptor; // Keep at least one block in the buffer for unpadding

              this._minBufferSize = 1;
            }

          if (this._mode && this._mode.__creator == modeCreator) {
            this._mode.init(this, iv && iv.words);
          } else {
            this._mode = modeCreator.call(mode, this, iv && iv.words);
            this._mode.__creator = modeCreator;
          }
        },
        _doProcessBlock: function _doProcessBlock(words, offset) {
          this._mode.processBlock(words, offset);
        },
        _doFinalize: function _doFinalize() {
          var finalProcessedBlocks; // Shortcut

          var padding = this.cfg.padding; // Finalize

          if (this._xformMode == this._ENC_XFORM_MODE) {
            // Pad data
            padding.pad(this._data, this.blockSize); // Process final blocks

            finalProcessedBlocks = this._process(!!'flush');
          } else
            /* if (this._xformMode == this._DEC_XFORM_MODE) */
            {
              // Process final blocks
              finalProcessedBlocks = this._process(!!'flush'); // Unpad data

              padding.unpad(finalProcessedBlocks);
            }

          return finalProcessedBlocks;
        },
        blockSize: 128 / 32
      });
      /**
       * A collection of cipher parameters.
       *
       * @property {WordArray} ciphertext The raw ciphertext.
       * @property {WordArray} key The key to this ciphertext.
       * @property {WordArray} iv The IV used in the ciphering operation.
       * @property {WordArray} salt The salt used with a key derivation function.
       * @property {Cipher} algorithm The cipher algorithm.
       * @property {Mode} mode The block mode used in the ciphering operation.
       * @property {Padding} padding The padding scheme used in the ciphering operation.
       * @property {number} blockSize The block size of the cipher.
       * @property {Format} formatter The default formatting strategy to convert this cipher params object to a string.
       */

      var CipherParams = C_lib.CipherParams = Base.extend({
        /**
         * Initializes a newly created cipher params object.
         *
         * @param {Object} cipherParams An object with any of the possible cipher parameters.
         *
         * @example
         *
         *     var cipherParams = CryptoJS.lib.CipherParams.create({
         *         ciphertext: ciphertextWordArray,
         *         key: keyWordArray,
         *         iv: ivWordArray,
         *         salt: saltWordArray,
         *         algorithm: CryptoJS.algo.AES,
         *         mode: CryptoJS.mode.CBC,
         *         padding: CryptoJS.pad.PKCS7,
         *         blockSize: 4,
         *         formatter: CryptoJS.format.OpenSSL
         *     });
         */
        init: function init(cipherParams) {
          this.mixIn(cipherParams);
        },

        /**
         * Converts this cipher params object to a string.
         *
         * @param {Format} formatter (Optional) The formatting strategy to use.
         *
         * @return {string} The stringified cipher params.
         *
         * @throws Error If neither the formatter nor the default formatter is set.
         *
         * @example
         *
         *     var string = cipherParams + '';
         *     var string = cipherParams.toString();
         *     var string = cipherParams.toString(CryptoJS.format.OpenSSL);
         */
        toString: function toString(formatter) {
          return (formatter || this.formatter).stringify(this);
        }
      });
      /**
       * Format namespace.
       */

      var C_format = C.format = {};
      /**
       * OpenSSL formatting strategy.
       */

      var OpenSSLFormatter = C_format.OpenSSL = {
        /**
         * Converts a cipher params object to an OpenSSL-compatible string.
         *
         * @param {CipherParams} cipherParams The cipher params object.
         *
         * @return {string} The OpenSSL-compatible string.
         *
         * @static
         *
         * @example
         *
         *     var openSSLString = CryptoJS.format.OpenSSL.stringify(cipherParams);
         */
        stringify: function stringify(cipherParams) {
          var wordArray; // Shortcuts

          var ciphertext = cipherParams.ciphertext;
          var salt = cipherParams.salt; // Format

          if (salt) {
            wordArray = WordArray.create([0x53616c74, 0x65645f5f]).concat(salt).concat(ciphertext);
          } else {
            wordArray = ciphertext;
          }

          return wordArray.toString(Base64);
        },

        /**
         * Converts an OpenSSL-compatible string to a cipher params object.
         *
         * @param {string} openSSLStr The OpenSSL-compatible string.
         *
         * @return {CipherParams} The cipher params object.
         *
         * @static
         *
         * @example
         *
         *     var cipherParams = CryptoJS.format.OpenSSL.parse(openSSLString);
         */
        parse: function parse(openSSLStr) {
          var salt; // Parse base64

          var ciphertext = Base64.parse(openSSLStr); // Shortcut

          var ciphertextWords = ciphertext.words; // Test for salt

          if (ciphertextWords[0] == 0x53616c74 && ciphertextWords[1] == 0x65645f5f) {
            // Extract salt
            salt = WordArray.create(ciphertextWords.slice(2, 4)); // Remove salt from ciphertext

            ciphertextWords.splice(0, 4);
            ciphertext.sigBytes -= 16;
          }

          return CipherParams.create({
            ciphertext: ciphertext,
            salt: salt
          });
        }
      };
      /**
       * A cipher wrapper that returns ciphertext as a serializable cipher params object.
       */

      var SerializableCipher = C_lib.SerializableCipher = Base.extend({
        /**
         * Configuration options.
         *
         * @property {Formatter} format The formatting strategy to convert cipher param objects to and from a string. Default: OpenSSL
         */
        cfg: Base.extend({
          format: OpenSSLFormatter
        }),

        /**
         * Encrypts a message.
         *
         * @param {Cipher} cipher The cipher algorithm to use.
         * @param {WordArray|string} message The message to encrypt.
         * @param {WordArray} key The key.
         * @param {Object} cfg (Optional) The configuration options to use for this operation.
         *
         * @return {CipherParams} A cipher params object.
         *
         * @static
         *
         * @example
         *
         *     var ciphertextParams = CryptoJS.lib.SerializableCipher.encrypt(CryptoJS.algo.AES, message, key);
         *     var ciphertextParams = CryptoJS.lib.SerializableCipher.encrypt(CryptoJS.algo.AES, message, key, { iv: iv });
         *     var ciphertextParams = CryptoJS.lib.SerializableCipher.encrypt(CryptoJS.algo.AES, message, key, { iv: iv, format: CryptoJS.format.OpenSSL });
         */
        encrypt: function encrypt(cipher, message, key, cfg) {
          // Apply config defaults
          cfg = this.cfg.extend(cfg); // Encrypt

          var encryptor = cipher.createEncryptor(key, cfg);
          var ciphertext = encryptor.finalize(message); // Shortcut

          var cipherCfg = encryptor.cfg; // Create and return serializable cipher params

          return CipherParams.create({
            ciphertext: ciphertext,
            key: key,
            iv: cipherCfg.iv,
            algorithm: cipher,
            mode: cipherCfg.mode,
            padding: cipherCfg.padding,
            blockSize: cipher.blockSize,
            formatter: cfg.format
          });
        },

        /**
         * Decrypts serialized ciphertext.
         *
         * @param {Cipher} cipher The cipher algorithm to use.
         * @param {CipherParams|string} ciphertext The ciphertext to decrypt.
         * @param {WordArray} key The key.
         * @param {Object} cfg (Optional) The configuration options to use for this operation.
         *
         * @return {WordArray} The plaintext.
         *
         * @static
         *
         * @example
         *
         *     var plaintext = CryptoJS.lib.SerializableCipher.decrypt(CryptoJS.algo.AES, formattedCiphertext, key, { iv: iv, format: CryptoJS.format.OpenSSL });
         *     var plaintext = CryptoJS.lib.SerializableCipher.decrypt(CryptoJS.algo.AES, ciphertextParams, key, { iv: iv, format: CryptoJS.format.OpenSSL });
         */
        decrypt: function decrypt(cipher, ciphertext, key, cfg) {
          // Apply config defaults
          cfg = this.cfg.extend(cfg); // Convert string to CipherParams

          ciphertext = this._parse(ciphertext, cfg.format); // Decrypt

          var plaintext = cipher.createDecryptor(key, cfg).finalize(ciphertext.ciphertext);
          return plaintext;
        },

        /**
         * Converts serialized ciphertext to CipherParams,
         * else assumed CipherParams already and returns ciphertext unchanged.
         *
         * @param {CipherParams|string} ciphertext The ciphertext.
         * @param {Formatter} format The formatting strategy to use to parse serialized ciphertext.
         *
         * @return {CipherParams} The unserialized ciphertext.
         *
         * @static
         *
         * @example
         *
         *     var ciphertextParams = CryptoJS.lib.SerializableCipher._parse(ciphertextStringOrParams, format);
         */
        _parse: function _parse(ciphertext, format) {
          if (typeof ciphertext == 'string') {
            return format.parse(ciphertext, this);
          } else {
            return ciphertext;
          }
        }
      });
      /**
       * Key derivation function namespace.
       */

      var C_kdf = C.kdf = {};
      /**
       * OpenSSL key derivation function.
       */

      var OpenSSLKdf = C_kdf.OpenSSL = {
        /**
         * Derives a key and IV from a password.
         *
         * @param {string} password The password to derive from.
         * @param {number} keySize The size in words of the key to generate.
         * @param {number} ivSize The size in words of the IV to generate.
         * @param {WordArray|string} salt (Optional) A 64-bit salt to use. If omitted, a salt will be generated randomly.
         *
         * @return {CipherParams} A cipher params object with the key, IV, and salt.
         *
         * @static
         *
         * @example
         *
         *     var derivedParams = CryptoJS.kdf.OpenSSL.execute('Password', 256/32, 128/32);
         *     var derivedParams = CryptoJS.kdf.OpenSSL.execute('Password', 256/32, 128/32, 'saltsalt');
         */
        execute: function execute(password, keySize, ivSize, salt) {
          // Generate random salt
          if (!salt) {
            salt = WordArray.random(64 / 8);
          } // Derive key and IV


          var key = EvpKDF.create({
            keySize: keySize + ivSize
          }).compute(password, salt); // Separate key and IV

          var iv = WordArray.create(key.words.slice(keySize), ivSize * 4);
          key.sigBytes = keySize * 4; // Return params

          return CipherParams.create({
            key: key,
            iv: iv,
            salt: salt
          });
        }
      };
      /**
       * A serializable cipher wrapper that derives the key from a password,
       * and returns ciphertext as a serializable cipher params object.
       */

      var PasswordBasedCipher = C_lib.PasswordBasedCipher = SerializableCipher.extend({
        /**
         * Configuration options.
         *
         * @property {KDF} kdf The key derivation function to use to generate a key and IV from a password. Default: OpenSSL
         */
        cfg: SerializableCipher.cfg.extend({
          kdf: OpenSSLKdf
        }),

        /**
         * Encrypts a message using a password.
         *
         * @param {Cipher} cipher The cipher algorithm to use.
         * @param {WordArray|string} message The message to encrypt.
         * @param {string} password The password.
         * @param {Object} cfg (Optional) The configuration options to use for this operation.
         *
         * @return {CipherParams} A cipher params object.
         *
         * @static
         *
         * @example
         *
         *     var ciphertextParams = CryptoJS.lib.PasswordBasedCipher.encrypt(CryptoJS.algo.AES, message, 'password');
         *     var ciphertextParams = CryptoJS.lib.PasswordBasedCipher.encrypt(CryptoJS.algo.AES, message, 'password', { format: CryptoJS.format.OpenSSL });
         */
        encrypt: function encrypt(cipher, message, password, cfg) {
          // Apply config defaults
          cfg = this.cfg.extend(cfg); // Derive key and other params

          var derivedParams = cfg.kdf.execute(password, cipher.keySize, cipher.ivSize); // Add IV to config

          cfg.iv = derivedParams.iv; // Encrypt

          var ciphertext = SerializableCipher.encrypt.call(this, cipher, message, derivedParams.key, cfg); // Mix in derived params

          ciphertext.mixIn(derivedParams);
          return ciphertext;
        },

        /**
         * Decrypts serialized ciphertext using a password.
         *
         * @param {Cipher} cipher The cipher algorithm to use.
         * @param {CipherParams|string} ciphertext The ciphertext to decrypt.
         * @param {string} password The password.
         * @param {Object} cfg (Optional) The configuration options to use for this operation.
         *
         * @return {WordArray} The plaintext.
         *
         * @static
         *
         * @example
         *
         *     var plaintext = CryptoJS.lib.PasswordBasedCipher.decrypt(CryptoJS.algo.AES, formattedCiphertext, 'password', { format: CryptoJS.format.OpenSSL });
         *     var plaintext = CryptoJS.lib.PasswordBasedCipher.decrypt(CryptoJS.algo.AES, ciphertextParams, 'password', { format: CryptoJS.format.OpenSSL });
         */
        decrypt: function decrypt(cipher, ciphertext, password, cfg) {
          // Apply config defaults
          cfg = this.cfg.extend(cfg); // Convert string to CipherParams

          ciphertext = this._parse(ciphertext, cfg.format); // Derive key and other params

          var derivedParams = cfg.kdf.execute(password, cipher.keySize, cipher.ivSize, ciphertext.salt); // Add IV to config

          cfg.iv = derivedParams.iv; // Decrypt

          var plaintext = SerializableCipher.decrypt.call(this, cipher, ciphertext, derivedParams.key, cfg);
          return plaintext;
        }
      });
    }();
  });
})(cipherCore);

(function (module, exports) {
  (function (root, factory, undef) {
    {
      // CommonJS
      module.exports = factory(core.exports, encBase64.exports, md5.exports, evpkdf.exports, cipherCore.exports);
    }
  })(commonjsGlobal, function (CryptoJS) {
    (function () {
      // Shortcuts
      var C = CryptoJS;
      var C_lib = C.lib;
      var BlockCipher = C_lib.BlockCipher;
      var C_algo = C.algo; // Lookup tables

      var SBOX = [];
      var INV_SBOX = [];
      var SUB_MIX_0 = [];
      var SUB_MIX_1 = [];
      var SUB_MIX_2 = [];
      var SUB_MIX_3 = [];
      var INV_SUB_MIX_0 = [];
      var INV_SUB_MIX_1 = [];
      var INV_SUB_MIX_2 = [];
      var INV_SUB_MIX_3 = []; // Compute lookup tables

      (function () {
        // Compute double table
        var d = [];

        for (var i = 0; i < 256; i++) {
          if (i < 128) {
            d[i] = i << 1;
          } else {
            d[i] = i << 1 ^ 0x11b;
          }
        } // Walk GF(2^8)


        var x = 0;
        var xi = 0;

        for (var i = 0; i < 256; i++) {
          // Compute sbox
          var sx = xi ^ xi << 1 ^ xi << 2 ^ xi << 3 ^ xi << 4;
          sx = sx >>> 8 ^ sx & 0xff ^ 0x63;
          SBOX[x] = sx;
          INV_SBOX[sx] = x; // Compute multiplication

          var x2 = d[x];
          var x4 = d[x2];
          var x8 = d[x4]; // Compute sub bytes, mix columns tables

          var t = d[sx] * 0x101 ^ sx * 0x1010100;
          SUB_MIX_0[x] = t << 24 | t >>> 8;
          SUB_MIX_1[x] = t << 16 | t >>> 16;
          SUB_MIX_2[x] = t << 8 | t >>> 24;
          SUB_MIX_3[x] = t; // Compute inv sub bytes, inv mix columns tables

          var t = x8 * 0x1010101 ^ x4 * 0x10001 ^ x2 * 0x101 ^ x * 0x1010100;
          INV_SUB_MIX_0[sx] = t << 24 | t >>> 8;
          INV_SUB_MIX_1[sx] = t << 16 | t >>> 16;
          INV_SUB_MIX_2[sx] = t << 8 | t >>> 24;
          INV_SUB_MIX_3[sx] = t; // Compute next counter

          if (!x) {
            x = xi = 1;
          } else {
            x = x2 ^ d[d[d[x8 ^ x2]]];
            xi ^= d[d[xi]];
          }
        }
      })(); // Precomputed Rcon lookup


      var RCON = [0x00, 0x01, 0x02, 0x04, 0x08, 0x10, 0x20, 0x40, 0x80, 0x1b, 0x36];
      /**
       * AES block cipher algorithm.
       */

      var AES = C_algo.AES = BlockCipher.extend({
        _doReset: function _doReset() {
          var t; // Skip reset of nRounds has been set before and key did not change

          if (this._nRounds && this._keyPriorReset === this._key) {
            return;
          } // Shortcuts


          var key = this._keyPriorReset = this._key;
          var keyWords = key.words;
          var keySize = key.sigBytes / 4; // Compute number of rounds

          var nRounds = this._nRounds = keySize + 6; // Compute number of key schedule rows

          var ksRows = (nRounds + 1) * 4; // Compute key schedule

          var keySchedule = this._keySchedule = [];

          for (var ksRow = 0; ksRow < ksRows; ksRow++) {
            if (ksRow < keySize) {
              keySchedule[ksRow] = keyWords[ksRow];
            } else {
              t = keySchedule[ksRow - 1];

              if (!(ksRow % keySize)) {
                // Rot word
                t = t << 8 | t >>> 24; // Sub word

                t = SBOX[t >>> 24] << 24 | SBOX[t >>> 16 & 0xff] << 16 | SBOX[t >>> 8 & 0xff] << 8 | SBOX[t & 0xff]; // Mix Rcon

                t ^= RCON[ksRow / keySize | 0] << 24;
              } else if (keySize > 6 && ksRow % keySize == 4) {
                // Sub word
                t = SBOX[t >>> 24] << 24 | SBOX[t >>> 16 & 0xff] << 16 | SBOX[t >>> 8 & 0xff] << 8 | SBOX[t & 0xff];
              }

              keySchedule[ksRow] = keySchedule[ksRow - keySize] ^ t;
            }
          } // Compute inv key schedule


          var invKeySchedule = this._invKeySchedule = [];

          for (var invKsRow = 0; invKsRow < ksRows; invKsRow++) {
            var ksRow = ksRows - invKsRow;

            if (invKsRow % 4) {
              var t = keySchedule[ksRow];
            } else {
              var t = keySchedule[ksRow - 4];
            }

            if (invKsRow < 4 || ksRow <= 4) {
              invKeySchedule[invKsRow] = t;
            } else {
              invKeySchedule[invKsRow] = INV_SUB_MIX_0[SBOX[t >>> 24]] ^ INV_SUB_MIX_1[SBOX[t >>> 16 & 0xff]] ^ INV_SUB_MIX_2[SBOX[t >>> 8 & 0xff]] ^ INV_SUB_MIX_3[SBOX[t & 0xff]];
            }
          }
        },
        encryptBlock: function encryptBlock(M, offset) {
          this._doCryptBlock(M, offset, this._keySchedule, SUB_MIX_0, SUB_MIX_1, SUB_MIX_2, SUB_MIX_3, SBOX);
        },
        decryptBlock: function decryptBlock(M, offset) {
          // Swap 2nd and 4th rows
          var t = M[offset + 1];
          M[offset + 1] = M[offset + 3];
          M[offset + 3] = t;

          this._doCryptBlock(M, offset, this._invKeySchedule, INV_SUB_MIX_0, INV_SUB_MIX_1, INV_SUB_MIX_2, INV_SUB_MIX_3, INV_SBOX); // Inv swap 2nd and 4th rows


          var t = M[offset + 1];
          M[offset + 1] = M[offset + 3];
          M[offset + 3] = t;
        },
        _doCryptBlock: function _doCryptBlock(M, offset, keySchedule, SUB_MIX_0, SUB_MIX_1, SUB_MIX_2, SUB_MIX_3, SBOX) {
          // Shortcut
          var nRounds = this._nRounds; // Get input, add round key

          var s0 = M[offset] ^ keySchedule[0];
          var s1 = M[offset + 1] ^ keySchedule[1];
          var s2 = M[offset + 2] ^ keySchedule[2];
          var s3 = M[offset + 3] ^ keySchedule[3]; // Key schedule row counter

          var ksRow = 4; // Rounds

          for (var round = 1; round < nRounds; round++) {
            // Shift rows, sub bytes, mix columns, add round key
            var t0 = SUB_MIX_0[s0 >>> 24] ^ SUB_MIX_1[s1 >>> 16 & 0xff] ^ SUB_MIX_2[s2 >>> 8 & 0xff] ^ SUB_MIX_3[s3 & 0xff] ^ keySchedule[ksRow++];
            var t1 = SUB_MIX_0[s1 >>> 24] ^ SUB_MIX_1[s2 >>> 16 & 0xff] ^ SUB_MIX_2[s3 >>> 8 & 0xff] ^ SUB_MIX_3[s0 & 0xff] ^ keySchedule[ksRow++];
            var t2 = SUB_MIX_0[s2 >>> 24] ^ SUB_MIX_1[s3 >>> 16 & 0xff] ^ SUB_MIX_2[s0 >>> 8 & 0xff] ^ SUB_MIX_3[s1 & 0xff] ^ keySchedule[ksRow++];
            var t3 = SUB_MIX_0[s3 >>> 24] ^ SUB_MIX_1[s0 >>> 16 & 0xff] ^ SUB_MIX_2[s1 >>> 8 & 0xff] ^ SUB_MIX_3[s2 & 0xff] ^ keySchedule[ksRow++]; // Update state

            s0 = t0;
            s1 = t1;
            s2 = t2;
            s3 = t3;
          } // Shift rows, sub bytes, add round key


          var t0 = (SBOX[s0 >>> 24] << 24 | SBOX[s1 >>> 16 & 0xff] << 16 | SBOX[s2 >>> 8 & 0xff] << 8 | SBOX[s3 & 0xff]) ^ keySchedule[ksRow++];
          var t1 = (SBOX[s1 >>> 24] << 24 | SBOX[s2 >>> 16 & 0xff] << 16 | SBOX[s3 >>> 8 & 0xff] << 8 | SBOX[s0 & 0xff]) ^ keySchedule[ksRow++];
          var t2 = (SBOX[s2 >>> 24] << 24 | SBOX[s3 >>> 16 & 0xff] << 16 | SBOX[s0 >>> 8 & 0xff] << 8 | SBOX[s1 & 0xff]) ^ keySchedule[ksRow++];
          var t3 = (SBOX[s3 >>> 24] << 24 | SBOX[s0 >>> 16 & 0xff] << 16 | SBOX[s1 >>> 8 & 0xff] << 8 | SBOX[s2 & 0xff]) ^ keySchedule[ksRow++]; // Set output

          M[offset] = t0;
          M[offset + 1] = t1;
          M[offset + 2] = t2;
          M[offset + 3] = t3;
        },
        keySize: 256 / 32
      });
      /**
       * Shortcut functions to the cipher's object interface.
       *
       * @example
       *
       *     var ciphertext = CryptoJS.AES.encrypt(message, key, cfg);
       *     var plaintext  = CryptoJS.AES.decrypt(ciphertext, key, cfg);
       */

      C.AES = BlockCipher._createHelper(AES);
    })();

    return CryptoJS.AES;
  });
})(aes);

(function (module, exports) {
  (function (root, factory, undef) {
    {
      // CommonJS
      module.exports = factory(core.exports, md5.exports, pbkdf2.exports, aes.exports);
    }
  })(commonjsGlobal, function (CryptoJS) {
    return CryptoJS;
  });
})(cryptoJs);

var CryptoJS = cryptoJs.exports;

function Encrypting(data, key) {
  var iv = CryptoJS.enc.Hex.parse("c3eef06037e837f4ee390bda69c05023");
  var pass = CryptoJS.enc.Utf8.parse(key);
  var salt = CryptoJS.enc.Utf8.parse("234292a9fce031f2");
  var key128Bits1000Iterations = CryptoJS.PBKDF2(pass.toString(CryptoJS.enc.Utf8), salt, {
    keySize: 128 / 32,
    iterations: 1000
  });
  var cfg = {
    mode: CryptoJS.mode.CBC,
    iv: iv,
    padding: CryptoJS.pad.Pkcs7
  };
  var encrypted = CryptoJS.AES.encrypt(JSON.stringify(data), key128Bits1000Iterations, cfg);
  return CryptoJS.enc.Base64.stringify(encrypted.ciphertext);
}

function EncryptingAsync(data, key) {
  return __awaiter(this, void 0, void 0, /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
    var result;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            result = Encrypting(data, key);
            return _context.abrupt("return", Promise.resolve(result));

          case 2:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
}

function getDevicePixelRatio() {
  return window.devicePixelRatio;
}

function getCurrentResolution() {
  var ratio = getDevicePixelRatio();
  return screen.width * ratio + "x" + screen.height * ratio;
}

function getPixelDepth() {
  return screen.pixelDepth;
}

function getScreenPrint() {
  return {
    currentResolution: getCurrentResolution(),
    pixelDepth: getPixelDepth()
  };
}

function getCanvas() {
  var canvas = _fingerprintjs.sources.canvas();

  return {
    winding: canvas.winding,
    geometry: canvas.geometry,
    text: ""
  };
}

function componentsToCanonicalString(components) {
  var result = "";

  var _iterator = _createForOfIteratorHelper(Object.keys(components).sort()),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var componentKey = _step.value;
      var component = components[componentKey];
      var value = component.error ? "error" : JSON.stringify(component.value);
      result += "".concat(result ? "|" : "").concat(componentKey.replace(/([:|\\])/g, "\\$1"), ":").concat(value);
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  return "{" + result + "}";
}

function getFontPreference() {
  return __awaiter(this, void 0, void 0, /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
    var font;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _fingerprintjs.sources.fontPreferences();

          case 2:
            font = _context2.sent;
            return _context2.abrupt("return", {
              "default": font["default"],
              apple: font["apple"],
              serif: font["serif"],
              sans: font["sans"],
              min: font["min"],
              system: font["system"]
            });

          case 4:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
}

function getLanguages() {
  return {
    language: window.navigator.language,
    languages: window.navigator.languages.join(","),
    userLanguage: window.navigator["userLanguage"],
    browserLanguage: window.navigator["browserLanguage"],
    systemLanguage: window.navigator["systemLanguage"]
  };
}

function getDI() {
  var _this = this;

  var visitorId;
  var properties;

  var fpPromise = _fingerprintjs["default"].load({
    monitoring: false
  });

  return fpPromise.then(function (fp) {
    return fp.get();
  }).then(function (result) {
    return __awaiter(_this, void 0, void 0, /*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
      var _a, components, customComponents;

      return _regeneratorRuntime().wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _a = result.components, components = __rest(_a, ["screenResolution", "screenFrame", "canvas", "fontPreferences", "languages"]);
              _context3.t0 = Object;
              _context3.t1 = Object.assign({}, components);
              _context3.t2 = {
                value: getScreenPrint(),
                duration: 0
              };
              _context3.t3 = {
                value: getCanvas(),
                duration: 0
              };
              _context3.next = 7;
              return getFontPreference();

            case 7:
              _context3.t4 = _context3.sent;
              _context3.t5 = {
                value: _context3.t4,
                duration: 0
              };
              _context3.t6 = {
                value: getLanguages(),
                duration: 0
              };
              _context3.t7 = {
                screenPrint: _context3.t2,
                canvasPrint: _context3.t3,
                fontPreferencePrint: _context3.t5,
                languagesPrint: _context3.t6
              };
              customComponents = _context3.t0.assign.call(_context3.t0, _context3.t1, _context3.t7);
              visitorId = _fingerprintjs["default"].hashComponents(customComponents);
              properties = componentsToCanonicalString(customComponents);
              return _context3.abrupt("return", Promise.resolve({
                Id: visitorId,
                Properties: properties
              }));

            case 15:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }));
  });
}

var apiUrl = "__apiUrl__";
var subscriberId = "__subscriberId__";
var sessionKey = "__sessionKey__";

function set(appAPIUrl, subscriber, sessionKey) {
  this.apiUrl = appAPIUrl;
  this.subscriberId = subscriber;
  this.sessionKey = sessionKey;
}

function initStorage() {
  var localForageDrives = [];

  if (isIndexDB()) {
    localForageDrives.push(_localforage["default"].INDEXEDDB);
  }

  if (isWebSQL()) {
    localForageDrives.push(_localforage["default"].WEBSQL);
  }

  if (isLocalStorage()) {
    localForageDrives.push(_localforage["default"].LOCALSTORAGE);
  }

  return Promise.resolve(localForageDrives);
}

function isWebSQL() {
  try {
    if (!window.openDatabase) return false;
  } catch (_a) {
    return false;
  }

  return true;
}

function isIndexDB() {
  try {
    if (window.indexedDB) return true;
  } catch (_a) {
    return false;
  }

  return false;
}

function isLocalStorage() {
  try {
    if (window.localStorage) return true;
  } catch (_a) {
    return false;
  }

  return false;
}

function setCookie(name, value, days) {
  var expires = "";

  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
  }

  document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

function getCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(";");

  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];

    while (c.charAt(0) == " ") {
      c = c.substring(1, c.length);
    }

    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }

  return null;
}

function cookieHandler(cookieCode) {
  return new Promise(function (resolve) {
    resolve(isGuid(cookieCode) ? cookieCode : generateUUID());
  });
}

function isGuid(cookieCode) {
  var regexGuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return regexGuid.test(cookieCode);
}

function generateUUID() {
  // Public Domain/MIT
  var d = new Date().getTime(); //Timestamp

  var d2 = typeof performance !== "undefined" && performance.now && performance.now() * 1000 || 0; //Time in microseconds since page-load or 0 if unsupported

  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = Math.random() * 16; //random number between 0 and 16

    if (d > 0) {
      //Use timestamp until depleted
      r = (d + r) % 16 | 0;
      d = Math.floor(d / 16);
    } else {
      //Use microseconds since page-load if supported
      r = (d2 + r) % 16 | 0;
      d2 = Math.floor(d2 / 16);
    }

    return (c === "x" ? r : r & 0x3 | 0x8).toString(16);
  });
}

function setStorage(name, value) {
  initStorage().then(function (drivers) {
    drivers.forEach(function (drive) {
      var storageDriver = _localforage["default"].createInstance({
        driver: drive,
        name: drive + "-EC",
        storeName: "ec"
      });

      storageDriver.setItem(name, value, function () {}).then(console.log)["catch"](function (e) {
        console.log(e.message);
      });
      setCookie(name, value, 30);
    });
  });
}

function storageHandler(name) {
  var _this2 = this;

  return initStorage().then(function (driver) {
    var cookies = driver.map(function (drive) {
      return __awaiter(_this2, void 0, void 0, /*#__PURE__*/_regeneratorRuntime().mark(function _callee4() {
        var storageDriver;
        return _regeneratorRuntime().wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                if (!(drive != null)) {
                  _context4.next = 11;
                  break;
                }

                _context4.prev = 1;
                storageDriver = _localforage["default"].createInstance({
                  driver: drive,
                  name: drive + "-EC",
                  storeName: "ec"
                });
                _context4.next = 5;
                return storageDriver.getItem(name, function () {});

              case 5:
                return _context4.abrupt("return", _context4.sent);

              case 8:
                _context4.prev = 8;
                _context4.t0 = _context4["catch"](1);
                return _context4.abrupt("return", Promise.resolve(null));

              case 11:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, null, [[1, 8]]);
      }));
    });
    cookies.push(Promise.resolve(getCookie(name)));
    return cookies;
  }).then(function (res) {
    return Promise.all(res).then(function (cookies) {
      var latestCookie = null;

      var _iterator2 = _createForOfIteratorHelper(cookies),
          _step2;

      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var cookie = _step2.value;

          if (cookie != null) {
            latestCookie = cookie;
            break;
          }
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }

      return cookieHandler(latestCookie).then(function (cookieValue) {
        setStorage(name, cookieValue);
        return cookieValue;
      });
    });
  });
}

var allTestFunctions = [{
  name: "UserAgent",
  testFunction: testUserAgent,
  active: 1
}, {
  name: "ChromeWindow",
  testFunction: testChromeWindow,
  active: 1
}, {
  name: "Plugins",
  testFunction: testPlugins,
  active: 0
}, {
  name: "AppVersion",
  testFunction: testAppVersion,
  active: 1
}, {
  name: "ConnectionRtt",
  testFunction: testConnectionRtt,
  active: 1
}, {
  name: "Webdriver",
  testFunction: testWebdriver,
  active: 1
}]; //* All Tests *//

function testWebdriver() {
  var webdriver = navigator.webdriver;
  return webdriver ? 1 : 0;
} // User Agent


function testUserAgent() {
  if (/Headless/.test(window.navigator.userAgent)) {
    // Headless
    return 1;
  } else {
    // Not Headless
    return 0;
  }
} // Window.Chrome


function testChromeWindow() {
  if (eval.toString().length == 33 && !window.chrome) {
    // Headless
    return 1;
  } else {
    // Not Headless
    return 0;
  }
} // Notification Permissions


function testNotificationPermissions() {
  return __awaiter(this, void 0, void 0, /*#__PURE__*/_regeneratorRuntime().mark(function _callee5() {
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return navigator.permissions.query({
              name: "notifications"
            }).then(function (permissionStatus) {
              if (Notification.permission === "denied" && permissionStatus.state === "prompt") {
                // Headless
                return 0.5;
              } else {
                // Not Headless
                return 0;
              }
            });

          case 2:
            return _context5.abrupt("return", _context5.sent);

          case 3:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));
} // No Plugins


function testPlugins() {
  var length = navigator.plugins.length;
  return length === 0 ? 1 : 0;
} // App Version


function testAppVersion() {
  var appVersion = navigator.appVersion;
  return /headless/i.test(appVersion) ? 1 : 0;
} // Connection Rtt


function testConnectionRtt() {
  var connection = navigator.connection;
  var connectionRtt = connection ? connection.rtt : undefined;

  if (connectionRtt === undefined) {
    return 0; // Flag doesn't even exists so just return NOT HEADLESS
  } else {
    return connectionRtt === 0 ? 0.5 : 0;
  }
} //* Main Functions *//


function getHeadlessScore() {
  return __awaiter(this, void 0, void 0, /*#__PURE__*/_regeneratorRuntime().mark(function _callee6() {
    var score, testsRun, testRunDetail;
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            score = 0;
            testsRun = 0;
            testRunDetail = "";
            _context6.next = 5;
            return testNotificationPermissions().then(function (x) {
              score = x;
              testsRun++;
              testRunDetail = "NotificationPermissions : " + x + ", ";
            }).then(function () {
              allTestFunctions.forEach(function (test) {
                if (test.active == 1) {
                  var result = test.testFunction();
                  score += result;
                  testsRun++;
                  testRunDetail += test.name + " : " + result + ", ";
                }
              });
              return {
                score: score,
                testsRun: testsRun,
                testsDetail: testRunDetail.substring(0, testRunDetail.length - 2)
              };
            });

          case 5:
            return _context6.abrupt("return", _context6.sent);

          case 6:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));
}

function postData(url, data) {
  return __awaiter(this, void 0, void 0, /*#__PURE__*/_regeneratorRuntime().mark(function _callee7() {
    return _regeneratorRuntime().wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            return _context7.abrupt("return", fetch(url, {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify(data)
            }));

          case 1:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
  }));
}

function postDataFp(url, data, token) {
  return __awaiter(this, void 0, void 0, /*#__PURE__*/_regeneratorRuntime().mark(function _callee8() {
    return _regeneratorRuntime().wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            return _context8.abrupt("return", fetch(url + "/fp", {
              method: "POST",
              cache: "no-cache",
              credentials: "include",
              headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token
              },
              redirect: "follow",
              referrerPolicy: "no-referrer",
              body: JSON.stringify(data)
            }));

          case 1:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8);
  }));
}

var _isDebug = false;
var _cookieName = "__fp";

function isDebug(isDebug) {
  _isDebug = isDebug;
  return this;
}

function config(apiUrl, subscriberId, sessionKey) {
  set(apiUrl, subscriberId, sessionKey);
}

function getFP() {
  var start = Date.now();
  storageHandler(_cookieName).then(function (cookieCode) {
    getDI().then(function (result) {
      if (_isDebug) {
        console.log(result.Id);
        console.log(result.Properties);
      } else {
        processData(result, sessionKey, cookieCode);
      }
    }).then(function () {
      var end = Date.now() - start;
      console.log("milliseconds elapsed of collect fp = ".concat(end, "ms"));
    });
  });
}

function processData(result, sessionKey, cookieCode) {
  var _this3 = this;

  getConfig(apiUrl).then(function (conf) {
    return __awaiter(_this3, void 0, void 0, /*#__PURE__*/_regeneratorRuntime().mark(function _callee9() {
      var response, fingerPrintAttribute, transaction;
      return _regeneratorRuntime().wrap(function _callee9$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              if (!conf.ok) {
                _context9.next = 20;
                break;
              }

              _context9.next = 3;
              return conf.json();

            case 3:
              response = _context9.sent;
              fingerPrintAttribute = EncryptingAsync({
                di: result.Id,
                attr: result.Properties
              }, response.a).then(function (res) {
                return postData(apiUrl + "/fpa", res);
              });
              _context9.t0 = EncryptingAsync;
              _context9.t1 = result.Id;
              _context9.t2 = sessionKey;
              _context9.t3 = subscriberId;
              _context9.t4 = cookieCode;
              _context9.t5 = JSON;
              _context9.next = 13;
              return getHeadlessScore();

            case 13:
              _context9.t6 = _context9.sent;
              _context9.t7 = _context9.t5.stringify.call(_context9.t5, _context9.t6);
              _context9.t8 = window.location && window.location.href ? window.location.href : "";
              _context9.t9 = {
                di: _context9.t1,
                fk: _context9.t2,
                subs: _context9.t3,
                cookieCode: _context9.t4,
                flagged: _context9.t7,
                url: _context9.t8
              };
              _context9.t10 = response.a;
              transaction = (0, _context9.t0)(_context9.t9, _context9.t10).then(function (res) {
                return postDataFp(apiUrl, res, response.b);
              });
              Promise.all([fingerPrintAttribute, transaction]);

            case 20:
            case "end":
              return _context9.stop();
          }
        }
      }, _callee9);
    }));
  });
}

function getConfig(url) {
  return fetch(url + "/conf", {
    method: "GET",
    redirect: "follow"
  });
}

getFP();
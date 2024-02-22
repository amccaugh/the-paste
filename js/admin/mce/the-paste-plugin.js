(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
(function (global){(function (){
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
var _jquery = _interopRequireDefault((typeof window !== "undefined" ? window['jQuery'] : typeof global !== "undefined" ? global['jQuery'] : null));
var _converter = _interopRequireDefault(require("converter"));
var _notices = _interopRequireDefault(require("notices"));
var _uploader = _interopRequireDefault(require("uploader"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator.return && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, catch: function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }
function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }
function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set"); _classApplyDescriptorSet(receiver, descriptor, value); return value; }
function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }
function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }
function _classStaticPrivateFieldSpecGet(receiver, classConstructor, descriptor) { _classCheckPrivateStaticAccess(receiver, classConstructor); _classCheckPrivateStaticFieldDescriptor(descriptor, "get"); return _classApplyDescriptorGet(receiver, descriptor); }
function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }
function _classStaticPrivateFieldSpecSet(receiver, classConstructor, descriptor, value) { _classCheckPrivateStaticAccess(receiver, classConstructor); _classCheckPrivateStaticFieldDescriptor(descriptor, "set"); _classApplyDescriptorSet(receiver, descriptor, value); return value; }
function _classCheckPrivateStaticFieldDescriptor(descriptor, action) { if (descriptor === undefined) { throw new TypeError("attempted to " + action + " private static field before its declaration"); } }
function _classCheckPrivateStaticAccess(receiver, classConstructor) { if (receiver !== classConstructor) { throw new TypeError("Private static access of wrong provenance"); } }
function _classApplyDescriptorSet(receiver, descriptor, value) { if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } }
var _files = /*#__PURE__*/new WeakMap();
var _isAsync = /*#__PURE__*/new WeakMap();
var PasteOperation = /*#__PURE__*/function () {
  function PasteOperation(event) {
    var _this$clipboardData$f,
      _this = this;
    _classCallCheck(this, PasteOperation);
    _classPrivateFieldInitSpec(this, _files, {
      writable: true,
      value: []
    });
    _classPrivateFieldInitSpec(this, _isAsync, {
      writable: true,
      value: void 0
    });
    this.clipboardData = event.clipboardData;
    this.body = event.target.closest('body');
    _classPrivateFieldSet(this, _files, Array.from((_this$clipboardData$f = this.clipboardData.files) !== null && _this$clipboardData$f !== void 0 ? _this$clipboardData$f : []));
    _classPrivateFieldSet(this, _isAsync, Array.from(event.clipboardData.items).filter(function (item) {
      return item.kind === 'string' && item.type === 'text/html';
    }).length > 0);
    // no files
    if (!this.isAsync && !this.files.length) {
      return;
    }
    if (this.isAsync) {
      // google docs clipboard items present
      _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
        var i, html, div, placeholder, images;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return _converter.default.clipboardItemsToHtml(event.clipboardData.items);
            case 2:
              html = _context.sent;
              div = document.createElement('div');
              placeholder = _this.body.querySelector('#the-pasted-async');
              images = [];
              div.innerHTML = html;
              images.push.apply(images, _toConsumableArray(Array.from(div.querySelectorAll('img'))));
              Array.from(div.childNodes).forEach(function (node) {
                return placeholder.parentNode.insertBefore(node, placeholder);
              });
              placeholder === null || placeholder === void 0 ? void 0 : placeholder.remove();
              if (!images.length) {
                _context.next = 20;
                break;
              }
              i = 0;
            case 12:
              if (!(i < images.length)) {
                _context.next = 19;
                break;
              }
              _context.next = 15;
              return _converter.default.urlToBlobUrl(images[i].src);
            case 15:
              images[i].src = _context.sent;
            case 16:
              i++;
              _context.next = 12;
              break;
            case 19:
              _this.body.dispatchEvent(new Event('FilesPasted'));
            case 20:
            case "end":
              return _context.stop();
          }
        }, _callee);
      }))();
    } else if (this.body.querySelector('[src^="data:"]:not(.--paste-process)')) {
      this.body.dispatchEvent(new Event('FilesPasted'));
    }
  }
  _createClass(PasteOperation, [{
    key: "isAsync",
    get: function get() {
      return _classPrivateFieldGet(this, _isAsync);
    }
  }, {
    key: "hasPastedFiles",
    get: function get() {
      return this.files.length > 0;
    }
  }, {
    key: "pastedContent",
    get: function get() {
      return this.isAsync ? '<p id="the-pasted-async"></p>' : this.files.map(function (file, idx) {
        var src = URL.createObjectURL(file);
        return "<img id=\"the-pasted-".concat(file.type, "-").concat(idx, "\" src=\"").concat(src, "\" alt=\"").concat(file.name, "\" />");
      }).join('');
    }
  }, {
    key: "files",
    get: function get() {
      return _classPrivateFieldGet(this, _files);
    }
  }, {
    key: "observe",
    value: function observe() {
      _classStaticPrivateFieldSpecSet(PasteOperation, PasteOperation, _observer, new MutationObserver(function (entries) {
        entries.forEach(function (entry) {});
      }, {
        childNodes: true,
        subtree: true
      }));
      return this;
    }
  }, {
    key: "dumpClipboardData",
    value: function dumpClipboardData() {
      Array.from(this.clipboardData.files).forEach(function (el) {
        return console.log(el);
      });
      Array.from(this.clipboardData.items).forEach(function (el) {
        console.log(el, el.kind, el.type);
        if ('string' === el.kind) {
          el.getAsString(function (s) {
            return console.log(s);
          });
        }
      });
      return this;
    }
  }], [{
    key: "init",
    value: function init(event) {
      _classStaticPrivateFieldSpecSet(PasteOperation, PasteOperation, _instance, new PasteOperation(event));
      return PasteOperation.get();
    }
  }, {
    key: "get",
    value: function get() {
      return _classStaticPrivateFieldSpecGet(PasteOperation, PasteOperation, _instance);
    }
  }, {
    key: "destroy",
    value: function destroy() {
      _classStaticPrivateFieldSpecSet(PasteOperation, PasteOperation, _instance, null);
    }
  }]);
  return PasteOperation;
}();
var _instance = {
  writable: true,
  value: null
};
var _observer = {
  writable: true,
  value: null
};
tinymce.PluginManager.add('the_paste', function (editor) {
  var pasteBtn, pasteOnOffBtn, toolbar;
  if (!thepaste.options.editor.datauri) {
    // always auto uploaded
    thepaste.options.editor.auto_upload = true;
  } else {
    // user choice
    thepaste.options.editor.auto_upload = localStorage.getItem('thepaste.auto_upload') !== 'false';

    // enable / disable autoupload button
    editor.addButton('thepaste', {
      icon: 'thepaste',
      tooltip: thepaste.l10n.upload_pasted_images,
      cmd: 'cmd_thepaste',
      onPostRender: function onPostRender() {
        pasteBtn = this;
      },
      active: thepaste.options.editor.auto_upload
    });
  }

  // enable / disable autoupload button
  editor.addButton('thepaste_onoff', {
    icon: 'thepaste_onoff',
    tooltip: thepaste.l10n.paste_files,
    onPostRender: function onPostRender() {
      pasteOnOffBtn = this;
    },
    onClick: function onClick() {
      this.active(!this.active());
      fetch("".concat(thepaste.options.editor.enable_ajax_url, "&enabled=").concat(this.active() ? 1 : 0));
    },
    active: thepaste.options.editor.enabled
  });

  // upload button in media toolbar flyout
  editor.addButton('wp_img_thepaste_upload', {
    icon: 'dashicon dashicons dashicons-upload thepaste-upload',
    tooltip: thepaste.l10n.upload_image,
    onclick: function onclick() {
      // wrap img, upload
      _uploader.default.inlineUpload(editor.selection.getNode());
    }
  });

  // setup media toolbar flyout on node change
  editor.on('wptoolbar', function (event) {
    var uploadBtn;
    if (event.element.nodeName === 'IMG' && !editor.wp.isPlaceholder(event.element)) {
      event.toolbar = toolbar;
      uploadBtn = toolbar.$el.find('.thepaste-upload').closest('.mce-btn');
      if (canUpload(event.element)) {
        uploadBtn.show();
      } else {
        uploadBtn.hide();
      }
    }
  });

  // enable / disable autoupload
  editor.addCommand('cmd_thepaste', function () {
    thepaste.options.editor.auto_upload = !thepaste.options.editor.auto_upload;
    localStorage.setItem('thepaste.auto_upload', thepaste.options.editor.auto_upload.toString());
    pasteBtn.active(thepaste.options.editor.auto_upload);
  });

  // init media toolbar flyout
  editor.once('preinit', function () {
    if (editor.wp && editor.wp._createToolbar) {
      toolbar = editor.wp._createToolbar(['wp_img_alignleft', 'wp_img_aligncenter', 'wp_img_alignright', 'wp_img_alignnone', 'wp_img_thepaste_upload', 'wp_img_edit', 'wp_img_remove']);
    }
  });

  // true if data source or blob image
  function canUpload(img) {
    var sub = img.src.substring(0, 5);
    return sub === 'blob:' || sub === 'data:';
  }
  var crawlPastedImages = function crawlPastedImages() {
    return Array.from(editor.dom.doc.body.querySelectorAll('[src^="blob:"]:not(.--paste-process),[src^="data:"]:not(.--paste-process)'));
  };
  editor.on('init', function () {
    var processImage = /*#__PURE__*/function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(loadedImg) {
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              if (!(loadedImg.naturalWidth * loadedImg.naturalHeight > thepaste.options.editor.force_upload_size)) {
                _context2.next = 4;
                break;
              }
              _uploader.default.inlineUpload(loadedImg).catch(function (err) {
                return _notices.default.error(err.message, true) || loadedImg.remove();
              });
              _context2.next = 8;
              break;
            case 4:
              if (!(loadedImg.src.substr(0, 4) === 'blob')) {
                _context2.next = 8;
                break;
              }
              _context2.next = 7;
              return _converter.default.blobUrlToDataUrl(loadedImg.src);
            case 7:
              loadedImg.src = _context2.sent;
            case 8:
            case "end":
              return _context2.stop();
          }
        }, _callee2);
      }));
      return function processImage(_x) {
        return _ref2.apply(this, arguments);
      };
    }();
    editor.dom.doc.body.addEventListener('FilesPasted', /*#__PURE__*/function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(e) {
        var i, el, images;
        return _regeneratorRuntime().wrap(function _callee4$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              images = crawlPastedImages();
              i = 0;
            case 2:
              if (!(i < images.length)) {
                _context4.next = 19;
                break;
              }
              el = images[i];
              el.classList.add('--paste-process');
              _context4.t0 = !thepaste.options.editor.auto_upload;
              if (!_context4.t0) {
                _context4.next = 11;
                break;
              }
              _context4.next = 9;
              return _converter.default.urlToType(el.src);
            case 9:
              _context4.t1 = _context4.sent;
              _context4.t0 = 'image' === _context4.t1;
            case 11:
              if (!_context4.t0) {
                _context4.next = 15;
                break;
              }
              if (el.complete) {
                processImage(el);
              } else {
                el.onload = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
                  return _regeneratorRuntime().wrap(function _callee3$(_context3) {
                    while (1) switch (_context3.prev = _context3.next) {
                      case 0:
                        return _context3.abrupt("return", processImage(el));
                      case 1:
                      case "end":
                        return _context3.stop();
                    }
                  }, _callee3);
                }));
              }
              _context4.next = 16;
              break;
            case 15:
              _uploader.default.inlineUpload(el).catch(function (err) {
                return _notices.default.error(err.message, true) || el.remove();
              });
            case 16:
              i++;
              _context4.next = 2;
              break;
            case 19:
            case "end":
              return _context4.stop();
          }
        }, _callee4);
      }));
      return function (_x2) {
        return _ref3.apply(this, arguments);
      };
    }());
  }).on('Paste', function (e) {
    if (!!pasteOnOffBtn && !pasteOnOffBtn.active()) {
      return;
    }
    var pasteOperation = PasteOperation.init(e); //.dumpClipboardData()

    if (!pasteOperation.isAsync && !pasteOperation.files.length) {
      PasteOperation.destroy();
      return;
    }
    var editorPreProcess = function editorPreProcess(e) {
      /*
      FF: Not Fired if clipboard contains file from FS
      */
      var content;
      // get html from pasteOperation
      if (content = pasteOperation.pastedContent) {
        e.content = content;
      }
      PasteOperation.destroy();
    };
    var editorPostProcess = function editorPostProcess(e) {
      setTimeout(function () {
        return editor.dom.doc.body.dispatchEvent(new Event('FilesPasted'));
      });
      editor.off('PastePreProcess', editorPreProcess);
      editor.off('PastePostProcess', editorPostProcess);
    };
    editor.once('input', /*#__PURE__*/function () {
      var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(ie) {
        var images, idx, img;
        return _regeneratorRuntime().wrap(function _callee5$(_context5) {
          while (1) switch (_context5.prev = _context5.next) {
            case 0:
              /*
              Fired in FF if clipboard contains file from FS
              */
              images = crawlPastedImages();
              if (images.length) {
                _context5.next = 3;
                break;
              }
              return _context5.abrupt("return");
            case 3:
              idx = 0;
            case 4:
              if (!(idx < images.length)) {
                _context5.next = 14;
                break;
              }
              img = images[idx];
              if (!pasteOperation.files[idx]) {
                _context5.next = 11;
                break;
              }
              img.alt = pasteOperation.files[idx].name;
              _context5.next = 10;
              return _converter.default.dataUrlToBlobUrl(img.src);
            case 10:
              img.src = _context5.sent;
            case 11:
              idx++;
              _context5.next = 4;
              break;
            case 14:
              setTimeout(function () {
                return editor.dom.doc.body.dispatchEvent(new Event('FilesPasted'));
              });
              if (images.length === pasteOperation.files.length) {
                // images already processed
                editor.off('PastePreProcess', editorPreProcess);
                editor.off('PastePostProcess', editorPostProcess);
              }
            case 16:
            case "end":
              return _context5.stop();
          }
        }, _callee5);
      }));
      return function (_x3) {
        return _ref5.apply(this, arguments);
      };
    }()).on('PastePreProcess', editorPreProcess).on('PastePostProcess', editorPostProcess);
  });
});

}).call(this)}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"converter":3,"notices":6,"uploader":7}],2:[function(require,module,exports){
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
// Compatibility with [Real Media Library](https://wordpress.org/plugins/real-media-library-lite/)
// @see https://github.com/mcguffin/the-paste/issues/47
var Supports = /*#__PURE__*/function () {
  function Supports() {
    _classCallCheck(this, Supports);
  }
  _createClass(Supports, [{
    key: "svg",
    get: function get() {
      return _wpPluploadSettings.defaults.filters.mime_types[0].extensions.split(',').includes('svg');
    }
  }, {
    key: "webp",
    get: function get() {
      return document.createElement('canvas').toDataURL('image/webp').indexOf('data:image/webp') == 0;
    }
  }]);
  return Supports;
}();
var rml = {
  file: function file(_file) {
    if (!_file.getSource) {
      // return native file object
      // mimic mOxie.Blob.getSource()
      _file.getSource = function () {
        return _file;
      };
    }
    return _file;
  }
};
var supports = new Supports();
module.exports = {
  rml: rml,
  supports: supports
};

},{}],3:[function(require,module,exports){
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
var _compat = require("compat");
var _filename = require("filename");
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator.return && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, catch: function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
var itemHandler = function itemHandler(type) {
  var _textPlain$textHtml;
  return (_textPlain$textHtml = {
    'text/plain': function () {
      var _textPlain = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(item) {
        var str, domParser;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              if (!_compat.supports.svg) {
                _context.next = 8;
                break;
              }
              _context.next = 3;
              return Converter.itemToString(item);
            case 3:
              str = _context.sent;
              if (!(str.indexOf('<svg') >= 0)) {
                _context.next = 8;
                break;
              }
              domParser = new DOMParser();
              if (!domParser.parseFromString(str, 'image/svg+xml').querySelector('svg')) {
                _context.next = 8;
                break;
              }
              return _context.abrupt("return", [Converter.stringToFile(str, 'image/svg+xml')]);
            case 8:
              return _context.abrupt("return", []);
            case 9:
            case "end":
              return _context.stop();
          }
        }, _callee);
      }));
      function textPlain(_x) {
        return _textPlain.apply(this, arguments);
      }
      return textPlain;
    }(),
    'text/html': function () {
      var _textHtml = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(item) {
        var div, imgs;
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              div = document.createElement('div');
              _context2.next = 3;
              return Converter.itemToString(item);
            case 3:
              div.innerHTML = _context2.sent;
              imgs = Array.from(div.querySelectorAll('img')).map(function (img) {
                return Converter.elementToFile(img);
              });
              return _context2.abrupt("return", new Promise(function (resolve, reject) {
                Promise.allSettled(imgs).then(function (result) {
                  return resolve(Array.from(result).map(function (promise) {
                    return promise.value;
                  }));
                });
              }));
            case 6:
            case "end":
              return _context2.stop();
          }
        }, _callee2);
      }));
      function textHtml(_x2) {
        return _textHtml.apply(this, arguments);
      }
      return textHtml;
    }(),
    'application/x-vnd.google-docs-image-clip+wrapped': function () {
      var _applicationXVndGoogleDocsImageClipWrapped = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(item) {
        return _regeneratorRuntime().wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return Converter.gdocsItemToFiles(item);
            case 2:
              return _context3.abrupt("return", _context3.sent);
            case 3:
            case "end":
              return _context3.stop();
          }
        }, _callee3);
      }));
      function applicationXVndGoogleDocsImageClipWrapped(_x3) {
        return _applicationXVndGoogleDocsImageClipWrapped.apply(this, arguments);
      }
      return applicationXVndGoogleDocsImageClipWrapped;
    }()
  }[type]) !== null && _textPlain$textHtml !== void 0 ? _textPlain$textHtml : function () {
    return new Promise(function (resolve, reject) {
      return resolve([]);
    });
  };
};
var Converter = {
  clipboardItemsToFiles: function clipboardItemsToFiles(clipboardItems) {
    var files = [];
    return new Promise(function (resolve, reject) {
      var promises = Array.from(clipboardItems).map(function (item) {
        if ('string' === item.kind) {
          var handler = itemHandler(item.type);
          return handler(item).then(function (f) {
            files.push.apply(files, _toConsumableArray(f));
          }).catch(function (err) {
            console.error(err);
          });
        }
      });
      Promise.allSettled(promises).then(function () {
        return resolve(files);
      });
    });
  },
  clipboardItemsToHtml: function () {
    var _clipboardItemsToHtml = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(clipboardItems) {
      var i, item;
      return _regeneratorRuntime().wrap(function _callee4$(_context4) {
        while (1) switch (_context4.prev = _context4.next) {
          case 0:
            i = 0;
          case 1:
            if (!(i < clipboardItems.length)) {
              _context4.next = 10;
              break;
            }
            item = clipboardItems[i];
            if (!('string' === item.kind && 'text/html' === item.type)) {
              _context4.next = 7;
              break;
            }
            _context4.next = 6;
            return Converter.itemToString(item);
          case 6:
            return _context4.abrupt("return", _context4.sent);
          case 7:
            i++;
            _context4.next = 1;
            break;
          case 10:
            return _context4.abrupt("return", '');
          case 11:
          case "end":
            return _context4.stop();
        }
      }, _callee4);
    }));
    function clipboardItemsToHtml(_x4) {
      return _clipboardItemsToHtml.apply(this, arguments);
    }
    return clipboardItemsToHtml;
  }(),
  gdocsItemToSources: function () {
    var _gdocsItemToSources = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(item) {
      return _regeneratorRuntime().wrap(function _callee6$(_context6) {
        while (1) switch (_context6.prev = _context6.next) {
          case 0:
            return _context6.abrupt("return", new Promise(function (resolve, reject) {
              item.getAsString( /*#__PURE__*/function () {
                var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(str) {
                  var src;
                  return _regeneratorRuntime().wrap(function _callee5$(_context5) {
                    while (1) switch (_context5.prev = _context5.next) {
                      case 0:
                        src = Object.values(JSON.parse(JSON.parse(str).data).image_urls);
                        resolve(src);
                      case 2:
                      case "end":
                        return _context5.stop();
                    }
                  }, _callee5);
                }));
                return function (_x6) {
                  return _ref.apply(this, arguments);
                };
              }());
            }));
          case 1:
          case "end":
            return _context6.stop();
        }
      }, _callee6);
    }));
    function gdocsItemToSources(_x5) {
      return _gdocsItemToSources.apply(this, arguments);
    }
    return gdocsItemToSources;
  }(),
  gdocsItemToFiles: function () {
    var _gdocsItemToFiles = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7(item) {
      var sources, files;
      return _regeneratorRuntime().wrap(function _callee7$(_context7) {
        while (1) switch (_context7.prev = _context7.next) {
          case 0:
            _context7.next = 2;
            return Converter.gdocsItemToSources(item);
          case 2:
            sources = _context7.sent;
            files = [];
            i = 0;
          case 5:
            if (!(i < sources.length)) {
              _context7.next = 14;
              break;
            }
            _context7.t0 = files;
            _context7.next = 9;
            return Converter.blobUrlToFile(sources[i]);
          case 9:
            _context7.t1 = _context7.sent;
            _context7.t0.push.call(_context7.t0, _context7.t1);
          case 11:
            i++;
            _context7.next = 5;
            break;
          case 14:
            return _context7.abrupt("return", files);
          case 15:
          case "end":
            return _context7.stop();
        }
      }, _callee7);
    }));
    function gdocsItemToFiles(_x7) {
      return _gdocsItemToFiles.apply(this, arguments);
    }
    return gdocsItemToFiles;
  }(),
  itemToString: function () {
    var _itemToString = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8(item) {
      return _regeneratorRuntime().wrap(function _callee8$(_context8) {
        while (1) switch (_context8.prev = _context8.next) {
          case 0:
            return _context8.abrupt("return", new Promise(function (resolve, reject) {
              item.getAsString(function (str) {
                return resolve(str);
              });
            }));
          case 1:
          case "end":
            return _context8.stop();
        }
      }, _callee8);
    }));
    function itemToString(_x8) {
      return _itemToString.apply(this, arguments);
    }
    return itemToString;
  }(),
  elementToFile: function () {
    var _elementToFile = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee9(el) {
      var file;
      return _regeneratorRuntime().wrap(function _callee9$(_context9) {
        while (1) switch (_context9.prev = _context9.next) {
          case 0:
            _context9.next = 2;
            return Converter.urlToFile(el.src, el.alt);
          case 2:
            file = _context9.sent;
            return _context9.abrupt("return", file);
          case 4:
          case "end":
            return _context9.stop();
        }
      }, _callee9);
    }));
    function elementToFile(_x9) {
      return _elementToFile.apply(this, arguments);
    }
    return elementToFile;
  }(),
  urlToFile: function () {
    var _urlToFile = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee10(url) {
      var filename,
        file,
        schema,
        _args10 = arguments;
      return _regeneratorRuntime().wrap(function _callee10$(_context10) {
        while (1) switch (_context10.prev = _context10.next) {
          case 0:
            filename = _args10.length > 1 && _args10[1] !== undefined ? _args10[1] : '';
            schema = url.substr(0, url.indexOf(':'));
            if (!('data' === schema)) {
              _context10.next = 6;
              break;
            }
            file = Converter.dataUrlToFile(url, filename);
            _context10.next = 10;
            break;
          case 6:
            if (!['blob', 'http', 'https'].includes(schema)) {
              _context10.next = 10;
              break;
            }
            _context10.next = 9;
            return Converter.blobUrlToFile(url, filename);
          case 9:
            file = _context10.sent;
          case 10:
            return _context10.abrupt("return", file);
          case 11:
          case "end":
            return _context10.stop();
        }
      }, _callee10);
    }));
    function urlToFile(_x10) {
      return _urlToFile.apply(this, arguments);
    }
    return urlToFile;
  }(),
  urlToMime: function () {
    var _urlToMime = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee11(url) {
      var schema, mime;
      return _regeneratorRuntime().wrap(function _callee11$(_context11) {
        while (1) switch (_context11.prev = _context11.next) {
          case 0:
            schema = url.substr(0, url.indexOf(':'));
            if (!('data' === schema)) {
              _context11.next = 5;
              break;
            }
            mime = Converter.dataUrlToMime(url);
            _context11.next = 9;
            break;
          case 5:
            if (!['blob', 'http', 'https'].includes(schema)) {
              _context11.next = 9;
              break;
            }
            _context11.next = 8;
            return Converter.blobUrlToMime(url);
          case 8:
            mime = _context11.sent;
          case 9:
            return _context11.abrupt("return", mime);
          case 10:
          case "end":
            return _context11.stop();
        }
      }, _callee11);
    }));
    function urlToMime(_x11) {
      return _urlToMime.apply(this, arguments);
    }
    return urlToMime;
  }(),
  urlToType: function () {
    var _urlToType = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee12(url) {
      var mime;
      return _regeneratorRuntime().wrap(function _callee12$(_context12) {
        while (1) switch (_context12.prev = _context12.next) {
          case 0:
            _context12.next = 2;
            return Converter.urlToMime(url);
          case 2:
            mime = _context12.sent;
            return _context12.abrupt("return", mime.substr(0, mime.indexOf('/')));
          case 4:
          case "end":
            return _context12.stop();
        }
      }, _callee12);
    }));
    function urlToType(_x12) {
      return _urlToType.apply(this, arguments);
    }
    return urlToType;
  }(),
  urlToBlobUrl: function () {
    var _urlToBlobUrl = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee13(url) {
      var file;
      return _regeneratorRuntime().wrap(function _callee13$(_context13) {
        while (1) switch (_context13.prev = _context13.next) {
          case 0:
            _context13.next = 2;
            return Converter.blobUrlToFile(url);
          case 2:
            file = _context13.sent;
            return _context13.abrupt("return", Converter.fileToBlobUrl(file));
          case 4:
          case "end":
            return _context13.stop();
        }
      }, _callee13);
    }));
    function urlToBlobUrl(_x13) {
      return _urlToBlobUrl.apply(this, arguments);
    }
    return urlToBlobUrl;
  }(),
  stringToFile: function stringToFile(str, type) {
    return Converter.blobToFile(new Blob([str], {
      type: type
    }));
  },
  blobToFile: function blobToFile(blob) {
    var filename = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
    return new File([blob], (0, _filename.safeFilename)(blob, filename), {
      type: blob.type
    });
  },
  blobUrlToMime: function () {
    var _blobUrlToMime = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee14(blobUrl) {
      var blob;
      return _regeneratorRuntime().wrap(function _callee14$(_context14) {
        while (1) switch (_context14.prev = _context14.next) {
          case 0:
            _context14.next = 2;
            return Converter.blobUrlToBlob(blobUrl);
          case 2:
            blob = _context14.sent;
            return _context14.abrupt("return", blob.type);
          case 4:
          case "end":
            return _context14.stop();
        }
      }, _callee14);
    }));
    function blobUrlToMime(_x14) {
      return _blobUrlToMime.apply(this, arguments);
    }
    return blobUrlToMime;
  }(),
  blobUrlToType: function () {
    var _blobUrlToType = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee15(blobUrl) {
      var blob;
      return _regeneratorRuntime().wrap(function _callee15$(_context15) {
        while (1) switch (_context15.prev = _context15.next) {
          case 0:
            _context15.next = 2;
            return Converter.blobUrlToBlob(blobUrl);
          case 2:
            blob = _context15.sent;
            return _context15.abrupt("return", blob.type.substr(0, blob.type.indexOf('/')));
          case 4:
          case "end":
            return _context15.stop();
        }
      }, _callee15);
    }));
    function blobUrlToType(_x15) {
      return _blobUrlToType.apply(this, arguments);
    }
    return blobUrlToType;
  }(),
  blobUrlToBlob: function () {
    var _blobUrlToBlob = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee16(blobUrl) {
      var filename,
        blob,
        _args16 = arguments;
      return _regeneratorRuntime().wrap(function _callee16$(_context16) {
        while (1) switch (_context16.prev = _context16.next) {
          case 0:
            filename = _args16.length > 1 && _args16[1] !== undefined ? _args16[1] : '';
            _context16.next = 3;
            return fetch(blobUrl).then(function (r) {
              return r.blob();
            });
          case 3:
            blob = _context16.sent;
            return _context16.abrupt("return", blob);
          case 5:
          case "end":
            return _context16.stop();
        }
      }, _callee16);
    }));
    function blobUrlToBlob(_x16) {
      return _blobUrlToBlob.apply(this, arguments);
    }
    return blobUrlToBlob;
  }(),
  blobUrlToFile: function () {
    var _blobUrlToFile = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee17(blobUrl) {
      var filename,
        blob,
        _args17 = arguments;
      return _regeneratorRuntime().wrap(function _callee17$(_context17) {
        while (1) switch (_context17.prev = _context17.next) {
          case 0:
            filename = _args17.length > 1 && _args17[1] !== undefined ? _args17[1] : '';
            _context17.next = 3;
            return Converter.blobUrlToBlob(blobUrl);
          case 3:
            blob = _context17.sent;
            return _context17.abrupt("return", Converter.blobToFile(blob, filename));
          case 5:
          case "end":
            return _context17.stop();
        }
      }, _callee17);
    }));
    function blobUrlToFile(_x17) {
      return _blobUrlToFile.apply(this, arguments);
    }
    return blobUrlToFile;
  }(),
  blobUrlToDataUrl: function () {
    var _blobUrlToDataUrl = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee18(blobUrl) {
      var blob, dataurl;
      return _regeneratorRuntime().wrap(function _callee18$(_context18) {
        while (1) switch (_context18.prev = _context18.next) {
          case 0:
            _context18.next = 2;
            return fetch(blobUrl).then(function (r) {
              return r.blob();
            });
          case 2:
            blob = _context18.sent;
            _context18.next = 5;
            return Converter.fileToDataUrl(blob);
          case 5:
            dataurl = _context18.sent;
            return _context18.abrupt("return", dataurl);
          case 7:
          case "end":
            return _context18.stop();
        }
      }, _callee18);
    }));
    function blobUrlToDataUrl(_x18) {
      return _blobUrlToDataUrl.apply(this, arguments);
    }
    return blobUrlToDataUrl;
  }(),
  dataUrlToMime: function dataUrlToMime(dataurl) {
    return dataurl.match('data:([^;]+);')[1];
  },
  dataUrlToType: function dataUrlToType(dataurl) {
    return dataurl.match('data:([^\/]+)\/')[1];
  },
  dataUrlToBlob: function dataUrlToBlob(dataurl) {
    var arr = dataurl.split(','),
      type = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], {
      type: type
    });
  },
  dataUrlToFile: function dataUrlToFile(dataurl) {
    var filename = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
    return Converter.blobToFile(Converter.dataUrlToBlob(dataurl), filename);
  },
  dataUrlToBlobUrl: function dataUrlToBlobUrl(dataurl) {
    return Converter.fileToBlobUrl(Converter.dataUrlToBlob(dataurl));
  },
  fileToBlobUrl: function fileToBlobUrl(file) {
    return URL.createObjectURL(file);
  },
  fileToDataUrl: function fileToDataUrl(file) {
    return new Promise(function (resolve, reject) {
      var fr = new FileReader();
      fr.addEventListener('load', function () {
        return resolve(fr.result);
      });
      fr.readAsDataURL(file);
    });
  }
};
module.exports = Converter;

},{"compat":2,"filename":4}],4:[function(require,module,exports){
"use strict";

var _mime = _interopRequireDefault(require("mime"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/**
 *	Generate a filename
 */
var generateFilename = function generateFilename(suffix) {
  var _document$querySelect, _document$querySelect2, _document$querySelect3;
  var zerofill = function zerofill(n) {
    var len = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;
    return ('00' + n.toString()).substr(-len);
  };
  var name = thepaste.options.default_filename;
  var now = new Date(),
    postname = ((_document$querySelect = document.querySelector('#post [name="post_title"]#title')) === null || _document$querySelect === void 0 ? void 0 : _document$querySelect.value) || ((_document$querySelect2 = document.querySelector('.wp-block-post-title')) === null || _document$querySelect2 === void 0 ? void 0 : _document$querySelect2.textContent) || ((_document$querySelect3 = document.querySelector('h1')) === null || _document$querySelect3 === void 0 ? void 0 : _document$querySelect3.textContent),
    replace_values = thepaste.options.filename_values,
    // username = document.querySelector('.display-name')?.textContent,
    map = [{
      s: '%Y',
      r: now.getFullYear()
    }, {
      s: '%y',
      r: now.getFullYear() % 100
    }, {
      s: '%m',
      r: zerofill(now.getMonth() + 1)
    }, {
      s: '%d',
      r: zerofill(now.getDate())
    }, {
      s: '%e',
      r: now.getDate()
    }, {
      s: '%H',
      r: zerofill(now.getHours())
    }, {
      s: '%I',
      r: zerofill(now.getHours() % 12)
    }, {
      s: '%M',
      r: zerofill(now.getMinutes())
    }, {
      s: '%S',
      r: zerofill(now.getSeconds())
    }, {
      s: '%s',
      r: Math.floor(now.getTime() / 1000)
    }, {
      s: '%x',
      r: now.toLocaleDateString()
    }, {
      s: '%X',
      r: now.toLocaleTimeString()
    }];
  if ('undefined' !== typeof postname) {
    map.push({
      s: '<postname>',
      r: postname
    });
  } else {
    map.push({
      s: '<postname>',
      r: ''
    });
  }
  Object.keys(replace_values).forEach(function (k) {
    if (!!replace_values[k]) {
      map.push({
        s: "<".concat(k, ">"),
        r: replace_values[k]
      });
    } else {
      map.push({
        s: "<".concat(k, ">"),
        r: ''
      });
    }
  });
  map.forEach(function (el) {
    name = name.replace(el.s, el.r);
  });
  if ('string' === typeof suffix) {
    name += '.' + suffix;
  }
  return name;
};
var safeFilename = function safeFilename(file) {
  var filename = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  var type = file.type;
  var suffix = _mime.default.extension(type);
  filename = filename.replace(/(?:[\0-\x1F\x7F-\x9F\xAD\u0378\u0379\u0380-\u0383\u038B\u038D\u03A2\u0530\u0557\u0558\u058B\u058C\u0590\u05C8-\u05CF\u05EB-\u05EE\u05F5-\u0605\u061C\u06DD\u070E\u070F\u074B\u074C\u07B2-\u07BF\u07FB\u07FC\u082E\u082F\u083F\u085C\u085D\u085F\u086B-\u086F\u088F-\u0897\u08E2\u0984\u098D\u098E\u0991\u0992\u09A9\u09B1\u09B3-\u09B5\u09BA\u09BB\u09C5\u09C6\u09C9\u09CA\u09CF-\u09D6\u09D8-\u09DB\u09DE\u09E4\u09E5\u09FF\u0A00\u0A04\u0A0B-\u0A0E\u0A11\u0A12\u0A29\u0A31\u0A34\u0A37\u0A3A\u0A3B\u0A3D\u0A43-\u0A46\u0A49\u0A4A\u0A4E-\u0A50\u0A52-\u0A58\u0A5D\u0A5F-\u0A65\u0A77-\u0A80\u0A84\u0A8E\u0A92\u0AA9\u0AB1\u0AB4\u0ABA\u0ABB\u0AC6\u0ACA\u0ACE\u0ACF\u0AD1-\u0ADF\u0AE4\u0AE5\u0AF2-\u0AF8\u0B00\u0B04\u0B0D\u0B0E\u0B11\u0B12\u0B29\u0B31\u0B34\u0B3A\u0B3B\u0B45\u0B46\u0B49\u0B4A\u0B4E-\u0B54\u0B58-\u0B5B\u0B5E\u0B64\u0B65\u0B78-\u0B81\u0B84\u0B8B-\u0B8D\u0B91\u0B96-\u0B98\u0B9B\u0B9D\u0BA0-\u0BA2\u0BA5-\u0BA7\u0BAB-\u0BAD\u0BBA-\u0BBD\u0BC3-\u0BC5\u0BC9\u0BCE\u0BCF\u0BD1-\u0BD6\u0BD8-\u0BE5\u0BFB-\u0BFF\u0C0D\u0C11\u0C29\u0C3A\u0C3B\u0C45\u0C49\u0C4E-\u0C54\u0C57\u0C5B\u0C5C\u0C5E\u0C5F\u0C64\u0C65\u0C70-\u0C76\u0C8D\u0C91\u0CA9\u0CB4\u0CBA\u0CBB\u0CC5\u0CC9\u0CCE-\u0CD4\u0CD7-\u0CDC\u0CDF\u0CE4\u0CE5\u0CF0\u0CF4-\u0CFF\u0D0D\u0D11\u0D45\u0D49\u0D50-\u0D53\u0D64\u0D65\u0D80\u0D84\u0D97-\u0D99\u0DB2\u0DBC\u0DBE\u0DBF\u0DC7-\u0DC9\u0DCB-\u0DCE\u0DD5\u0DD7\u0DE0-\u0DE5\u0DF0\u0DF1\u0DF5-\u0E00\u0E3B-\u0E3E\u0E5C-\u0E80\u0E83\u0E85\u0E8B\u0EA4\u0EA6\u0EBE\u0EBF\u0EC5\u0EC7\u0ECF\u0EDA\u0EDB\u0EE0-\u0EFF\u0F48\u0F6D-\u0F70\u0F98\u0FBD\u0FCD\u0FDB-\u0FFF\u10C6\u10C8-\u10CC\u10CE\u10CF\u1249\u124E\u124F\u1257\u1259\u125E\u125F\u1289\u128E\u128F\u12B1\u12B6\u12B7\u12BF\u12C1\u12C6\u12C7\u12D7\u1311\u1316\u1317\u135B\u135C\u137D-\u137F\u139A-\u139F\u13F6\u13F7\u13FE\u13FF\u169D-\u169F\u16F9-\u16FF\u1716-\u171E\u1737-\u173F\u1754-\u175F\u176D\u1771\u1774-\u177F\u17DE\u17DF\u17EA-\u17EF\u17FA-\u17FF\u180E\u181A-\u181F\u1879-\u187F\u18AB-\u18AF\u18F6-\u18FF\u191F\u192C-\u192F\u193C-\u193F\u1941-\u1943\u196E\u196F\u1975-\u197F\u19AC-\u19AF\u19CA-\u19CF\u19DB-\u19DD\u1A1C\u1A1D\u1A5F\u1A7D\u1A7E\u1A8A-\u1A8F\u1A9A-\u1A9F\u1AAE\u1AAF\u1ACF-\u1AFF\u1B4D-\u1B4F\u1B7F\u1BF4-\u1BFB\u1C38-\u1C3A\u1C4A-\u1C4C\u1C89-\u1C8F\u1CBB\u1CBC\u1CC8-\u1CCF\u1CFB-\u1CFF\u1F16\u1F17\u1F1E\u1F1F\u1F46\u1F47\u1F4E\u1F4F\u1F58\u1F5A\u1F5C\u1F5E\u1F7E\u1F7F\u1FB5\u1FC5\u1FD4\u1FD5\u1FDC\u1FF0\u1FF1\u1FF5\u1FFF\u200B-\u200F\u2028-\u202E\u2060-\u206F\u2072\u2073\u208F\u209D-\u209F\u20C1-\u20CF\u20F1-\u20FF\u218C-\u218F\u2427-\u243F\u244B-\u245F\u2B74\u2B75\u2B96\u2CF4-\u2CF8\u2D26\u2D28-\u2D2C\u2D2E\u2D2F\u2D68-\u2D6E\u2D71-\u2D7E\u2D97-\u2D9F\u2DA7\u2DAF\u2DB7\u2DBF\u2DC7\u2DCF\u2DD7\u2DDF\u2E5E-\u2E7F\u2E9A\u2EF4-\u2EFF\u2FD6-\u2FEF\u2FFC-\u2FFF\u3040\u3097\u3098\u3100-\u3104\u3130\u318F\u31E4-\u31EF\u321F\uA48D-\uA48F\uA4C7-\uA4CF\uA62C-\uA63F\uA6F8-\uA6FF\uA7CB-\uA7CF\uA7D2\uA7D4\uA7DA-\uA7F1\uA82D-\uA82F\uA83A-\uA83F\uA878-\uA87F\uA8C6-\uA8CD\uA8DA-\uA8DF\uA954-\uA95E\uA97D-\uA97F\uA9CE\uA9DA-\uA9DD\uA9FF\uAA37-\uAA3F\uAA4E\uAA4F\uAA5A\uAA5B\uAAC3-\uAADA\uAAF7-\uAB00\uAB07\uAB08\uAB0F\uAB10\uAB17-\uAB1F\uAB27\uAB2F\uAB6C-\uAB6F\uABEE\uABEF\uABFA-\uABFF\uD7A4-\uD7AF\uD7C7-\uD7CA\uD7FC-\uD7FF\uE000-\uF8FF\uFA6E\uFA6F\uFADA-\uFAFF\uFB07-\uFB12\uFB18-\uFB1C\uFB37\uFB3D\uFB3F\uFB42\uFB45\uFBC3-\uFBD2\uFD90\uFD91\uFDC8-\uFDCE\uFDD0-\uFDEF\uFE1A-\uFE1F\uFE53\uFE67\uFE6C-\uFE6F\uFE75\uFEFD-\uFF00\uFFBF-\uFFC1\uFFC8\uFFC9\uFFD0\uFFD1\uFFD8\uFFD9\uFFDD-\uFFDF\uFFE7\uFFEF-\uFFFB\uFFFE\uFFFF]|\uD800[\uDC0C\uDC27\uDC3B\uDC3E\uDC4E\uDC4F\uDC5E-\uDC7F\uDCFB-\uDCFF\uDD03-\uDD06\uDD34-\uDD36\uDD8F\uDD9D-\uDD9F\uDDA1-\uDDCF\uDDFE-\uDE7F\uDE9D-\uDE9F\uDED1-\uDEDF\uDEFC-\uDEFF\uDF24-\uDF2C\uDF4B-\uDF4F\uDF7B-\uDF7F\uDF9E\uDFC4-\uDFC7\uDFD6-\uDFFF]|\uD801[\uDC9E\uDC9F\uDCAA-\uDCAF\uDCD4-\uDCD7\uDCFC-\uDCFF\uDD28-\uDD2F\uDD64-\uDD6E\uDD7B\uDD8B\uDD93\uDD96\uDDA2\uDDB2\uDDBA\uDDBD-\uDDFF\uDF37-\uDF3F\uDF56-\uDF5F\uDF68-\uDF7F\uDF86\uDFB1\uDFBB-\uDFFF]|\uD802[\uDC06\uDC07\uDC09\uDC36\uDC39-\uDC3B\uDC3D\uDC3E\uDC56\uDC9F-\uDCA6\uDCB0-\uDCDF\uDCF3\uDCF6-\uDCFA\uDD1C-\uDD1E\uDD3A-\uDD3E\uDD40-\uDD7F\uDDB8-\uDDBB\uDDD0\uDDD1\uDE04\uDE07-\uDE0B\uDE14\uDE18\uDE36\uDE37\uDE3B-\uDE3E\uDE49-\uDE4F\uDE59-\uDE5F\uDEA0-\uDEBF\uDEE7-\uDEEA\uDEF7-\uDEFF\uDF36-\uDF38\uDF56\uDF57\uDF73-\uDF77\uDF92-\uDF98\uDF9D-\uDFA8\uDFB0-\uDFFF]|\uD803[\uDC49-\uDC7F\uDCB3-\uDCBF\uDCF3-\uDCF9\uDD28-\uDD2F\uDD3A-\uDE5F\uDE7F\uDEAA\uDEAE\uDEAF\uDEB2-\uDEFC\uDF28-\uDF2F\uDF5A-\uDF6F\uDF8A-\uDFAF\uDFCC-\uDFDF\uDFF7-\uDFFF]|\uD804[\uDC4E-\uDC51\uDC76-\uDC7E\uDCBD\uDCC3-\uDCCF\uDCE9-\uDCEF\uDCFA-\uDCFF\uDD35\uDD48-\uDD4F\uDD77-\uDD7F\uDDE0\uDDF5-\uDDFF\uDE12\uDE42-\uDE7F\uDE87\uDE89\uDE8E\uDE9E\uDEAA-\uDEAF\uDEEB-\uDEEF\uDEFA-\uDEFF\uDF04\uDF0D\uDF0E\uDF11\uDF12\uDF29\uDF31\uDF34\uDF3A\uDF45\uDF46\uDF49\uDF4A\uDF4E\uDF4F\uDF51-\uDF56\uDF58-\uDF5C\uDF64\uDF65\uDF6D-\uDF6F\uDF75-\uDFFF]|\uD805[\uDC5C\uDC62-\uDC7F\uDCC8-\uDCCF\uDCDA-\uDD7F\uDDB6\uDDB7\uDDDE-\uDDFF\uDE45-\uDE4F\uDE5A-\uDE5F\uDE6D-\uDE7F\uDEBA-\uDEBF\uDECA-\uDEFF\uDF1B\uDF1C\uDF2C-\uDF2F\uDF47-\uDFFF]|\uD806[\uDC3C-\uDC9F\uDCF3-\uDCFE\uDD07\uDD08\uDD0A\uDD0B\uDD14\uDD17\uDD36\uDD39\uDD3A\uDD47-\uDD4F\uDD5A-\uDD9F\uDDA8\uDDA9\uDDD8\uDDD9\uDDE5-\uDDFF\uDE48-\uDE4F\uDEA3-\uDEAF\uDEF9-\uDEFF\uDF0A-\uDFFF]|\uD807[\uDC09\uDC37\uDC46-\uDC4F\uDC6D-\uDC6F\uDC90\uDC91\uDCA8\uDCB7-\uDCFF\uDD07\uDD0A\uDD37-\uDD39\uDD3B\uDD3E\uDD48-\uDD4F\uDD5A-\uDD5F\uDD66\uDD69\uDD8F\uDD92\uDD99-\uDD9F\uDDAA-\uDEDF\uDEF9-\uDEFF\uDF11\uDF3B-\uDF3D\uDF5A-\uDFAF\uDFB1-\uDFBF\uDFF2-\uDFFE]|\uD808[\uDF9A-\uDFFF]|\uD809[\uDC6F\uDC75-\uDC7F\uDD44-\uDFFF]|[\uD80A\uD80E-\uD810\uD812-\uD819\uD824-\uD82A\uD82D\uD82E\uD830-\uD832\uD83F\uD87B-\uD87D\uD87F\uD889-\uDB3F\uDB41-\uDBFF][\uDC00-\uDFFF]|\uD80B[\uDC00-\uDF8F\uDFF3-\uDFFF]|\uD80D[\uDC30-\uDC3F\uDC56-\uDFFF]|\uD811[\uDE47-\uDFFF]|\uD81A[\uDE39-\uDE3F\uDE5F\uDE6A-\uDE6D\uDEBF\uDECA-\uDECF\uDEEE\uDEEF\uDEF6-\uDEFF\uDF46-\uDF4F\uDF5A\uDF62\uDF78-\uDF7C\uDF90-\uDFFF]|\uD81B[\uDC00-\uDE3F\uDE9B-\uDEFF\uDF4B-\uDF4E\uDF88-\uDF8E\uDFA0-\uDFDF\uDFE5-\uDFEF\uDFF2-\uDFFF]|\uD821[\uDFF8-\uDFFF]|\uD823[\uDCD6-\uDCFF\uDD09-\uDFFF]|\uD82B[\uDC00-\uDFEF\uDFF4\uDFFC\uDFFF]|\uD82C[\uDD23-\uDD31\uDD33-\uDD4F\uDD53\uDD54\uDD56-\uDD63\uDD68-\uDD6F\uDEFC-\uDFFF]|\uD82F[\uDC6B-\uDC6F\uDC7D-\uDC7F\uDC89-\uDC8F\uDC9A\uDC9B\uDCA0-\uDFFF]|\uD833[\uDC00-\uDEFF\uDF2E\uDF2F\uDF47-\uDF4F\uDFC4-\uDFFF]|\uD834[\uDCF6-\uDCFF\uDD27\uDD28\uDD73-\uDD7A\uDDEB-\uDDFF\uDE46-\uDEBF\uDED4-\uDEDF\uDEF4-\uDEFF\uDF57-\uDF5F\uDF79-\uDFFF]|\uD835[\uDC55\uDC9D\uDCA0\uDCA1\uDCA3\uDCA4\uDCA7\uDCA8\uDCAD\uDCBA\uDCBC\uDCC4\uDD06\uDD0B\uDD0C\uDD15\uDD1D\uDD3A\uDD3F\uDD45\uDD47-\uDD49\uDD51\uDEA6\uDEA7\uDFCC\uDFCD]|\uD836[\uDE8C-\uDE9A\uDEA0\uDEB0-\uDFFF]|\uD837[\uDC00-\uDEFF\uDF1F-\uDF24\uDF2B-\uDFFF]|\uD838[\uDC07\uDC19\uDC1A\uDC22\uDC25\uDC2B-\uDC2F\uDC6E-\uDC8E\uDC90-\uDCFF\uDD2D-\uDD2F\uDD3E\uDD3F\uDD4A-\uDD4D\uDD50-\uDE8F\uDEAF-\uDEBF\uDEFA-\uDEFE\uDF00-\uDFFF]|\uD839[\uDC00-\uDCCF\uDCFA-\uDFDF\uDFE7\uDFEC\uDFEF\uDFFF]|\uD83A[\uDCC5\uDCC6\uDCD7-\uDCFF\uDD4C-\uDD4F\uDD5A-\uDD5D\uDD60-\uDFFF]|\uD83B[\uDC00-\uDC70\uDCB5-\uDD00\uDD3E-\uDDFF\uDE04\uDE20\uDE23\uDE25\uDE26\uDE28\uDE33\uDE38\uDE3A\uDE3C-\uDE41\uDE43-\uDE46\uDE48\uDE4A\uDE4C\uDE50\uDE53\uDE55\uDE56\uDE58\uDE5A\uDE5C\uDE5E\uDE60\uDE63\uDE65\uDE66\uDE6B\uDE73\uDE78\uDE7D\uDE7F\uDE8A\uDE9C-\uDEA0\uDEA4\uDEAA\uDEBC-\uDEEF\uDEF2-\uDFFF]|\uD83C[\uDC2C-\uDC2F\uDC94-\uDC9F\uDCAF\uDCB0\uDCC0\uDCD0\uDCF6-\uDCFF\uDDAE-\uDDE5\uDE03-\uDE0F\uDE3C-\uDE3F\uDE49-\uDE4F\uDE52-\uDE5F\uDE66-\uDEFF]|\uD83D[\uDED8-\uDEDB\uDEED-\uDEEF\uDEFD-\uDEFF\uDF77-\uDF7A\uDFDA-\uDFDF\uDFEC-\uDFEF\uDFF1-\uDFFF]|\uD83E[\uDC0C-\uDC0F\uDC48-\uDC4F\uDC5A-\uDC5F\uDC88-\uDC8F\uDCAE\uDCAF\uDCB2-\uDCFF\uDE54-\uDE5F\uDE6E\uDE6F\uDE7D-\uDE7F\uDE89-\uDE8F\uDEBE\uDEC6-\uDECD\uDEDC-\uDEDF\uDEE9-\uDEEF\uDEF9-\uDEFF\uDF93\uDFCB-\uDFEF\uDFFA-\uDFFF]|\uD869[\uDEE0-\uDEFF]|\uD86D[\uDF3A-\uDF3F]|\uD86E[\uDC1E\uDC1F]|\uD873[\uDEA2-\uDEAF]|\uD87A[\uDFE1-\uDFFF]|\uD87E[\uDE1E-\uDFFF]|\uD884[\uDF4B-\uDF4F]|\uD888[\uDFB0-\uDFFF]|\uDB40[\uDC00-\uDCFF\uDDF0-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])/g, '-').trim();
  if (!filename) {
    filename = generateFilename(suffix);
  }
  if (suffix !== filename.split('.').pop()) {
    filename += ".".concat(suffix);
  }
  return filename;
};
module.exports = {
  generateFilename: generateFilename,
  safeFilename: safeFilename
};

},{"mime":5}],5:[function(require,module,exports){
"use strict";

var exts = Object.keys(thepaste.options.mime_types);
var types = Object.values(thepaste.options.mime_types);

// windows
exts.push('zip');
types.push('application/x-zip-compressed');
module.exports = {
  extension: function extension(type) {
    var idx = types.indexOf(type);
    return -1 !== idx ? exts[idx] : false;
  },
  type: function type(ext) {
    var idx = exts.indexOf(ext);
    return -1 !== idx ? types[idx] : false;
  }
};

},{}],6:[function(require,module,exports){
(function (global){(function (){
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
var _jquery = _interopRequireDefault((typeof window !== "undefined" ? window['jQuery'] : typeof global !== "undefined" ? global['jQuery'] : null));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _classStaticPrivateMethodGet(receiver, classConstructor, method) { _classCheckPrivateStaticAccess(receiver, classConstructor); return method; }
function _classCheckPrivateStaticAccess(receiver, classConstructor) { if (receiver !== classConstructor) { throw new TypeError("Private static access of wrong provenance"); } }
var Notices = /*#__PURE__*/function () {
  function Notices() {
    _classCallCheck(this, Notices);
  }
  _createClass(Notices, null, [{
    key: "success",
    value: function success(message) {
      var dismissible = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      _classStaticPrivateMethodGet(Notices, Notices, _addNotice).call(Notices, 'updated', message, dismissible);
    }
  }, {
    key: "notify",
    value: function notify(message) {
      var dismissible = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      _classStaticPrivateMethodGet(Notices, Notices, _addNotice).call(Notices, '', message, dismissible);
    }
  }, {
    key: "warn",
    value: function warn(message) {
      var dismissible = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      _classStaticPrivateMethodGet(Notices, Notices, _addNotice).call(Notices, 'notice-warning', message, dismissible);
    }
  }, {
    key: "error",
    value: function error(message) {
      var dismissible = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      _classStaticPrivateMethodGet(Notices, Notices, _addNotice).call(Notices, 'error', message, dismissible);
    }
  }]);
  return Notices;
}();
function _addNotice(type, message) {
  var dismissible = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  var classes = "".concat(type, " notice ").concat(dismissible ? 'is-dismissible' : '').trim();
  var html = "<div class=\"".concat(classes, "\"><p>").concat(message, "</p></div>");
  var $headerEnd = (0, _jquery.default)('.wp-header-end').first();
  (0, _jquery.default)(html).insertAfter($headerEnd);
  (0, _jquery.default)(document).trigger('wp-updates-notice-added');
}
var _dismissButton = {
  writable: true,
  value: "<button type=\"button\" class=\"notice-dismiss\"><span class=\"screen-reader-text\">".concat(wp.i18n.__('Dismiss this notice.'), "</span></button>")
};
module.exports = Notices;

}).call(this)}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],7:[function(require,module,exports){
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
var _mime = _interopRequireDefault(require("mime"));
var _converter = _interopRequireDefault(require("converter"));
var _notices = _interopRequireDefault(require("notices"));
var _compat = require("compat");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator.return && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, catch: function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _classPrivateMethodInitSpec(obj, privateSet) { _checkPrivateRedeclaration(obj, privateSet); privateSet.add(obj); }
function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }
function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set"); _classApplyDescriptorSet(receiver, descriptor, value); return value; }
function _classStaticPrivateFieldSpecSet(receiver, classConstructor, descriptor, value) { _classCheckPrivateStaticAccess(receiver, classConstructor); _classCheckPrivateStaticFieldDescriptor(descriptor, "set"); _classApplyDescriptorSet(receiver, descriptor, value); return value; }
function _classApplyDescriptorSet(receiver, descriptor, value) { if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } }
function _classStaticPrivateFieldSpecGet(receiver, classConstructor, descriptor) { _classCheckPrivateStaticAccess(receiver, classConstructor); _classCheckPrivateStaticFieldDescriptor(descriptor, "get"); return _classApplyDescriptorGet(receiver, descriptor); }
function _classCheckPrivateStaticFieldDescriptor(descriptor, action) { if (descriptor === undefined) { throw new TypeError("attempted to " + action + " private static field before its declaration"); } }
function _classCheckPrivateStaticAccess(receiver, classConstructor) { if (receiver !== classConstructor) { throw new TypeError("Private static access of wrong provenance"); } }
function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }
function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }
function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }
function _classPrivateMethodGet(receiver, privateSet, fn) { if (!privateSet.has(receiver)) { throw new TypeError("attempted to get private field on non-instance"); } return fn; }
var allowedExtensions = _wpPluploadSettings.defaults.filters.mime_types[0].extensions.split(',');
var maxFileSize = Math.min(1024 * 1024 * 200, parseInt(_wpPluploadSettings.defaults.filters.max_file_size)); // 100MB or uplaod max filesize

var sizeAllowed = function sizeAllowed(file) {
  return !!file && file.size <= maxFileSize;
};
var extensionAllowed = function extensionAllowed(file) {
  return !!file && allowedExtensions.includes(_mime.default.extension(file.type));
};
var _file = /*#__PURE__*/new WeakMap();
var _progressHandler = /*#__PURE__*/new WeakMap();
var _uploadedHandler = /*#__PURE__*/new WeakMap();
var _errorHandler = /*#__PURE__*/new WeakMap();
var _isitMe = /*#__PURE__*/new WeakSet();
var WPUploader = /*#__PURE__*/function () {
  function WPUploader(file) {
    var _this = this;
    _classCallCheck(this, WPUploader);
    _classPrivateMethodInitSpec(this, _isitMe);
    _defineProperty(this, "onUploaded", function () {});
    _defineProperty(this, "onProgress", function () {});
    _defineProperty(this, "onError", function () {});
    _classPrivateFieldInitSpec(this, _file, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldInitSpec(this, _progressHandler, {
      writable: true,
      value: function value(up, args) {
        if (_classPrivateMethodGet(_this, _isitMe, _isitMe2).call(_this, args)) {
          _this.onProgress(args.percent);
        }
      }
    });
    _classPrivateFieldInitSpec(this, _uploadedHandler, {
      writable: true,
      value: function value(up, args, response) {
        if (_classPrivateMethodGet(_this, _isitMe, _isitMe2).call(_this, args)) {
          _this.onUploaded(args);
        }
      }
    });
    _classPrivateFieldInitSpec(this, _errorHandler, {
      writable: true,
      value: function value(up, args) {
        var c = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
        if (_classPrivateMethodGet(_this, _isitMe, _isitMe2).call(_this, args)) {
          _this.onError(args);
        }
      }
    });
    // sanitize file
    if (!file.name) {
      file.name = Uploader.getFilename(_mime.default.extension(file.type));
    }
    _classPrivateFieldSet(this, _file, _compat.rml.file(file));
    WPUploader.uploader.bind('UploadProgress', _classPrivateFieldGet(this, _progressHandler), this);
    WPUploader.uploader.bind('FileUploaded', _classPrivateFieldGet(this, _uploadedHandler), this);
    WPUploader.uploader.bind('Error', _classPrivateFieldGet(this, _errorHandler), this);
  }
  _createClass(WPUploader, [{
    key: "destructor",
    value: function destructor() {
      WPUploader.uploader.unbind('UploadProgress', _classPrivateFieldGet(this, _progressHandler), this);
      WPUploader.uploader.unbind('FileUploaded', _classPrivateFieldGet(this, _uploadedHandler), this);
      WPUploader.uploader.unbind('Error', _classPrivateFieldGet(this, _errorHandler), this);
    }
  }, {
    key: "upload",
    value: function upload() {
      var _this2 = this;
      if (WPUploader.ready) {
        WPUploader.uploader.addFile(_classPrivateFieldGet(this, _file));
      } else {
        WPUploader.workflow.once('uploader:ready', function () {
          WPUploader.uploader.addFile(_classPrivateFieldGet(_this2, _file));
        });
      }
    }
  }, {
    key: "dump",
    value: function dump() {
      console.log(arguments);
    }
  }], [{
    key: "ready",
    get: function get() {
      return !!WPUploader.workflow.uploader.uploader && !!WPUploader.workflow.uploader.uploader.ready;
    }
  }, {
    key: "workflow",
    get: function get() {
      if (!_classStaticPrivateFieldSpecGet(WPUploader, WPUploader, _workflow)) {
        _classStaticPrivateFieldSpecSet(WPUploader, WPUploader, _workflow, wp.media.editor.open(window.wpActiveEditor, {
          frame: 'post',
          state: 'insert',
          title: thepaste.l10n.copy_paste,
          multiple: false
        }).close());
      }
      return _classStaticPrivateFieldSpecGet(WPUploader, WPUploader, _workflow);
    }
  }, {
    key: "uploader",
    get: function get() {
      return WPUploader.workflow.uploader.uploader.uploader;
    }
  }, {
    key: "get",
    value: function get(file) {
      return new WPUploader(file);
    }
  }]);
  return WPUploader;
}();
function _isitMe2(args) {
  return _classPrivateFieldGet(this, _file).name === args.name && _classPrivateFieldGet(this, _file).size === args.size;
}
var _workflow = {
  writable: true,
  value: void 0
};
var Uploader = {
  inlineUpload: function () {
    var _inlineUpload = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(el) {
      var _el$parentNode;
      var file, uploader, progress;
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _converter.default.elementToFile(el);
          case 2:
            file = _context.sent;
            uploader = WPUploader.get(file);
            progress = document.createElement('progress');
            progress.classList.add('the-paste-progress');
            if (sizeAllowed(file)) {
              _context.next = 8;
              break;
            }
            throw new ErrorEvent('the-paste-upload', {
              message: "File size exceeds ".concat(maxFileSize, " byte")
            });
          case 8:
            if (extensionAllowed(file)) {
              _context.next = 10;
              break;
            }
            throw new ErrorEvent('the-paste-upload', {
              message: "Type ".concat(file.type, " not allowed")
            });
          case 10:
            // dom
            progress.max = 100;
            (_el$parentNode = el.parentNode) === null || _el$parentNode === void 0 ? void 0 : _el$parentNode.insertBefore(progress, el);
            el.remove();

            // upload process
            uploader.onProgress = function (percent) {
              progress.value = percent;
            };
            uploader.onError = function (error) {
              console.error(error);
              _notices.default.error("<strong>".concat(thepaste.l10n.the_paste, ":</strong> ").concat(error.message, " File: <em>").concat(file.name, "</em>"), true);
              progress.remove();
            };
            uploader.onUploaded = function (args) {
              var newElement = document.createElement('p');
              var attachment = args.attachment.attributes;
              if ('image' === attachment.type) {
                newElement.innerHTML = wp.media.string.image({
                  link: 'file'
                }, attachment);
              } else if ('video' === attachment.type) {
                newElement.innerHTML = wp.media.string.video({
                  link: 'embed'
                }, attachment);
              } else if ('audio' === attachment.type) {
                newElement.innerHTML = wp.media.string.audio({
                  link: 'embed'
                }, attachment);
              } else {
                newElement.innerHTML = wp.media.string.link({}, attachment);
              }
              progress.replaceWith(newElement.childNodes[0]);
            };
            uploader.upload();
          case 17:
          case "end":
            return _context.stop();
        }
      }, _callee);
    }));
    function inlineUpload(_x) {
      return _inlineUpload.apply(this, arguments);
    }
    return inlineUpload;
  }(),
  /**
   *	Generate a filename
   */
  getFilename: function getFilename(suffix) {
    var zerofill = function zerofill(n) {
      var len = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;
      return ('00' + n.toString()).substr(-len);
    };
    var name = thepaste.options.default_filename;
    var now = new Date(),
      postname = document.querySelector('#post [name="post_title"]#title').value,
      username = document.querySelector('.display-name').textContent,
      map = [{
        s: '%Y',
        r: now.getFullYear()
      }, {
        s: '%y',
        r: now.getFullYear() % 100
      }, {
        s: '%m',
        r: zerofill(now.getMonth() + 1)
      }, {
        s: '%d',
        r: zerofill(now.getDate())
      }, {
        s: '%e',
        r: now.getDate()
      }, {
        s: '%H',
        r: zerofill(now.getHours())
      }, {
        s: '%I',
        r: zerofill(now.getHours() % 12)
      }, {
        s: '%M',
        r: zerofill(now.getMinutes())
      }, {
        s: '%S',
        r: zerofill(now.getSeconds())
      }, {
        s: '%s',
        r: Math.floor(now.getTime() / 1000)
      }];
    if ('undefined' !== typeof postname) {
      map.push({
        s: '<postname>',
        r: postname
      });
    } else {
      map.push({
        s: '<postname>',
        r: ''
      });
    }
    map.forEach(function (el) {
      name = name.replace(el.s, el.r);
    });
    if ('string' === typeof suffix) {
      name += '.' + suffix;
    }
    return name;
  }
};
module.exports = Uploader;

},{"compat":2,"converter":3,"mime":5,"notices":6}]},{},[1])

//# sourceMappingURL=the-paste-plugin.js.map

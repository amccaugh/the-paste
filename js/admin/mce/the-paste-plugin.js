(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
(function (global){(function (){
"use strict";

var _jquery = _interopRequireDefault((typeof window !== "undefined" ? window['jQuery'] : typeof global !== "undefined" ? global['jQuery'] : null));
var _converter = _interopRequireDefault(require("converter"));
var _notices = _interopRequireDefault(require("notices"));
var _uploader = _interopRequireDefault(require("uploader"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
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
class PasteOperation {
  static init(event) {
    _classStaticPrivateFieldSpecSet(PasteOperation, PasteOperation, _instance, new PasteOperation(event));
    return PasteOperation.get();
  }
  static get() {
    return _classStaticPrivateFieldSpecGet(PasteOperation, PasteOperation, _instance);
  }
  static destroy() {
    _classStaticPrivateFieldSpecSet(PasteOperation, PasteOperation, _instance, null);
  }
  get isAsync() {
    return _classPrivateFieldGet(this, _isAsync);
  }
  get hasPastedFiles() {
    return this.files.length > 0;
  }
  get pastedContent() {
    return this.isAsync ? '<p id="the-pasted-async"></p>' : this.files.map((file, idx) => {
      const src = URL.createObjectURL(file);
      return "<img id=\"the-pasted-".concat(file.type, "-").concat(idx, "\" src=\"").concat(src, "\" alt=\"").concat(file.name, "\" />");
    }).join('');
  }
  get files() {
    return _classPrivateFieldGet(this, _files);
  }
  constructor(event) {
    var _this$clipboardData$f;
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
    _classPrivateFieldSet(this, _isAsync, Array.from(event.clipboardData.items).filter(item => item.kind === 'string' && item.type === 'text/html').length > 0);
    // no files
    if (!this.isAsync && !this.files.length) {
      return;
    }
    if (this.isAsync) {
      // google docs clipboard items present
      (async () => {
        let i;
        const html = await _converter.default.clipboardItemsToHtml(event.clipboardData.items);
        const div = document.createElement('div');
        const placeholder = this.body.querySelector('#the-pasted-async');
        const images = [];
        div.innerHTML = html;
        images.push(...Array.from(div.querySelectorAll('img')));
        Array.from(div.childNodes).forEach(node => placeholder.parentNode.insertBefore(node, placeholder));
        placeholder === null || placeholder === void 0 ? void 0 : placeholder.remove();
        if (images.length) {
          for (i = 0; i < images.length; i++) {
            images[i].src = await _converter.default.urlToBlobUrl(images[i].src);
          }
          this.body.dispatchEvent(new Event('FilesPasted'));
        }
      })();
    } else if (this.body.querySelector('[src^="data:"]:not(.--paste-process)')) {
      this.body.dispatchEvent(new Event('FilesPasted'));
    }
  }
  observe() {
    _classStaticPrivateFieldSpecSet(PasteOperation, PasteOperation, _observer, new MutationObserver(entries => {
      entries.forEach(entry => {});
    }, {
      childNodes: true,
      subtree: true
    }));
    return this;
  }
  dumpClipboardData() {
    Array.from(this.clipboardData.files).forEach(el => console.log(el));
    Array.from(this.clipboardData.items).forEach(el => {
      console.log(el, el.kind, el.type);
      if ('string' === el.kind) {
        el.getAsString(s => console.log(s));
      }
    });
    return this;
  }
}
var _instance = {
  writable: true,
  value: null
};
var _observer = {
  writable: true,
  value: null
};
tinymce.PluginManager.add('the_paste', editor => {
  let pasteBtn, pasteOnOffBtn, toolbar;
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
      onPostRender: function () {
        pasteBtn = this;
      },
      active: thepaste.options.editor.auto_upload
    });
  }

  // enable / disable autoupload button
  editor.addButton('thepaste_onoff', {
    icon: 'thepaste_onoff',
    tooltip: thepaste.l10n.paste_files,
    onPostRender: function () {
      pasteOnOffBtn = this;
    },
    onClick: function () {
      this.active(!this.active());
      fetch("".concat(thepaste.options.editor.enable_ajax_url, "&enabled=").concat(this.active() ? 1 : 0));
    },
    active: thepaste.options.editor.enabled
  });

  // upload button in media toolbar flyout
  editor.addButton('wp_img_thepaste_upload', {
    icon: 'dashicon dashicons dashicons-upload thepaste-upload',
    tooltip: thepaste.l10n.upload_image,
    onclick: function () {
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
  const crawlPastedImages = () => {
    return Array.from(editor.dom.doc.body.querySelectorAll('[src^="blob:"]:not(.--paste-process),[src^="data:"]:not(.--paste-process)'));
  };
  editor.on('init', () => {
    const processImage = async loadedImg => {
      if (loadedImg.naturalWidth * loadedImg.naturalHeight > thepaste.options.editor.force_upload_size) {
        _uploader.default.inlineUpload(loadedImg).catch(err => _notices.default.error(err.message, true) || loadedImg.remove());
      } else if (loadedImg.src.substr(0, 4) === 'blob') {
        // make data src
        loadedImg.src = await _converter.default.blobUrlToDataUrl(loadedImg.src);
      }
    };
    editor.dom.doc.body.addEventListener('FilesPasted', async e => {
      let i, el;
      const images = crawlPastedImages();
      for (i = 0; i < images.length; i++) {
        el = images[i];
        el.classList.add('--paste-process');
        if (!thepaste.options.editor.auto_upload && 'image' === (await _converter.default.urlToType(el.src))) {
          if (el.complete) {
            processImage(el);
          } else {
            el.onload = async () => processImage(el);
          }
        } else {
          _uploader.default.inlineUpload(el).catch(err => _notices.default.error(err.message, true) || el.remove());
        }
      }
    });
  }).on('Paste', e => {
    if (!!pasteOnOffBtn && !pasteOnOffBtn.active()) {
      return;
    }
    const pasteOperation = PasteOperation.init(e); //.dumpClipboardData()

    if (!pasteOperation.isAsync && !pasteOperation.files.length) {
      PasteOperation.destroy();
      return;
    }
    const editorPreProcess = e => {
      /*
      FF: Not Fired if clipboard contains file from FS
      */
      let content;
      // get html from pasteOperation
      if (content = pasteOperation.pastedContent) {
        e.content = content;
      }
      PasteOperation.destroy();
    };
    const editorPostProcess = e => {
      setTimeout(() => editor.dom.doc.body.dispatchEvent(new Event('FilesPasted')));
      editor.off('PastePreProcess', editorPreProcess);
      editor.off('PastePostProcess', editorPostProcess);
    };
    editor.once('input', async ie => {
      /*
      Fired in FF if clipboard contains file from FS
      */
      const images = crawlPastedImages();
      let idx, img;
      if (!images.length) {
        return;
      }
      for (idx = 0; idx < images.length; idx++) {
        img = images[idx];
        if (!!pasteOperation.files[idx]) {
          img.alt = pasteOperation.files[idx].name;
          img.src = await _converter.default.dataUrlToBlobUrl(img.src);
        }
      }
      setTimeout(() => editor.dom.doc.body.dispatchEvent(new Event('FilesPasted')));
      if (images.length === pasteOperation.files.length) {
        // images already processed
        editor.off('PastePreProcess', editorPreProcess);
        editor.off('PastePostProcess', editorPostProcess);
      }
    }).on('PastePreProcess', editorPreProcess).on('PastePostProcess', editorPostProcess);
  });
});

}).call(this)}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"converter":3,"notices":6,"uploader":7}],2:[function(require,module,exports){
"use strict";

// Compatibility with [Real Media Library](https://wordpress.org/plugins/real-media-library-lite/)
// @see https://github.com/mcguffin/the-paste/issues/47

class Supports {
  get svg() {
    return _wpPluploadSettings.defaults.filters.mime_types[0].extensions.split(',').includes('svg');
  }
  get webp() {
    return document.createElement('canvas').toDataURL('image/webp').indexOf('data:image/webp') == 0;
  }
}
const rml = {
  file: file => {
    if (!file.getSource) {
      // return native file object
      // mimic mOxie.Blob.getSource()
      file.getSource = () => {
        return file;
      };
    }
    return file;
  }
};
const supports = new Supports();
module.exports = {
  rml,
  supports
};

},{}],3:[function(require,module,exports){
"use strict";

var _compat = require("compat");
var _filename = require("filename");
const itemHandler = type => {
  var _textPlain$textHtml;
  return (_textPlain$textHtml = {
    'text/plain': async item => {
      if (_compat.supports.svg) {
        const str = await Converter.itemToString(item);
        if (str.indexOf('<svg') >= 0) {
          const domParser = new DOMParser();
          if (domParser.parseFromString(str, 'image/svg+xml').querySelector('svg')) {
            return [Converter.stringToFile(str, 'image/svg+xml')];
          }
        }
      }
      return [];
    },
    'text/html': async item => {
      const div = document.createElement('div');
      div.innerHTML = await Converter.itemToString(item);
      const imgs = Array.from(div.querySelectorAll('img')).map(img => Converter.elementToFile(img));
      return new Promise((resolve, reject) => {
        Promise.allSettled(imgs).then(result => resolve(Array.from(result).map(promise => promise.value)));
      });
    },
    'application/x-vnd.google-docs-image-clip+wrapped': async item => await Converter.gdocsItemToFiles(item)
  }[type]) !== null && _textPlain$textHtml !== void 0 ? _textPlain$textHtml : () => new Promise((resolve, reject) => resolve([]));
};
const Converter = {
  clipboardItemsToFiles: clipboardItems => {
    const files = [];
    return new Promise((resolve, reject) => {
      const promises = Array.from(clipboardItems).map(item => {
        if ('string' === item.kind) {
          const handler = itemHandler(item.type);
          return handler(item).then(f => {
            files.push(...f);
          }).catch(err => {
            console.error(err);
          });
        }
      });
      Promise.allSettled(promises).then(() => resolve(files));
    });
  },
  clipboardItemsToHtml: async clipboardItems => {
    let i, item;
    for (i = 0; i < clipboardItems.length; i++) {
      item = clipboardItems[i];
      if ('string' === item.kind && 'text/html' === item.type) {
        return await Converter.itemToString(item);
      }
    }
    return '';
  },
  gdocsItemToSources: async item => new Promise((resolve, reject) => {
    item.getAsString(async str => {
      const src = Object.values(JSON.parse(JSON.parse(str).data).image_urls);
      resolve(src);
    });
  }),
  gdocsItemToFiles: async item => {
    const sources = await Converter.gdocsItemToSources(item);
    const files = [];
    for (i = 0; i < sources.length; i++) {
      files.push(await Converter.blobUrlToFile(sources[i]));
    }
    return files;
  },
  itemToString: async item => new Promise((resolve, reject) => {
    item.getAsString(str => resolve(str));
  }),
  elementToFile: async el => {
    const file = await Converter.urlToFile(el.src, el.alt);
    return file;
  },
  urlToFile: async function (url) {
    let filename = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
    let file;
    const schema = url.substr(0, url.indexOf(':'));
    if ('data' === schema) {
      file = Converter.dataUrlToFile(url, filename);
    } else if (['blob', 'http', 'https'].includes(schema)) {
      file = await Converter.blobUrlToFile(url, filename);
    }
    return file;
  },
  urlToMime: async url => {
    const schema = url.substr(0, url.indexOf(':'));
    let mime;
    if ('data' === schema) {
      mime = Converter.dataUrlToMime(url);
    } else if (['blob', 'http', 'https'].includes(schema)) {
      mime = await Converter.blobUrlToMime(url);
    }
    return mime;
  },
  urlToType: async url => {
    const mime = await Converter.urlToMime(url);
    return mime.substr(0, mime.indexOf('/'));
  },
  urlToBlobUrl: async url => {
    const file = await Converter.blobUrlToFile(url);
    return Converter.fileToBlobUrl(file);
  },
  stringToFile: (str, type) => {
    return Converter.blobToFile(new Blob([str], {
      type
    }));
  },
  blobToFile: function (blob) {
    let filename = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
    return new File([blob], (0, _filename.safeFilename)(blob, filename), {
      type: blob.type
    });
  },
  blobUrlToMime: async blobUrl => {
    const blob = await Converter.blobUrlToBlob(blobUrl);
    return blob.type;
  },
  blobUrlToType: async blobUrl => {
    const blob = await Converter.blobUrlToBlob(blobUrl);
    return blob.type.substr(0, blob.type.indexOf('/'));
  },
  blobUrlToBlob: async function (blobUrl) {
    let filename = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
    const blob = await fetch(blobUrl).then(r => r.blob());
    return blob;
  },
  blobUrlToFile: async function (blobUrl) {
    let filename = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
    const blob = await Converter.blobUrlToBlob(blobUrl);
    return Converter.blobToFile(blob, filename);
  },
  blobUrlToDataUrl: async blobUrl => {
    const blob = await fetch(blobUrl).then(r => r.blob());
    const dataurl = await Converter.fileToDataUrl(blob);
    return dataurl;
  },
  dataUrlToMime: dataurl => dataurl.match('data:([^;]+);')[1],
  dataUrlToType: dataurl => dataurl.match('data:([^\/]+)\/')[1],
  dataUrlToBlob: dataurl => {
    let arr = dataurl.split(','),
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
  dataUrlToFile: function (dataurl) {
    let filename = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
    return Converter.blobToFile(Converter.dataUrlToBlob(dataurl), filename);
  },
  dataUrlToBlobUrl: dataurl => Converter.fileToBlobUrl(Converter.dataUrlToBlob(dataurl)),
  fileToBlobUrl: file => URL.createObjectURL(file),
  fileToDataUrl: file => new Promise((resolve, reject) => {
    const fr = new FileReader();
    fr.addEventListener('load', () => resolve(fr.result));
    fr.readAsDataURL(file);
  })
};
module.exports = Converter;

},{"compat":2,"filename":4}],4:[function(require,module,exports){
"use strict";

var _mime = _interopRequireDefault(require("mime"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/**
 *	Generate a filename
 */
const generateFilename = suffix => {
  var _document$querySelect, _document$querySelect2, _document$querySelect3;
  const zerofill = function (n) {
    let len = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;
    return ('00' + n.toString()).substr(-len);
  };
  let name = thepaste.options.default_filename;
  const now = new Date(),
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
  Object.keys(replace_values).forEach(k => {
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
const safeFilename = function (file) {
  let filename = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  let type = file.type;
  const suffix = _mime.default.extension(type);
  filename = filename.replace(/[^\p{L}\p{M}\p{S}\p{N}\p{P}\p{Zs}]/ug, '-').trim();
  if (!filename) {
    filename = generateFilename(suffix);
  }
  if (suffix !== filename.split('.').pop()) {
    filename += ".".concat(suffix);
  }
  return filename;
};
module.exports = {
  generateFilename,
  safeFilename
};

},{"mime":5}],5:[function(require,module,exports){
"use strict";

const exts = Object.keys(thepaste.options.mime_types);
const types = Object.values(thepaste.options.mime_types);

// windows
exts.push('zip');
types.push('application/x-zip-compressed');
module.exports = {
  extension: type => {
    const idx = types.indexOf(type);
    return -1 !== idx ? exts[idx] : false;
  },
  type: ext => {
    const idx = exts.indexOf(ext);
    return -1 !== idx ? types[idx] : false;
  }
};

},{}],6:[function(require,module,exports){
(function (global){(function (){
"use strict";

var _jquery = _interopRequireDefault((typeof window !== "undefined" ? window['jQuery'] : typeof global !== "undefined" ? global['jQuery'] : null));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _classStaticPrivateMethodGet(receiver, classConstructor, method) { _classCheckPrivateStaticAccess(receiver, classConstructor); return method; }
function _classCheckPrivateStaticAccess(receiver, classConstructor) { if (receiver !== classConstructor) { throw new TypeError("Private static access of wrong provenance"); } }
class Notices {
  static success(message) {
    let dismissible = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    _classStaticPrivateMethodGet(Notices, Notices, _addNotice).call(Notices, 'updated', message, dismissible);
  }
  static notify(message) {
    let dismissible = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    _classStaticPrivateMethodGet(Notices, Notices, _addNotice).call(Notices, '', message, dismissible);
  }
  static warn(message) {
    let dismissible = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    _classStaticPrivateMethodGet(Notices, Notices, _addNotice).call(Notices, 'notice-warning', message, dismissible);
  }
  static error(message) {
    let dismissible = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    _classStaticPrivateMethodGet(Notices, Notices, _addNotice).call(Notices, 'error', message, dismissible);
  }
}
function _addNotice(type, message) {
  let dismissible = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  const classes = "".concat(type, " notice ").concat(dismissible ? 'is-dismissible' : '').trim();
  const html = "<div class=\"".concat(classes, "\"><p>").concat(message, "</p></div>");
  const $headerEnd = (0, _jquery.default)('.wp-header-end').first();
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

var _mime = _interopRequireDefault(require("mime"));
var _converter = _interopRequireDefault(require("converter"));
var _notices = _interopRequireDefault(require("notices"));
var _compat = require("compat");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _classPrivateMethodInitSpec(obj, privateSet) { _checkPrivateRedeclaration(obj, privateSet); privateSet.add(obj); }
function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }
function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
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
const allowedExtensions = _wpPluploadSettings.defaults.filters.mime_types[0].extensions.split(',');
const maxFileSize = Math.min(1024 * 1024 * 200, parseInt(_wpPluploadSettings.defaults.filters.max_file_size)); // 100MB or uplaod max filesize

const sizeAllowed = file => {
  return !!file && file.size <= maxFileSize;
};
const extensionAllowed = file => {
  return !!file && allowedExtensions.includes(_mime.default.extension(file.type));
};
var _file = /*#__PURE__*/new WeakMap();
var _progressHandler = /*#__PURE__*/new WeakMap();
var _uploadedHandler = /*#__PURE__*/new WeakMap();
var _errorHandler = /*#__PURE__*/new WeakMap();
var _isitMe = /*#__PURE__*/new WeakSet();
class WPUploader {
  static get ready() {
    return !!WPUploader.workflow.uploader.uploader && !!WPUploader.workflow.uploader.uploader.ready;
  }
  static get workflow() {
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
  static get uploader() {
    return WPUploader.workflow.uploader.uploader.uploader;
  }
  static get(file) {
    return new WPUploader(file);
  }
  constructor(file) {
    var _this = this;
    _classPrivateMethodInitSpec(this, _isitMe);
    _defineProperty(this, "onUploaded", () => {});
    _defineProperty(this, "onProgress", () => {});
    _defineProperty(this, "onError", () => {});
    _classPrivateFieldInitSpec(this, _file, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldInitSpec(this, _progressHandler, {
      writable: true,
      value: (up, args) => {
        if (_classPrivateMethodGet(this, _isitMe, _isitMe2).call(this, args)) {
          this.onProgress(args.percent);
        }
      }
    });
    _classPrivateFieldInitSpec(this, _uploadedHandler, {
      writable: true,
      value: (up, args, response) => {
        if (_classPrivateMethodGet(this, _isitMe, _isitMe2).call(this, args)) {
          this.onUploaded(args);
        }
      }
    });
    _classPrivateFieldInitSpec(this, _errorHandler, {
      writable: true,
      value: function (up, args) {
        let c = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
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
  destructor() {
    WPUploader.uploader.unbind('UploadProgress', _classPrivateFieldGet(this, _progressHandler), this);
    WPUploader.uploader.unbind('FileUploaded', _classPrivateFieldGet(this, _uploadedHandler), this);
    WPUploader.uploader.unbind('Error', _classPrivateFieldGet(this, _errorHandler), this);
  }
  upload() {
    if (WPUploader.ready) {
      WPUploader.uploader.addFile(_classPrivateFieldGet(this, _file));
    } else {
      WPUploader.workflow.once('uploader:ready', () => {
        WPUploader.uploader.addFile(_classPrivateFieldGet(this, _file));
      });
    }
  }
  dump() {
    console.log(arguments);
  }
}
function _isitMe2(args) {
  return _classPrivateFieldGet(this, _file).name === args.name && _classPrivateFieldGet(this, _file).size === args.size;
}
var _workflow = {
  writable: true,
  value: void 0
};
const Uploader = {
  inlineUpload: async el => {
    var _el$parentNode;
    const file = await _converter.default.elementToFile(el);
    const uploader = WPUploader.get(file);
    const progress = document.createElement('progress');
    progress.classList.add('the-paste-progress');
    if (!sizeAllowed(file)) {
      throw new ErrorEvent('the-paste-upload', {
        message: "File size exceeds ".concat(maxFileSize, " byte")
      });
    }
    if (!extensionAllowed(file)) {
      throw new ErrorEvent('the-paste-upload', {
        message: "Type ".concat(file.type, " not allowed")
      });
    }
    // dom
    progress.max = 100;
    (_el$parentNode = el.parentNode) === null || _el$parentNode === void 0 ? void 0 : _el$parentNode.insertBefore(progress, el);
    el.remove();

    // upload process
    uploader.onProgress = percent => {
      progress.value = percent;
    };
    uploader.onError = error => {
      console.error(error);
      _notices.default.error("<strong>".concat(thepaste.l10n.the_paste, ":</strong> ").concat(error.message, " File: <em>").concat(file.name, "</em>"), true);
      progress.remove();
    };
    uploader.onUploaded = args => {
      const newElement = document.createElement('p');
      const attachment = args.attachment.attributes;
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
  },
  /**
   *	Generate a filename
   */
  getFilename: suffix => {
    const zerofill = function (n) {
      let len = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;
      return ('00' + n.toString()).substr(-len);
    };
    let name = thepaste.options.default_filename;
    const now = new Date(),
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

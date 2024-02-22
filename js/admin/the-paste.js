(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

var _converter = _interopRequireDefault(require("converter"));
var _imageDialog = _interopRequireDefault(require("image-dialog"));
var _compat = require("compat");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
let uploader;
const handleFiles = files => {
  const images = [];
  files.forEach(file => {
    if (/^image\//.test(file.type)) {
      images.push(file);
      // uploader.addFile( file )
    } else {
      uploader.addFile(_compat.rml.file(file));
    }
  });
  if (images.length) {
    (0, _imageDialog.default)(images).then(files => files.forEach(file => uploader.addFile(_compat.rml.file(file))));
  }
};
document.addEventListener('paste', async e => {
  if (document.body.matches('.the-paste-modal-open')) {
    return;
  }
  if (!uploader) {
    return;
  }
  const files = Array.from(e.clipboardData.files);
  files.push(...(await _converter.default.clipboardItemsToFiles(e.clipboardData.items)));
  if (files.length) {
    return handleFiles(files);
  }
}, {
  capture: true
});

// Show paste notice in media library
const PasteInstructions = wp.media.View.extend({
  template: wp.template('the-paste-instructions'),
  className: 'the-paste-instructions',
  render: function () {
    wp.media.View.prototype.render.apply(this, arguments);
    setInterval(() => {
      this.$el.prop('hidden', !document.hasFocus());
    }, 100);
  }
});
_.extend(wp.media.view.MediaFrame.prototype, {
  _parentInitialize: wp.media.view.MediaFrame.prototype.initialize,
  initialize: function (title) {
    this._parentInitialize.apply(this, arguments);
    this.on('attach', this.addPasteInstructions, this);
    this.pasteInstructions = new PasteInstructions();
    this.pasteInstructions.render();
  },
  addPasteInstructions: function () {
    this.$el.find('#media-frame-title').append(this.pasteInstructions.el);
  }
});

// set uploader global var
_.extend(wp.media.view.AttachmentsBrowser.prototype, {
  _parentInitialize: wp.media.view.AttachmentsBrowser.prototype.initialize,
  initialize: function () {
    this._parentInitialize.apply(this, arguments);
    const pasteInstructions = new PasteInstructions({
      priority: -10
    });
    pasteInstructions.render();
    this.toolbar.set('pasteInstructions', pasteInstructions);
    if (!!this.controller.uploader.uploader) {
      uploader = this.controller.uploader.uploader.uploader;
    } else {
      setTimeout(() => {
        uploader = this.controller.uploader.uploader.uploader;
      }, 50);
    }
  }
});

},{"compat":2,"converter":3,"image-dialog":5}],2:[function(require,module,exports){
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

},{"mime":7}],5:[function(require,module,exports){
(function (global){(function (){
"use strict";

var _jquery = _interopRequireDefault((typeof window !== "undefined" ? window['jQuery'] : typeof global !== "undefined" ? global['jQuery'] : null));
var _imageList = _interopRequireDefault(require("image-list"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const imageDialog = images => {
  return new Promise((resolve, reject) => {
    const modal = new wp.media.view.Modal({
      events: {
        'keydown': function (e) {
          if (e.key === 'Enter') {
            list.submit();
          } else if (e.key === 'Escape') {
            modal.close();
          }
        }
      },
      controller: {
        trigger: () => {}
      },
      title: thepaste.l10n.the_paste
    });
    const list = new _imageList.default({
      files: images,
      controller: modal
    });
    const isModal = (0, _jquery.default)('body').is('.modal-open');
    list.on('thepaste:submit', async () => {
      const files = await list.getFiles();
      modal.remove();
      (0, _jquery.default)('body').toggleClass('the-paste-modal-open', false); // block editor
      (0, _jquery.default)('body').toggleClass('modal-open', isModal); // restore preious modal state
      resolve(files);
    });
    modal.content(list);
    modal.open();
    modal.on('close', () => {
      (0, _jquery.default)('body').toggleClass('the-paste-modal-open', false);
      (0, _jquery.default)('body').toggleClass('modal-open', isModal);
      setTimeout(() => modal.remove(), 10);
    });
    (0, _jquery.default)('body').toggleClass('the-paste-modal-open', true);
  });
};
module.exports = imageDialog;

}).call(this)}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"image-list":6}],6:[function(require,module,exports){
"use strict";

var _converter = _interopRequireDefault(require("converter"));
var _mime = _interopRequireDefault(require("mime"));
var _compat = require("compat");
var _filename = require("filename");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const ImageListItem = wp.media.View.extend({
  tagName: 'form',
  template: wp.template('the-paste-image-list-item'),
  className: 'the-paste-image-list-item',
  events: {
    'click [name="discard"]': 'discard'
  },
  initialize: function (_ref) {
    let {
      file
    } = _ref;
    wp.media.View.prototype.initialize.apply(this, arguments);
    this.file = file;
    new Promise((resolve, reject) => {
      const rawImage = new Image();
      rawImage.addEventListener("load", function () {
        resolve(rawImage);
      });
      rawImage.src = _converter.default.fileToBlobUrl(file);
    }).then(rawImage => {
      let hasSize = rawImage.width && rawImage.height;
      this.canvas = this.$('canvas').get(0);
      if ('image/svg+xml' === this.file.type) {
        // append image to DOM to get actual size
        if (hasSize) {
          document.body.append(rawImage);
        } else {
          this.canvas.after(rawImage);
        }
      }
      // draw canvas
      this.canvas.width = rawImage.width;
      this.canvas.height = rawImage.height;
      this.canvas.getContext("2d").drawImage(rawImage, 0, 0);
      if ('image/svg+xml' === this.file.type) {
        if (hasSize) {
          rawImage.remove();
        } else {
          // no known size: svg only
          this.$("[data-format]:not([data-format=\"image/svg+xml\"])").remove();
        }
      }
    });
  },
  render: function () {
    wp.media.View.prototype.render.apply(this, arguments);
    const type = this.file.type;
    const basename = this.file.name.replace(/\.([^\.]*)$/, '');
    if (!_compat.supports.webp) {
      if ('image/webp' !== type) {
        this.$("[data-format=\"image/webp\"]").remove();
      }
    }
    this.$("[name=\"the-paste-format\"][value=\"".concat(type, "\"]")).prop('checked', true);
    this.$('[name="the-paste-filename"]').val(basename);
    this.$('[name="the-paste-filename"]').prop('placeholder', (0, _filename.generateFilename)());
    if (!_compat.supports.svg || 'image/svg+xml' !== type) {
      this.$("[data-format=\"image/svg+xml\"]").remove();
      if ('image/svg+xml' === type) {
        this.$("[name=\"the-paste-format\"][value=\"image/png\"]").prop('checked', true);
      }
    }
  },
  getFile: function () {
    const type = this.$('[name="the-paste-format"]:checked').val();
    const name = this.$('[name="the-paste-filename"]').val() || (0, _filename.generateFilename)();
    const filename = "".concat(name, ".").concat(_mime.default.extension(type));
    // upload as-is
    if (this.file.type === type) {
      return new Promise((resolve, reject) => {
        resolve(new File([this.file], filename, {
          type
        }));
      });
    }
    // type conversion
    return new Promise((resolve, reject) => {
      this.canvas.toBlob(blob => {
        resolve(_converter.default.blobToFile(blob, filename));
      }, type, thepaste.options.jpeg_quality * 0.01);
    });
  },
  discard: function () {
    this.controller.discardItem(this);
  }
});
const ImageList = wp.media.View.extend({
  template: wp.template('the-paste-image-list'),
  className: 'the-paste-image-list',
  events: {
    'click .media-frame-toolbar button': 'submit'
  },
  initialize: function (_ref2) {
    let {
      files
    } = _ref2;
    wp.media.View.prototype.initialize.apply(this, arguments);
    this.files = files;
    this.items = [];
    this.button = new wp.media.view.Button({
      className: 'button-primary button-hero'
    });
  },
  render: function () {
    wp.media.View.prototype.render.apply(this, arguments);
    this.files.forEach(file => {
      const item = new ImageListItem({
        file,
        controller: this
      });
      item.render();
      this.$('.content').append(item.$el);
      this.items.push(item);
      item.render();
    });
  },
  discardItem: function (item) {
    this.files = this.files.filter(file => file !== item.file);
    this.items = this.items.filter(it => it !== item);
    item.$el.remove();
    if (!this.items.length) {
      this.controller.close();
    }
  },
  getFiles: async function () {
    const files = [];
    for (const item of this.items) {
      files.push(await item.getFile());
    }
    return files;
  },
  submit: function () {
    this.trigger('thepaste:submit');
  }
});
module.exports = ImageList;

},{"compat":2,"converter":3,"filename":4,"mime":7}],7:[function(require,module,exports){
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

},{}]},{},[1])

//# sourceMappingURL=the-paste.js.map

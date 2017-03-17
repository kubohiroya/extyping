const defaultKeymap = require('./keymap_en');
module.exports = {
  en: defaultKeymap,
  jp: Object.assign({}, defaultKeymap, require('./keymap_jp'))
};


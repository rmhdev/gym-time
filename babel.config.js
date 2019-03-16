module.exports = {
  presets: [
    '@vue/app'
  ]
};

// Temporary fix for vuejs issue #9698
// See: https://github.com/vuejs/vue/issues/9698
//global.performance = (undefined === window) ? null : window.performance;

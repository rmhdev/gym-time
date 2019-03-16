// Temporary fix for vuejs issue #9698
// See: https://github.com/vuejs/vue/issues/9698
global.performance = window.performance;

module.exports = {
  presets: [
    '@vue/app'
  ]
};

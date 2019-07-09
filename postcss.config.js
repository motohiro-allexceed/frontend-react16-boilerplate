module.exports = ({
  env,
}) => ({
  plugins: {
    autoprefixer: {
      // overrideBrowserslist: ['>0.25%', 'not op_mini all'],
    },
    'postcss-custom-properties': {},
    'postcss-nesting': {},
    cssnano: env === 'production' ? { autoprefixer: false } : false,
  },
});

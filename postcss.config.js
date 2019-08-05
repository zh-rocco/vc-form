const IS_PROD = process.env.NODE_ENV === 'production'

module.exports = {
  plugins: {
    autoprefixer: IS_PROD ? {} : { overrideBrowserslist: [] }
  }
}

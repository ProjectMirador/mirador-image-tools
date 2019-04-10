module.exports = {
  type: 'react-component',
  npm: {
    esModules: true,
    umd: {
      global: 'MiradorImageTools',
      externals: {
        react: 'React'
      }
    }
  }
}

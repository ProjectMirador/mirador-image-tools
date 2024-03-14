const path = require('path');

module.exports = {
  type: 'react-component',
  npm: {
    esModules: true,
    umd: {
      global: 'MiradorImageTools',
      externals: {
        react: 'React',
        'react-dom': 'ReactDom',
      },
    },
  },
  webpack: {
    aliases: {
      '@mui/material': path.resolve('./', 'node_modules', '@mui/material'),
      '@mui/styles': path.resolve('./', 'node_modules', '@mui/styles'),
      react: path.resolve('./', 'node_modules', 'react'),
      'react-dom': path.resolve('./', 'node_modules', 'react-dom'),
    },
    rules: {
      babel: {
        exclude: []
      }
    },
    config: (config) => { console.log(config); config }
  },
};

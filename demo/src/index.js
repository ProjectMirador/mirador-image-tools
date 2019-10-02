import Mirador from 'mirador/dist/es/src/index';

import { miradorImageToolsPlugin } from '../../src'

const config = {
  id: 'demo',
  windows: [{
    loadedManifest: 'https://purl.stanford.edu/sn904cj3429/iiif/manifest'
  }],
  theme: {
    palette: {
      primary: {
        main: '#1967d2'
      }
    }
  }
}

const miradorInstance = Mirador.viewer(config, [
  miradorImageToolsPlugin,
]);

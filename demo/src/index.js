import mirador from 'mirador';

import { miradorImageToolsPlugin } from '../../src'

const config = {
  id: 'demo',
  windows: [{
    loadedManifest: 'https://purl.stanford.edu/sn904cj3429/iiif/manifest'
  }]
}

console.log(miradorImageToolsPlugin);

const miradorInstance = mirador.viewer(config, [
  miradorImageToolsPlugin,
]);

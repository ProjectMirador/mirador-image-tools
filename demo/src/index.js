import Mirador from 'mirador/dist/es/src/index';
import OSDReferencesPlugin from 'mirador/dist/es/src/plugins/OSDReferences';
import { miradorImageToolsPlugin } from '../../src';

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

Mirador.viewer(config, [
  OSDReferencesPlugin,
  miradorImageToolsPlugin,
]);

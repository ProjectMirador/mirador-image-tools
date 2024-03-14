import Mirador from 'mirador/dist/es/src/index';
import { miradorImageToolsPlugin } from '../../src';

const config = {
  id: 'demo',
  windows: [{
    imageToolsEnabled: true,
    imageToolsOpen: true,
    manifestId: 'https://purl.stanford.edu/sn904cj3429/iiif/manifest',
  }]
};

Mirador.viewer(config, [
  ...miradorImageToolsPlugin,
]);

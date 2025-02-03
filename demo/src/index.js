import Mirador from 'mirador';
import { miradorImageToolsPlugin } from '../../src';

const config = {
  id: 'demo',
  theme: {
    palette: {
      primary: {
        main: '#1967d2',
      },
    },
  },
  windows: [{
    imageToolsEnabled: true,
    imageToolsOpen: true,
    manifestId: 'https://purl.stanford.edu/sn904cj3429/iiif/manifest',
  }],
};

Mirador.viewer(config, [
  ...miradorImageToolsPlugin,
]);

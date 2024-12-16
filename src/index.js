import {
  getContainerId,
  getWindowConfig,
  getViewer,
  updateViewport,
  updateWindow,
} from 'mirador';
import MiradorImageTools from './plugins/MiradorImageTools';
import MiradorImageToolsMenuItem from './plugins/MiradorImageToolsMenuItem';
import translations from './translations';

export const miradorImageToolsPlugin = [
  {
    target: 'OpenSeadragonViewer',
    mapDispatchToProps: {
      updateWindow,
      updateViewport,
    },
    mapStateToProps: (state, { windowId }) => ({
      containerId: getContainerId(state),
      enabled: getWindowConfig(state, { windowId }).imageToolsEnabled || false,
      open: getWindowConfig(state, { windowId }).imageToolsOpen || false,
      viewConfig: getViewer(state, { windowId }) || {},
    }),
    mode: 'add',
    component: MiradorImageTools,
    config: {
      translations,
    },
  },
  {
    target: 'WindowTopBarPluginMenu',
    component: MiradorImageToolsMenuItem,
    mode: 'add',
    mapDispatchToProps: {
      updateWindow,
    },
    mapStateToProps: (state, { windowId }) => ({
      enabled: getWindowConfig(state, { windowId }).imageToolsEnabled || false,
    }),
  },
];

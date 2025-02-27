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
    component: MiradorImageTools,
    config: {
      translations,
    },
    mapDispatchToProps: {
      updateViewport,
      updateWindow,
    },
    mapStateToProps: (state, { windowId }) => ({
      containerId: getContainerId(state),
      enabled: getWindowConfig(state, { windowId }).imageToolsEnabled || false,
      open: getWindowConfig(state, { windowId }).imageToolsOpen || false,
      viewConfig: getViewer(state, { windowId }) || {},
    }),
    mode: 'add',
    target: 'OpenSeadragonViewer',
  },
  {
    component: MiradorImageToolsMenuItem,
    mapDispatchToProps: {
      updateWindow,
    },
    mapStateToProps: (state, { windowId }) => ({
      enabled: getWindowConfig(state, { windowId }).imageToolsEnabled || false,
    }),
    mode: 'add',
    target: 'WindowTopBarPluginMenu',
  },
];

import * as actions from 'mirador/dist/es/src/state/actions';
import { getWindowConfig, getViewer, getContainerId } from 'mirador/dist/es/src/state/selectors';
import MiradorImageTools from './plugins/MiradorImageTools';
import MiradorImageToolsMenuItem from './plugins/MiradorImageToolsMenuItem';
import translations from './translations';

export const miradorImageToolsPlugin = [
  {
    target: 'OpenSeadragonViewer',
    mapDispatchToProps: {
      updateWindow: actions.updateWindow,
      updateViewport: actions.updateViewport,
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
      updateWindow: actions.updateWindow,
    },
    mapStateToProps: (state, { windowId }) => ({
      enabled: getWindowConfig(state, { windowId }).imageToolsEnabled || false,
    }),
  },
];

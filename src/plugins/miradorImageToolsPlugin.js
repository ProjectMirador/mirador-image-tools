import withTheme from '@material-ui/core/styles/withTheme';
import * as actions from 'mirador/dist/es/src/state/actions';
import { getWindowConfig, getViewer, getContainerId } from 'mirador/dist/es/src/state/selectors';
import MiradorImageTools from './MiradorImageTools';
import MiradorImageToolsMenuItem from './MiradorImageToolsMenuItem';
import translations from '../translations';

export default [
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
    component: withTheme(MiradorImageTools),
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

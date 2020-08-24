import withTheme from '@material-ui/core/styles/withTheme';
import * as actions from 'mirador/dist/es/src/state/actions';
import { getWindowConfig, getViewer } from 'mirador/dist/es/src/state/selectors';
import MiradorImageTools from './MiradorImageTools';
import MiradorImageToolsMenuItem from './MiradorImageToolsMenuItem';

export default [
  {
    target: 'OpenSeadragonViewer',
    mapDispatchToProps: {
      updateWindow: actions.updateWindow,
      updateViewport: actions.updateViewport,
    },
    mapStateToProps: (state, { windowId }) => ({
      enabled: getWindowConfig(state, { windowId }).imageToolsEnabled,
      open: getWindowConfig(state, { windowId }).imageToolsOpen,
      viewConfig: getViewer(state, { windowId }) || {},
    }),
    mode: 'add',
    component: withTheme(MiradorImageTools),
  },
  {
    target: 'WindowTopBarPluginMenu',
    component: MiradorImageToolsMenuItem,
    mode: 'add',
    mapDispatchToProps: {
      updateWindow: actions.updateWindow,
    },
    mapStateToProps: (state, { windowId }) => ({
      enabled: getWindowConfig(state, { windowId }).imageToolsEnabled,
    }),
  },
];

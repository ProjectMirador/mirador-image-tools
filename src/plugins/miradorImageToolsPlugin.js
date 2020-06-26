import * as actions from 'mirador/dist/es/src/state/actions';
import { getWindow } from 'mirador/dist/es/src/state/selectors';
import MiradorImageTools from './MiradorImageTools';
import MiradorImageToolsMenuItem from './MiradorImageToolsMenuItem';

export default [
  {
    target: 'OpenSeadragonViewer',
    mapStateToProps: (state, { windowId }) => ({
      enabled: getWindow(state, { windowId }).imageToolsEnabled,
    }),
    mode: 'add',
    component: MiradorImageTools,
  },
  {
    target: 'WindowTopBarPluginMenu',
    component: MiradorImageToolsMenuItem,
    mode: 'add',
    mapDispatchToProps: {
      updateWindow: actions.updateWindow,
    },
    mapStateToProps: (state, { windowId }) => ({
      enabled: getWindow(state, { windowId }).imageToolsEnabled,
    }),
  },
];

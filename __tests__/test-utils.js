import React from 'react';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';
import PropTypes from 'prop-types';
import { createStore, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';
import { createTheme, ThemeProvider, StyledEngineProvider } from '@mui/material/styles';
import createRootReducer from 'mirador/dist/es/src/state/reducers/rootReducer';
import settings from 'mirador/dist/es/src/config/settings';

const rootReducer = createRootReducer();
const theme = createTheme(settings.theme);

/**
 * Hook up our rendered object to redux
 */
function renderWithProviders(
  ui,
  {
    preloadedState = {},
    // Automatically create a store instance if no store was passed in
    store = createStore(rootReducer, preloadedState, applyMiddleware(thunk)),
    ...renderOptions
  } = {},
) {
  /** :nodoc: */
  function Wrapper({ children }) {
    return (
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <Provider store={store}>{children}</Provider>
        </ThemeProvider>
      </StyledEngineProvider>
    );
  }

  Wrapper.propTypes = {
    children: PropTypes.node.isRequired,
  };

  const rendered = render(ui, { wrapper: Wrapper, ...renderOptions });

  // Return an object with the store and all of RTL's query functions
  return {
    store,
    ...rendered,
    rerender: (newUi, options) => render(
      newUi,
      { container: rendered.container, wrapper: Wrapper, ...options },
    ),
  };
}

export * from '@testing-library/react';
export { renderWithProviders as render };

import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { BrowserRouter } from 'react-router-dom';
import { rootReducer } from '../../store/root-reducer';

export function renderWithProviders(
  ui,
  {
    initialState = {},
    // Automatically create a store instance if no store was passed in
    store = createStore(rootReducer, initialState),
    ...renderOptions
  }
) {
  function Wrapper({ children }) {
    return (
      <Provider store={store}>
        <BrowserRouter>{children}</BrowserRouter>
      </Provider>
    );
  }

  // Return an object with the store and all of RTL's query functions
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}

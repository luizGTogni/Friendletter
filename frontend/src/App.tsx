import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import Routes from './routes';

import GlobalStyle from './styles/global';

import AppProvider from './hooks';

function App(): JSX.Element {
  return (
    <>
      <BrowserRouter>
        <AppProvider>
          <Routes />
        </AppProvider>
      </BrowserRouter>
      <GlobalStyle />
    </>
  );
}

export default App;

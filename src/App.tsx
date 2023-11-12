import React from 'react';
import { ThemeProvider } from './themes/ThemeContext';
import { Layout } from './Layout/Layout';
import { GameArea } from './components/GameArea/GameArea';
import { ApolloProvider } from '@apollo/client';
import { apolloClient } from './services/apolloClient';

export const App = () => {
  return (
    <ApolloProvider client={apolloClient}>
      <ThemeProvider>
        <Layout>
          <GameArea />
        </Layout>
      </ThemeProvider>
    </ApolloProvider>
  );
};

export default App;

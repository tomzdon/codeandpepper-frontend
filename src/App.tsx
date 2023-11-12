import React from 'react';
import { ThemeProvider } from './themes/ThemeContext';
import { Layout } from './Layout/Layout';
import { GameArea } from './components/GameArea/GameArea';
import { ApolloProvider } from '@apollo/client';
import { apolloClient } from './services/apolloClient';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Cards } from './components/Cards/Cards';

export const App = () => {
  return (
    <Router>
      <ApolloProvider client={apolloClient}>
        <ThemeProvider>
          <Layout>
            <Routes>
              <Route path="/carts" element={<Cards />}></Route>
              <Route path="/" element={<GameArea />}></Route>
            </Routes>
          </Layout>
        </ThemeProvider>
      </ApolloProvider>
    </Router>
  );
};

export default App;

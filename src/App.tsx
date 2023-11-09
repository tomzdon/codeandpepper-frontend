import React from 'react';
import {ThemeProvider} from "./themes/ThemeContext";
import {Layout} from "./Layout/Layout";
import { GameArea } from './components/GameArea/GameArea';

function App() {
    return (
        <ThemeProvider>
            <Layout>
                <GameArea/>
            </Layout>
        </ThemeProvider>
    );
}

export default App;

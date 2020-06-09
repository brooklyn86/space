import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import './App.css';
import {Routes} from "./Routes";
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
    palette: {
        primary: {
            contrastText: "white",
            main: "#C9D700"
        },
    }
});

function App() {
    return (
        <MuiThemeProvider theme={theme}>
            <BrowserRouter>
                <Routes/>
            </BrowserRouter>
        </MuiThemeProvider>
    );
}

export default App;

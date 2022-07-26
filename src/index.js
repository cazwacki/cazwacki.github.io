import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route }
    from 'react-router-dom';
import Header from './components/header'
import AboutMe from './pages/about'
import LaborWrapper from './pages/labor_wrapper'
import BotCommands from './pages/bot_commands'
import Home from './pages/home'
import data from './constants'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { darkTheme, lightTheme } from './components/theming'

import './index.css';

class Work extends React.Component {
    render() {
        return (
            <div>
                <div className="mt-20" />
                <LaborWrapper labor={data.jobs} title="Job History" count="999" is_job={true} />
            </div>)
    }
}

class Projects extends React.Component {
    render() {
        return (
            <div>
                <div className="mt-20" />
                <LaborWrapper labor={data.projects} title="Personal Projects" count="999" is_job={false} />
            </div>
        )
    }
}

function App() {
    let savedTheme = localStorage.getItem("czawacki_theme");

    let themeToUse = lightTheme;

    if (savedTheme !== null && savedTheme === "dark") {
        themeToUse = darkTheme;
        document.documentElement.classList.add('dark');
    }

    const [theme, setTheme] = React.useState(themeToUse);

    return (
        <React.StrictMode>
            <Router>
                <ThemeProvider theme={theme}>
                    <Header setTheme={setTheme} />
                    <Routes>
                        <Route path='/' element={<Home />} />
                        <Route path='/about' element={<AboutMe />} />
                        <Route path='/work' element={<Work />} />
                        <Route path='/projects' element={<Projects />} />
                        <Route path="/bot-commands" element={<BotCommands />} />
                    </Routes>
                </ThemeProvider>
            </Router>
        </React.StrictMode>
    )
}

// ========================================
createRoot(document.getElementById("root")).render(
    (
        <App />
    )
);
setTimeout(() => { document.getElementsByTagName('html')[0].className += ' transition' }, 500);
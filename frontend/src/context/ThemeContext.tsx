
import { useContext, useState, useEffect } from 'react';
import { createContext } from 'react';



const ThemeContext = createContext({
    isDarkMode: 'dark',
    toggleDarkMode: () => { },
    isOpen: false,
    toggleMenu: () => { },
    setIsOpen: (value: boolean | ((prev: boolean) => boolean)) => { }
});


export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState('dark');

    //toggle dark mode
    const toggleDarkMode = () => {
        setIsDarkMode((prev) => prev === 'dark' ? 'light' : 'dark');
    };

    //toggle hamburger menu
    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    // Update body color whenever theme changes
    useEffect(() => {
        document.body.style.backgroundColor = isDarkMode === 'dark' ? '#121212' : '#ffffff';
        document.body.style.color = isDarkMode === 'dark' ? '#c0c1c2' : '#2c3e50';
    }, [isDarkMode]);

    return (
        <ThemeContext.Provider value={{ isDarkMode, toggleDarkMode, isOpen, toggleMenu, setIsOpen }}>
            {children}
        </ThemeContext.Provider>
    );
}
export const useThemeContext = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useThemeContext must be used within a ThemeProvider');
    }
    return context;
}
export default ThemeContext;

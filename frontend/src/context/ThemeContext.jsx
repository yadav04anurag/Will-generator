import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { toggleDarkModePref } from '../services/authService';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('darkMode');
    return savedMode ? JSON.parse(savedMode) : false;
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light');
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  const toggleTheme = useCallback((isUserLoggedIn) => {
    setDarkMode(prevMode => {
      if (isUserLoggedIn) {
        toggleDarkModePref().catch(err => console.error("Failed to sync theme with backend", err));
      }
      return !prevMode;
    });
  }, []);
  
  const syncThemeWithUser = useCallback((userDarkMode) => {
    setDarkMode(userDarkMode);
  }, []);

  return (
    <ThemeContext.Provider value={{ darkMode, toggleTheme, syncThemeWithUser }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { LightColors, DarkColors, Colors } from '../styles/constants';
import { DataService } from '../services/DataService';

interface ThemeContextType {
  isDarkMode: boolean;
  colors: typeof Colors;
  toggleTheme: () => void;
  setTheme: (isDark: boolean) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [colors, setColors] = useState(LightColors);
  const dataService = DataService.getInstance();

  useEffect(() => {
    loadTheme();
  }, []);

  const loadTheme = async () => {
    try {
      const savedTheme = await dataService.getItem('theme');
      const isDark = savedTheme === 'dark';
      setIsDarkMode(isDark);
      setColors(isDark ? DarkColors : LightColors);
      console.log('🎨 Theme loaded:', isDark ? 'dark' : 'light');
    } catch (error) {
      console.error('Error loading theme:', error);
    }
  };

  const toggleTheme = async () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    setColors(newTheme ? DarkColors : LightColors);
    
    try {
      await dataService.setItem('theme', newTheme ? 'dark' : 'light');
      console.log('🎨 Theme toggled to:', newTheme ? 'dark' : 'light');
    } catch (error) {
      console.error('Error saving theme:', error);
    }
  };

  const setTheme = async (isDark: boolean) => {
    setIsDarkMode(isDark);
    setColors(isDark ? DarkColors : LightColors);
    
    try {
      await dataService.setItem('theme', isDark ? 'dark' : 'light');
      console.log('🎨 Theme set to:', isDark ? 'dark' : 'light');
    } catch (error) {
      console.error('Error saving theme:', error);
    }
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, colors, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

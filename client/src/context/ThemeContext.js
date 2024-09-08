import { useState, createContext, useContext } from "react";

// Create a context for theme management
const ThemeContext = createContext();

// Define the ThemeProvider component
const ThemeProvider = ({ children }) => {
  // State to manage the current theme, default is "light"
  const [theme, setTheme] = useState("light");

  return (
    // Provide the theme state and its updater function to the component tree
    <ThemeContext.Provider value={[theme, setTheme]}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to use the ThemeContext
const useTheme = () => useContext(ThemeContext);

export { useTheme, ThemeProvider };

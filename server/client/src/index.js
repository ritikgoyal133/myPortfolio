import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { ThemeProvider } from "./context/ThemeContext"; // Import ThemeProvider to manage theme context

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ThemeProvider>
    {/* Provide the theme context to the entire application */}
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </ThemeProvider>
);

// client/src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client'; // Import from 'react-dom/client' for React 18+
import App from './App'; // Import your main App component
import './index.css'; // Import your global CSS for the entire app

// Get the root DOM element where your React app will be mounted
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render your React application
root.render(
  <React.StrictMode>
    {/*
      React.StrictMode is a tool for highlighting potential problems in an application.
      Like Fragment, StrictMode does not render any visible UI. It activates additional
      checks and warnings for its descendants.
      It helps catch common mistakes and provides warnings.
    */}
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// import reportWebVitals from './reportWebVitals'; // Uncomment if you want to use web vitals
// reportWebVitals(); // Uncomment if you want to use web vitals
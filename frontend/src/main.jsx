import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import { customTheme } from "./component/utils/themeConfig";
import { ThemeProvider } from "@emotion/react";
import "./styles.css";
import { ContextProvider } from './component/utils/globalContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <ThemeProvider theme={customTheme}>
    <BrowserRouter>
      <ContextProvider>
        <App />
      </ContextProvider>
    </BrowserRouter>
  </ThemeProvider>
);


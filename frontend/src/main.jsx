
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { customTheme } from "./component/utils/themeConfig"
import { ThemeProvider } from "@emotion/react"

ReactDOM.createRoot(document.getElementById('root')).render(
  <ThemeProvider theme={customTheme}>
  <BrowserRouter>
    <App />
  </BrowserRouter>
  </ThemeProvider>
)

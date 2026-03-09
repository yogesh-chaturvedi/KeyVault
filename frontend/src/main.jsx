import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { HealthContextProvider } from './context/HealthContext.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import { PasswordProvider } from './context/PasswordContext.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HealthContextProvider>
      <AuthProvider>
        <PasswordProvider>
            <BrowserRouter>
              <App />
            </BrowserRouter>
        </PasswordProvider>
      </AuthProvider>
    </HealthContextProvider>
  </StrictMode>,
)

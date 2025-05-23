import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ThemeProvider } from './context/ThemeContext.tsx'
import { BrowserRouter } from 'react-router-dom'
import { ModalProvider } from './context/ModalContext.tsx'
import store from './store/Store.tsx'
import { Provider } from 'react-redux'




createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter >
      <ThemeProvider>
        <ModalProvider>
          <Provider store={store}>
            <App />
          </Provider>
        </ModalProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>,
)

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './app/styles/index.scss'
import './app/styles/global.scss'
import App from './app/App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { StoreProvider } from './app/providers/storeProvider/ui/StoreProvider.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <StoreProvider>
        <App />
      </StoreProvider>
    </BrowserRouter>
  </StrictMode>,
)

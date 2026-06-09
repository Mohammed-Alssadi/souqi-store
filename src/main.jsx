import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import '@fontsource/inter/400.css';
import '@fontsource/inter/700.css';
import '@fontsource/montserrat/500.css';
import '@fontsource/montserrat/700.css';


// استيراد إعدادات الترجمة
import './i18n';
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

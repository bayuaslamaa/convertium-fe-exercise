import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { UserProvider } from './context/UserContextFull.tsx'
import ErrorBoundary from './components/ErrorBoundary.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <UserProvider>
        <App />
      </UserProvider>
    </ErrorBoundary>
  </StrictMode>,
)

// Web vitals reporting can be enabled when needed by uncommenting:
// import * as webVitals from 'web-vitals';
// webVitals.getCLS(reportWebVitals);
// webVitals.getFID(reportWebVitals);
// webVitals.getLCP(reportWebVitals);
// where reportWebVitals = (metric) => console.debug('Web Vitals:', metric);

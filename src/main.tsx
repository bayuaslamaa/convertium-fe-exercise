import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { UserProvider } from './context/UserContextFull.tsx'
import ErrorBoundary from './components/ErrorBoundary.tsx'

// Create root with null check
const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Root element not found! Make sure there is a div with id "root" in index.html');
}

// Wrap render in try/catch for additional safety
try {
  createRoot(rootElement).render(
    <StrictMode>
      <ErrorBoundary>
        <UserProvider>
          <App />
        </UserProvider>
      </ErrorBoundary>
    </StrictMode>,
  )
} catch (error) {
  console.error('Error rendering the application:', error);

  // Fallback rendering if main app fails to mount
  const errorDiv = document.createElement('div');
  errorDiv.style.margin = '20px';
  errorDiv.style.padding = '20px';
  errorDiv.style.border = '1px solid #f44336';
  errorDiv.style.borderRadius = '4px';
  errorDiv.style.backgroundColor = '#ffebee';
  errorDiv.style.color = '#d32f2f';
  errorDiv.innerHTML = `
    <h2>Application Failed to Start</h2>
    <p>We're sorry, but there was a critical error loading the application.</p>
    <p>Please try refreshing the page or contact support if the issue persists.</p>
    <pre style="margin-top: 10px; padding: 10px; background: #fff; border: 1px solid #ddd; border-radius: 4px; overflow: auto;">${String(error)}</pre>
  `;

  if (rootElement.firstChild) {
    rootElement.innerHTML = '';
  }
  rootElement.appendChild(errorDiv);
}

// Web vitals reporting can be enabled when needed by uncommenting:
// import * as webVitals from 'web-vitals';
// webVitals.getCLS(reportWebVitals);
// webVitals.getFID(reportWebVitals);
// webVitals.getLCP(reportWebVitals);
// where reportWebVitals = (metric) => console.debug('Web Vitals:', metric);

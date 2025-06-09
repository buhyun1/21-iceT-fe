import { createRoot } from 'react-dom/client';
import App from './App.tsx';

// MathJax 설정
// const config = {
//   tex: { inlineMath: [['$', '$']] },
// };

createRoot(document.getElementById('root')!).render(
  //<StrictMode>
  //<MathJaxContext config={config}>
  <App />
  //</StrictMode>
);

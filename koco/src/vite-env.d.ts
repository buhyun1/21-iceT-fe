/// <reference types="vite/client" />
// MathJax 타입 선언
declare global {
  // eslint-disable-next-line
  interface Window {
    // eslint-disable-next-line
    MathJax: any;
  }
}

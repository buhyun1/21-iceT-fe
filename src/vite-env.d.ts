/// <reference types="vite/client" />
// MathJax 타입 선언

export {};

declare global {
  // eslint-disable-next-line
  interface Window {
    MathJax: {
      typesetPromise?: (elements?: Array<HTMLElement | string>) => Promise<void>;
      typeset?: (elements?: Array<HTMLElement | string>) => void;
    };
  }
}

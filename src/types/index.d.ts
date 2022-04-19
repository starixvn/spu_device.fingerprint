export {};

declare global {
  interface Window {
    chrome: string;
    openDatabase: string;
  }
}

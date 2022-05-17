export {};

declare global {
  interface Window {
    chrome: string;
    HTMLElement: string;
    opera: string;
    opr: {
      addons: string
    };
    openDatabase: string;
  };
  interface document {
    documentMode: string;
  };
  interface InstallTrigger {}
}

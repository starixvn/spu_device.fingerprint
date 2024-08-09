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
    mozIndexedDB?: IDBFactory;
    webkitIndexedDB?: IDBFactory;
    msIndexedDB?: IDBFactory;
    shimIndexedDB?: IDBFactory;
    UAParser: any;
  };
  interface document {
    documentMode: string;
  };
  interface InstallTrigger {};
  interface IDBVersionChangeEvent {
    target: IDBRequest
  }
}

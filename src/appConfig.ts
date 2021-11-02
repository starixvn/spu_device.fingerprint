export var key: string = "__key__";
export var apiUrl: string = "__apiUrl__";
export var token: string = "__token__";

export function set(appKey: string, appAPIUrl: string, appToken: string) {
  key = appKey;
  apiUrl = appAPIUrl;
  token = appToken;
}

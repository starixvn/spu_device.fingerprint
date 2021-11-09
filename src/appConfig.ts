export var key: string = "__key__";
export var apiUrl: string = "__apiUrl__";
export var token: string = "__token__";
export var fpsKey: string = "__fpsKey__";

export function set(
  appKey: string,
  appAPIUrl: string,
  appToken: string,
  appFpsKey: string
) {
  key = appKey;
  apiUrl = appAPIUrl;
  token = appToken;
  fpsKey = appFpsKey;
}

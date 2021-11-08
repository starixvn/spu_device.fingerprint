export var key: string = "__key__";
export var apiUrl: string = "__apiUrl__";
export var token: string = "__token__";

export var fpsKey: string = "__fpsKey__";

export function set(appKey: string, appAPIUrl: string, appToken: string) {
  key = appKey;
  apiUrl = appAPIUrl;
  token = appToken;
}
export function getKey() {
  var fpsKeyHtml = document.getElementById("___fk") as HTMLInputElement;
  fpsKey = fpsKeyHtml.value;
}

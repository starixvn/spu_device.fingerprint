export var apiUrl: string = "__apiUrl__";
export var token: string = "__token__";
export var subscriberId: string = "__subscriberId__";

export function set(appAPIUrl: string, appToken: string, subscriber: number) {
  apiUrl = appAPIUrl;
  token = appToken;
  subscriberId = subscriber.toString();
}

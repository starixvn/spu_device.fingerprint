export var apiUrl: string = "__apiUrl__";
export var subscriberId: string = "__subscriberId__";

export function set(appAPIUrl: string, subscriber: number) {
  apiUrl = appAPIUrl;
  subscriberId = subscriber.toString();
}

export var apiUrl: string = "__apiUrl__";
export var subscriberId: string = "__subscriberId__";
export var sessionKey: string = "__sessionKey__";

export async function set(
  appAPIUrl: string,
  subscriber: string,
  sessionKey: string
) {
  this.apiUrl = appAPIUrl;
  this.subscriberId = subscriber;
  this.sessionKey = sessionKey;
}

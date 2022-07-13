import { storageHandler } from "./cookie";

var _cookieName: string = "__fp";

export async function postData(url: string, data: string): Promise<Response> {
  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}

export async function postDataFp(
  url: string,
  data: string,
  token: string
): Promise<Response> {
  return fetch(url + "/fp", {
    method: "POST",
    cache: "no-cache",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify(data),
  });
}

export function getCookie(): Promise<string> {
  return storageHandler(_cookieName);
}

export function getConfig(url: string, sessionKey: string): Promise<Response> {
  return fetch(url + "/conf/" + sessionKey, {
    method: "GET",
    redirect: "follow",
  });
}

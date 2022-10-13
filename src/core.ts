import { storageHandler } from "./cookie";

var _cookieName: string = "__fp";

export async function postData(url: string, data: string): Promise<Response> {
  return fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: data,
  });
}

export async function postDataFp(
  url: string,
  data: string,
  token: string
): Promise<Response> {
  return fetch(url + "/fp", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: data,
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

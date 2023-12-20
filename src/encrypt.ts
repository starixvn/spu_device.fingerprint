import MD5 from "../override/crypto-js/md5.js";
import { encodeBase64 } from './base64';

export function hashMD5(data: string): string {
    return MD5(data).toString();
}

export function encode(data: string, key: string): string {
    return encodeBase64(data, key);
}
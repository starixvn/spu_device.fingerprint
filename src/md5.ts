import MD5 from "../override/crypto-js/md5.js";

export function hash(data: string): string {
    return MD5(data).toString();
}
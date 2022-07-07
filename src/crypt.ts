import CryptoJS from "../override/crypto-js";
interface Key {
  iv: string;
  pass: string;
  salt: string;
}
export function Encrypting(data: {}, key: Key): string {
  var iv = CryptoJS.enc.Hex.parse(key.iv);
  var pass = CryptoJS.enc.Utf8.parse(key.pass);
  var salt = CryptoJS.enc.Utf8.parse(key.salt);
  var key128Bits1000Iterations = CryptoJS.PBKDF2(
    pass.toString(CryptoJS.enc.Utf8),
    salt,
    { keySize: 128 / 32, iterations: 1000 }
  );
  var cfg = { mode: CryptoJS.mode.CBC, iv: iv, padding: CryptoJS.pad.Pkcs7 };
  var encrypted = CryptoJS.AES.encrypt(
    JSON.stringify(data),
    key128Bits1000Iterations,
    cfg
  );

  return CryptoJS.enc.Base64.stringify(encrypted.ciphertext);
}

export async function EncryptingAsync(data: {}, key: Key): Promise<string> {
  let result = Encrypting(data, key);

  return Promise.resolve(result);
}

export function HashMD5(data: string): string {
  return CryptoJS.MD5(data).toString();
}

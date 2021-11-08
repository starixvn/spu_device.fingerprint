import CryptoJS from "crypto-js";

export function Encrypting(data: {}, key: string): string {
  var iv = CryptoJS.enc.Hex.parse("c3eef06037e837f4ee390bda69c05023");
  var pass = CryptoJS.enc.Utf8.parse(key);
  var salt = CryptoJS.enc.Utf8.parse("234292a9fce031f2");
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

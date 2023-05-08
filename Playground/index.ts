import * as crypto from "../src/subtleCrypto"

var data = {"fingerprint":{"Id":"0ac4d4fa6f1332244556677777766341","Attributes":"{\"audio\":124.04347527516074,\"colorDepth\":\"a\"}"},"SessionKey":"2873f991e4194b389595c91956aed993","SubscriberId":"2"};

console.log('JSON.stringify(data)', JSON.stringify(data), JSON.stringify(data).length);
crypto.encryptData(data).then(res => {
    console.log('encryptData', res);
});

// crypto.digestMessage("abc").then(res => {
//     console.log('digestMessage', res);
// });

// var encrypt = 'fmM8EFc5PY+8zR5VzdIAgB2JK1bGMJhweCkW7+G25JjVZWHspvkovlr/SWG9QCcP8PhtvtFXFdeKqYMrYh4KR8XkHwbZfHAxP49G4g/fJOzT9omASlCVe1XdrgjcH3NdexE/n2wDNzGWzjGSnpvMrOyWRAle2dEa/ijTajlcyY1/0viLm3nRwgVQnsMpL2RJpG5KKqvBNRaUx+hmcx9ZfN0P+SOXtJEp/cVhAfuLI02Zo/cB7UqvK1/G19p7EiJq6g5Z48ldwS4WmHhGbulhYy3dPZEVuw7+JRrXYkwrImg4Wmd0JLJJaHn11vOK17i14/7ag5NeXPsaI00jnkgXPw==';

// crypto.decryptData(encrypt).then(res => {
//     console.log('decryptData', res);
// });
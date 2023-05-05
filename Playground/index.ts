import * as crypto from "../src/subtleCrypto"

crypto.encryptData("abc").then(res=>{
    console.log('encryptData', res);
});

crypto.digestMessage("abc").then(res=>{
    console.log('digestMessage', res);
});
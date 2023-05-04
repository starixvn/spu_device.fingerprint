import * as crypto from "../src/subtleCrypto"

crypto.encryptData("abc").then(res=>{
    console.log(res);
});
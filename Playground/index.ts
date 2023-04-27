import * as globalFP from "../src/fp";
import * as cryptoJs from "../override/crypto-js"

globalFP.getFP(cryptoJs.MD5);

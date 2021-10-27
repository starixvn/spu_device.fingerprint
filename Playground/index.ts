import * as globalFP from "../src";
globalFP.getGFPId().then((res) => {
  console.log(res.Id);
  console.log(res.Properties);
});

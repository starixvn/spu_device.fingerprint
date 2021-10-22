import * as globalFP from "../src";
globalFP.fpGetId().then((res) => {
  console.log(res.Id);
  console.log(res.Properties);
});

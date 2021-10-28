import * as globalFP from "../src";
globalFP.getGFPId().then((res) => {
  document.getElementById("visitorId").innerHTML = res.Id;

  document
    .getElementById("elements")
    .appendChild(
      document.createTextNode(
        JSON.stringify(JSON.parse(res.Properties), null, 4)
      )
    );

  //console.log(res.Id);
  // console.log(
  //   globalFP.Encrypting(
  //     res.Properties,
  //     "wNvK6fr8JX+vVnYI0YrguI/PmrtH6B3fEm8YCMEBhYo="
  //   )
  // );
});

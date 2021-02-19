import { useState } from "react";

export const Test = () => {
  const [_result, _setResult] = useState("waiting");

  const _testOnClick = async () => {
    const r = await fetch("http://localhost:3000/api/test", {
      method: "GET",
    });
    // console.log("r");
    _setResult(await r.json());
  };
  return (
    <div>
      <button onClick={_testOnClick}>Test</button>
      <br />
      <b>result: </b>&nbsp;{JSON.stringify(_result)}
      {/* {_result} */}
    </div>
  );
};

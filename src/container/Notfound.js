import React from "react";
import { Route } from "react-router-dom";

function Status({ code, children }) {
  return (
    <Route
      render={({ staticContext }) => {
        if (staticContext) {
          staticContext.statusCode = code; // 404
        }
        return children;
      }}
    ></Route>
  );
}

function Notfound(props) {
  console.log("notfound", props);
  return (
    <Status code={404}>
      <h1>不好意思，这个页面太调皮，自己飞走了。。。</h1>
      <img id="img-404" src="/404.jpg" />
    </Status>
  );
}

export default Notfound;

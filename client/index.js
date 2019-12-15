// 此处的代码 会用babel处理
import React from "react";
import ReactDom from "react-dom";
import routes from "../src/App";
import { BrowserRouter, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { getClientStore } from "../src/store/store";
import Header from "../src/component/Header";
const store = getClientStore();

const Page = (
  <Provider store={store}>
    <BrowserRouter>
      <Header></Header>
      {routes.map(route => (
        <Route {...route}></Route>
      ))}
    </BrowserRouter>
  </Provider>
);

ReactDom.hydrate(Page, document.getElementById("root"));

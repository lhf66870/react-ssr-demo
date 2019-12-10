// 此处的代码 会用babel处理
import React from "react"
import ReactDom from "react-dom"

import App from "../src/App"

ReactDom.hydrate(App, document.getElementById("root"))

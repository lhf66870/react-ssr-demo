import React, { useState } from "react"

function App(props) {
  const [count, setCount] = useState(1)
  return (
    <div>
      <h1>
        Hello,{props.title} {count}号技师为您服务
      </h1>
      <button onClick={() => setCount(count + 1)}>点我试试</button>
    </div>
  )
}

export default <App title="4号美女顾客"></App>;

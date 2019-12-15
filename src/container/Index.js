import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { getIndexList } from "../store/index";
import User from "./User";
function Index(props) {
  const [count, setCount] = useState(1);
  useEffect(() => {
    if (!props.list.length) {
      props.getIndexList();
    }
  }, []);
  return (
    <div>
      <h1>
        Hello,{props.title} {count}号技师为您服务
      </h1>
      <button onClick={() => setCount(count + 1)}>点我试试</button>
      <br />
      <ul>
        {props.list.map(item => {
          return <li key={item.id}>{item.name}</li>;
        })}
      </ul>
      <User />
    </div>
  );
}

Index.loadData = store => {
  return store.dispatch(getIndexList());
};

export default connect(state => ({ list: state.index.list }), { getIndexList })(
  Index
);

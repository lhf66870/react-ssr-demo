import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { getIndexList } from "../store/index";
// import User from "./User";
import styles from "./Index.css";
import withStyle from "../withStyle";
// console.log(styles._getCss())
function Index(props) {
  // if (props.staticContext) {
  //   props.staticContext.css.push(styles.getCss());
  // }
  const [count, setCount] = useState(1);
  useEffect(() => {
    if (!props.list.length) {
      props.getIndexList();
    }
  }, []);
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        Hello,{props.title} {count}号技师为您服务
      </h1>
      <button onClick={() => setCount(count + 1)}>点我试试</button>
      <br />
      <ul>
        {props.list.map(item => {
          return <li key={item.id}>{item.name}</li>;
        })}
      </ul>
      {/* <User /> */}
    </div>
  );
}

Index.loadData = store => {
  return store.dispatch(getIndexList());
};

export default connect(state => ({ list: state.index.list }), { getIndexList })(
  withStyle(Index, styles)
);

import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { getUserInfo } from "../store/user";

function User(props) {
  console.log(props);
  useEffect(() => {
    if (!props.userInfo.name) {
      props.getUserInfo();
    }
  }, []);
  return (
    <div>
      <h1>
        Hello,{props.userInfo.name},你是{props.userInfo.base}!
      </h1>
    </div>
  );
}

User.loadData = store => {
  return store.dispatch(getUserInfo());
};

export default connect(state => ({ userInfo: state.user.userInfo }), {
  getUserInfo
})(User);

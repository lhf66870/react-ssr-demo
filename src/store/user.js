import axios from "axios";

const USER_INFO = "INDEX/USER_INFO";

const changeUserInfo = data => ({
  type: USER_INFO,
  userInfo: data
});

export const getUserInfo = server => {
  return (dispatch, getState, axiosInstance) => {
    return axios.get("/api/user/info").then(res => {
      const { data: userInfo } = res.data;
      console.log(userInfo);
      dispatch(changeUserInfo(userInfo));
    });
  };
};

const defaultState = {
  userInfo: {}
};
export default (state = defaultState, action) => {
  switch (action.type) {
    case USER_INFO:
      const newState = {
        ...state,
        userInfo: action.userInfo
      };
      return newState;

    default:
      return state;
  }
};

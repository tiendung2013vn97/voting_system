const init = {
  fullname: "",
  permission: "user",
  email: "",
  username: ""
};

const accountReducer = (state = init, action) => {
  switch (action.type) {
    case "UPDATE_ACCOUNT_INFO": {
      return {
        ...action.accountInfo
      };
    }
    case "LOG_OUT": {
      localStorage.clear();
      return {
        fullname: "",
        permission: "user",
        email: "",
        username: ""
      };
    }
    default: {
      return state;
    }
  }
};

export default accountReducer;

const init = {
    acToken: ,
    speakingTestSet: [],
    listeningTestAdd: {}
  };
  
  const ManageTestSetReducer = (state = init, action) => {
    switch (action.type) {
      case "UPDATE_ALL_LISTENING_TEST": {
        return {
          ...state,
          listeningTestSet: action.testSet
        };
      }
      case "UPDATE_ALL_SPEAKING_TEST": {
        return {
          ...state,
          speakingTestSet: action.testSet
        };
      }
      case "SEND_DATA_TO_PARENT_QUESTION_SET": {
        let listeningTestAdd = Object.assign({}, state.listeningTestAdd);
        listeningTestAdd[action.index] = action.data;
        return { ...state, listeningTestAdd };
      }
      case "RESET_LISTENING_ADD_TEST":{
        return{
          ...state,
          listeningTestAdd:{}
        }
      }
      default: {
        return state;
      }
    }
  };
  export default ManageTestSetReducer;
  
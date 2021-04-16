const initialState = {
  token: null,
  profile: undefined,
};

function user(state = initialState, action) {
  switch (action.type) {
    case 'UPDATE_USER': {
      return {
        ...state,
        ...action.payload
      };
    }
    case 'SIGN_OUT':
      return {
        ...state,
        ...action.payload
      };
    default:
      return state;
  }
}

export default user;

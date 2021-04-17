const UPDATE_USER = "UPDATE_USER";
const SIGN_OUT = "SIGN_OUT";

export default {
  updateUser: (data) => (dispatch) => {
    const actionData = {
      type: UPDATE_USER,
      payload: data,
    };
    dispatch(actionData);
  },

  signOut: () => ({
    type: SIGN_OUT,
    payload: {
      tokenExpiration: null,
      profile: null,
      token: null,
    },
  }),
};

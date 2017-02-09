import ActionTypes from '../constants/index';

const initialState = {
  user: {},
  access_token: '',
  isRemembered: false
};

export default (state = initialState, action = {}) => {
  switch (action.type) {

    case ActionTypes.SET_USER:
      return {
        ...state,
        user: action.payload
      };

    case ActionTypes.SET_ACCESS_TOKEN:
      return {
        ...state,
        access_token: action.payload
      };

    case ActionTypes.SET_IS_REMEMBERED:
      return {
        ...state,
        isRemembered: false
      };

    default:
      return state;
  }
};

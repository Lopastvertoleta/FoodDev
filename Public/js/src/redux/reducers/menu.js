import ActionTypes from '../constants/index';

const initialState = {
  menu: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.SET_MENU_ITEMS: return { ...state, menu: action.payload };
    default: return state;
  }
};

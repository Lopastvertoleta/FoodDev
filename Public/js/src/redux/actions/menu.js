import ActionTypes from '../constants/index';

export const fetchMenuItems = token => async (dispatch) => {
  const response = await fetch('/menuItems', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  if (response.status === 200) {
    const menuItems = await response.json();

    dispatch({ type: ActionTypes.SET_MENU_ITEMS, payload: menuItems });
  } else {
    console.log(response);
  }
}
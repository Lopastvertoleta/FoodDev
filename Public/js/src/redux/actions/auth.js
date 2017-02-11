import { hashHistory } from 'react-router';
import ActionTypes from '../constants/index';
import { fetchMenuItems } from './menu';

export const login = (email, password) => async (dispatch) => {
  try {
    const request = new XMLHttpRequest();

    request.onload = () => {
      if (request.status === 200) {
        const user = JSON.parse(request.response);
        dispatch({ type: ActionTypes.SET_USER, payload: user });
        dispatch({ type: ActionTypes.SET_ACCESS_TOKEN, payload: user.token || '' });
        hashHistory.push('main');
      }
      console.log(request)
    };
    request.open('POST', '/login');
    request.setRequestHeader('Content-Type', 'application/json');
    request.send(JSON.stringify({
      email,
      password
    }));
  } catch (error) {
    console.log(error);
  }
};

export const checkAuthentication = () => async (dispatch) => {
  try {
    const response = await fetch('/checkAuthentication', {
      credentials: 'same-origin'
    });
    if (response.status === 200) {
      const responseJSON = await response.json();
      dispatch(fetchMenuItems(responseJSON.token));
      dispatch({ type: ActionTypes.SET_IS_REMEMBERED, payload: true });
      dispatch({ type: ActionTypes.SET_ACCESS_TOKEN, payload: responseJSON.token });
    } else if (response.status === 403) {
      hashHistory.replace('/');
    } else {
      console.log(response);
    }
  } catch (error) {
    console.log(error);
  }
};

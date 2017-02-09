import { hashHistory } from 'react-router';
import ActionTypes from '../constants';

export const login = (email, password) => async (dispatch) => {
  try {
    const response = await fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        password
      }),
     // mode: 'no-cors',
    });

    if (response.status === 200) {
      const user = await response.json();
      dispatch({ type: ActionTypes.SET_USER, payload: user });
      dispatch({ type: ActionTypes.SET_ACCESS_TOKEN, payload: user.token || '' });
      hashHistory.push('main');
    } else {
      console.log(response/* .json()*/);
    }
  } catch (error) {
    console.log(error);
  }
};

export const checkAuthentication = () => async (dispatch) => {
  try {
    const response = await fetch('/checkAuthentication');
    console.log(response);
  } catch (error) {
    console.log(error);
  }
};

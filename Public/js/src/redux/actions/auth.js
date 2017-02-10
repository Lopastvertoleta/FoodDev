import { hashHistory } from 'react-router';
import ActionTypes from '../constants/index';

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
    // const response = await fetch('/login', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   credentials: 'same-origin',
    //   body: JSON.stringify({
    //     email,
    //     password
    //   }),
    //  // mode: 'no-cors',
    // });

    // if (response.status === 200) {
    //   const user = await response.json();
    //   dispatch({ type: ActionTypes.SET_USER, payload: user });
    //   dispatch({ type: ActionTypes.SET_ACCESS_TOKEN, payload: user.token || '' });
    //   hashHistory.push('main');
    // } else {
    //   console.log(response/* .json()*/);
    // }
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
      console.log(responseJSON)
      dispatch({ type: ActionTypes.SET_IS_REMEMBERED, payload: true });
      dispatch({ type: ActionTypes.SET_ACCESS_TOKEN, payload: responseJSON.token })
    } else {
      console.log(response);
    }
  } catch (error) {
    console.log(error);
  }
};

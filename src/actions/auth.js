import jwtDecode from 'jwt-decode';
import {SubmissionError} from 'redux-form';
import { AUTH_URL } from '../config';
import { normalizeResponseErrors } from './utils';
import {saveAuthToken, clearAuthToken} from '../local-storage';



export const SET_AUTH_TOKEN = 'SET_AUTH_TOKEN';
export const setAuthToken = (authToken) => ({
    type: SET_AUTH_TOKEN,
    authToken
});

export const CLEAR_AUTH = 'CLEAR_AUTH';
export const clearAuth = () => ({
    type: CLEAR_AUTH
});

export const AUTH_REQUEST = 'AUTH_REQUEST';
export const authRequest = () => ({
    type: AUTH_REQUEST
});

export const AUTH_SUCCESS = 'AUTH_SUCCESS';
export const authSuccess = (currentUser, loggedIn, showLoginForm) => ({
    type: AUTH_SUCCESS,
    currentUser,
    loggedIn,
    showLoginForm
});

export const AUTH_ERROR = 'AUTH_ERROR';
export const authError = (error) => ({
    type: AUTH_ERROR,
    error
});

export const LOGOUT_WARNING = 'LOGOUT_WARNING';
export const logoutWarning = (logoutWarning) => ({
    type: LOGOUT_WARNING,
    logoutWarning
});

export const LOGOUT = 'LOGOUT';
export const logOut = (loggedIn) => ({
    type: LOGOUT,
    loggedIn
});


// Stores the auth token in state and localStorage, and decodes and stores
// the user data stored in the token
const storeAuthInfo = (authToken, dispatch) => {
    const decodedToken = jwtDecode(authToken);
    dispatch(setAuthToken(authToken));
    dispatch(authSuccess(decodedToken.user));
    saveAuthToken(authToken);
};


export const login = (username, password) => (dispatch, getState) => {
  const authToken = getState().auth.authToken;
  dispatch(authRequest());
    return fetch(`${AUTH_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${authToken}`
            },
            body: JSON.stringify({
                username,
                password
            })
        })
        .then(res => normalizeResponseErrors(res))
        .then(res => res.json()) 
        .then(({authToken}) => storeAuthInfo(authToken, dispatch)) 
        .catch(err => {
          const {code} = err;
          const message = 
            code === 401
              ? "Incorrect username or password"
              : 'Unable to login, please try again';
            dispatch(authError(err));
            //Could not authenticate, so return a Submission Error for Redux form
            return Promise.reject(
              new SubmissionError({
                _error: message
              })
            );
        })
};

export const refreshAuthToken = () => (dispatch, getState) => {
  dispatch(authRequest());
  const authToken = getState().auth.authToken;
  return fetch(`${AUTH_URL}/refresh`, {
      method: 'POST',
      headers: {
          // Provide our existing token as credentials to get a new one
          Authorization: `Bearer ${authToken}`
      }
  })
  .then(res => normalizeResponseErrors(res))
  .then(res => res.json())
  .then(({authToken}) => storeAuthInfo(authToken, dispatch))
  .catch(err => {
      // We couldn't get a refresh token because our current credentials
      // are invalid or expired, or something else went wrong, so clear
      // them and sign us out
      dispatch(authError(err));
      dispatch(clearAuth());
      clearAuthToken(authToken);
  });
};
import {SubmissionError} from 'redux-form';

import {LOGIN_URL} from '../config';
import {normalizeResponseErrors} from './utils';

export const registerUser = user => (dispatch) => {
    return fetch(`${LOGIN_URL}`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(user)
    })
        .then(res => normalizeResponseErrors(res))
        .then(res => {
          if(!res.ok) {
            return Promise.reject(res.statusText)
          }
          return res.json()
        })
        .catch(err => {
            const {reason, message, location} = err;
            if (reason === 'ValidationError') {
                // Convert ValidationErrors into SubmissionErrors for Redux Form
                return Promise.reject(
                    new SubmissionError({
                        [location]: message
                    })
                );
            }
        });
};
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import thunk from 'redux-thunk';
// import { loadAuthToken } from './local-storage';
import authReducer from './reducers/auth-reducer';
// import {setAuthToken, refreshAuthToken} from './actions/auth';
import patientReducer from './reducers/patient-reducer';


// export default createStore(patientReducer, applyMiddleware(thunk));

const store = createStore(
    combineReducers({
        form: formReducer,
        patient: patientReducer,
        auth: authReducer,
    }), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(thunk)
);

// Hydrate the authToken from localStorage if it exist
// const authToken = loadAuthToken();
// if (authToken) {
//     const token = authToken;
//     store.dispatch(setAuthToken(token));
//     store.dispatch(refreshAuthToken());
// }

export default store;
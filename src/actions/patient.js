import { API_BASE_URL } from '../config';


export const PATIENTLIST_REQUEST_SENT = 'PATIENTLIST_REQUEST_SENT';
export const patientListRequestSent = (loading) => ({
    type: PATIENTLIST_REQUEST_SENT,
    loading
});

export const GET_PATIENTLIST_SUCCESS = 'GET_PATIENTLIST_SUCCESS';
export const getPatientListSuccess = (patientList, loading) => ({
    type: GET_PATIENTLIST_SUCCESS,
    patientList,
    loading
});

export const GET_PATIENTLIST_ERROR = 'GET_PATIENTLIST_ERROR';
export const getPatientListError = (error) => ({
    type: GET_PATIENTLIST_ERROR,
    error
});

export const SHOW_PATIENT_DASHBOARD= 'SHOW_PATIENT_DASHBOARD';
export const showPatientDashboard = () =>({
  type: SHOW_PATIENT_DASHBOARD,
  showPatientDashboard
});

export const SET_PATIENT_DASHBOARD = 'SET_PATIENT_DASHBOARD';
export const setPatientDashboard = (currentPatient, patientDashboard) => ({
    type: SET_PATIENT_DASHBOARD,
    currentPatient,
    patientDashboard,
    showPatientDashboard
});

export const GET_PATIENT_DASHBOARD = 'GET_PATIENT_DASHBOARD';
export const getPatientDashboard = (patientDashboard) => ({
    type: GET_PATIENT_DASHBOARD,
    patientDashboard
});

export const UPDATE_PATIENT_SUCCESS = 'UPDATE_PATIENT_SUCCESS';
export const updatePatientSuccess = (error, addMedication, addPatient) => ({
    type: UPDATE_PATIENT_SUCCESS, 
    error, 
    addMedication, 
    addPatient
});

export const UPDATE_PATIENT_ERROR = 'UPDATE_PATIENT_ERRORR';
export const updatePatientError = (error) => ({
    type: UPDATE_PATIENT_ERROR,
    error
});

export const SHOW_ADD_PATIENT_FORM = 'SHOW_ADD_PATIENT_FORM';
export const showAddPatientForm = () => ({
    type: SHOW_ADD_PATIENT_FORM,
});

export const ADD_MEDICATION = 'ADD_MEDICATION';
export const addMedication = (patientDashboard, addMedication) => ({
    type: ADD_MEDICATION,
    patientDashboard,
    addMedication
});

export const REMOVE_MEDICATION = 'REMOVE_MEDICATION';
export const removeMedication = (patientDashboard) => ({
    type: REMOVE_MEDICATION,
    patientDashboard
});

export const UPDATE_PATEINT = 'UPDATE_PATEINT';
export const updatePatient = (patientDashboard) => ({
    type: UPDATE_PATEINT,
    patientDashboard
});

export const ADD_NEW_PATIENT = 'ADD_NEW_PATIENT';
export const addNewPatient = (patientList, addPatient) => ({
    type: ADD_NEW_PATIENT,
    patientList,
    addPatient
});

export const SHOW_ADD_MEDS_FORM = 'SHOW_ADD_MEDS_FORM';
export const showAddMedsForm = (showAddMedsForm) => ({
    type: SHOW_ADD_MEDS_FORM,
    showAddMedsForm
});

export const SHOW_PATIENT_LIST = 'SHOW_PATIENT_LIST';
export const showPatientList = () => ({
    type: SHOW_PATIENT_LIST,
});


//fetch list of all patients, medications, pharmacy and physician
export const getPatientList = () => (dispatch) => {
    dispatch(patientListRequestSent());
    return fetch(`${API_BASE_URL}/patient`, {
            method: 'GET',
            headers: {
                'content-Type': 'application/json' },
        })
        .then(res => {
            if (!res.ok) {
                return Promise.reject(res.statusText);
            }
            return res.json();
        })
        .then(list => {
            dispatch(getPatientListSuccess(list));
        })
        .catch(err => {
            dispatch(getPatientListError());
        })
}


//update the local store to add medication, 
//then update the patient database with new medication
export const addToDashboard = (values) => (dispatch, getState) => {
        const id = values.id;
        dispatch(patientListRequestSent());
        return fetch(`${API_BASE_URL}/patient/`+ id , {
                method: 'PUT',
                headers: {
                    'content-Type': 'application/json'
                },
                body: JSON.stringify(values)
            }) //end fetch
            .then(res => {
                if (!res.ok) {
                    return Promise.reject(res.statusText)
                }
                return res.json();
            })
            .then(({ patientData }) => dispatch(updatePatientSuccess()))
            .catch(err => {
                dispatch(updatePatientError(err));
            });
    } //end addMedication


//update the local store to remove medication, then update the patient database
export const removeFromDashboard = (values, currentPatient) => dispatch => {
        dispatch(removeMedication(values));
        dispatch(patientListRequestSent());
        const obj = {"name":currentPatient};
        const id = values.id
        return fetch(`${API_BASE_URL}/patient/` + id, {
                method: 'PUT',
                headers: {
                    'content-Type': 'application/json'
                },
                body: JSON.stringify(obj)
            }) //end fetch
            .then(res => {
                if (!res.ok) {
                    return Promise.reject(res.statusText)
                }
                return res.json();
            })
            .then(({ patientData }) => dispatch(updatePatientSuccess()))
            .catch(err => {
                dispatch(updatePatientError(err));
            });
    } //end removeMedication


//add new patient
export const addToPatientList = (values) => dispatch => {
        dispatch(patientListRequestSent());
        return fetch(`${API_BASE_URL}/patient`, {
                method: 'POST',
                headers: {
                    'content-Type': 'application/json'
                },
                body: JSON.stringify(values)
            }) //end fetch
            .then(res => {
                if (!res.ok) {
                    return Promise.reject(res.statusText)
                }
                return res.json();
            })
            .then(({patientSuccess}) => dispatch(updatePatientSuccess()))
            .then(({patientData}) => dispatch(getPatientList()))
            .then(({patientList}) => dispatch(showPatientDashboard()))
            .catch(err => {
                dispatch(getPatientListError(err));
            });
    } //end updatePatient
import {
    ADD_REALTIME, 
    GET_REALTIME,
    REALTIME_ERROR
} from '../constants/constants';
import { setAlert } from './alert';
import axios from 'axios';

export const addRealtimeSetting = (formData) => async (dispatch) => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        },
    }
    try {
        const res = await axios.post('/api/realtimeSetting', formData, config);

        dispatch({
            type: ADD_REALTIME,
            payload: res.data,
        });
        dispatch(setAlert('Save Realtime Setting successful', 'success'))
    } catch (err) {

        dispatch({
            type: REALTIME_ERROR,
        });
    }
};

export const getRealtimeSetting = () => async (dispatch) => {
    try {
        const res = await axios.get('/api/realtimeSetting');
        dispatch({
            type: GET_REALTIME,
            payload: res.data
        })
    } catch (err) {
    dispatch({
        type: REALTIME_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
        })
    }
}
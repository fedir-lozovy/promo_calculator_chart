import axios from 'axios'

import moment from 'moment';

export const CALCULATE_SUCCESS = 'CALCULATE_SUCCESS'
export const CALCULATE_ERROR = 'CALCULATE_ERROR'

export const calculate = (target) => {
    return (dispatch) => {
        dispatch({
            type: CALCULATE_SUCCESS,
            control:target.id,
            value:target.value
        });
    }
}
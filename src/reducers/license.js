import { handleActions } from 'redux-actions';
import actions from '../actions';

const defaultState = {
    userId: '',
    year: 'ALL',
    month: 'ALL'
};

export default handleActions({
    //============================================================
    [actions.license.set]: (state, { payload: { object } }) => {
        return {
            ...state,
            ...object,
        };
    },
    //============================================================
    [actions.license.setUserId]: (state, { payload: { userId } }) => {
        return {
            ...state,
            userId,
        };
    },
    //============================================================
    [actions.license.setYear]: (state, { payload: { year } }) => {
        return {
            ...state,
            year,
        };
    },
    //============================================================
    [actions.license.setMonth]: (state, { payload: { month } }) => {
        return {
            ...state,
            month,
        };
    },
    //============================================================
}, defaultState);

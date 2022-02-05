import { handleActions } from 'redux-actions';
import actions from '../actions';

const today = new Date();

const defaultState = {
    userId: 'ALL',
    year: String(today.getFullYear()),
    month: String(today.getMonth() + 1),
    items: [],
};

export default handleActions({
    //============================================================
    [actions.timecard.set]: (state, { payload: { object } }) => {
        return object;
    },
    //============================================================
    [actions.timecard.setUserId]: (state, { payload: { userId } }) => {
        return {
            ...state,
            userId,
        };
    },
    //============================================================
    [actions.timecard.setYear]: (state, { payload: { year } }) => {
        return {
            ...state,
            year,
        };
    },
    //============================================================
    [actions.timecard.setMonth]: (state, { payload: { month } }) => {
        return {
            ...state,
            month,
        };
    },
    //============================================================
}, defaultState);

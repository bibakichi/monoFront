import { handleActions } from 'redux-actions';
import actions from '../actions';

const today = new Date();

const defaultState = {
    userId: '',
    year: String(today.getFullYear()),
    month: String(today.getMonth() + 1),
    date: 'ALL',
    area: {
        "軽作業エリア": true,
        "金属エリア": false,
        "木工エリア": false,
        "電子工作室": false,
        "ミーティングルーム": false,
    },
    areaState: {
        "軽作業エリア": {
            num: 1,
            full: true,
        },
        "金属エリア": {
            num: 2,
            full: false,
        },
        "木工エリア": {
            num: 3,
            full: true,
        },
        "電子工作室": {
            num: 4,
            full: false,
        },
        "ミーティングルーム": {
            num: 6,
            full: false,
        },
    },
};

export default handleActions({
    //============================================================
    [actions.frontPortal.init]: (state) => {
        return {
            ...state,
            userId: '',
            area: {
                "軽作業エリア": !state?.areaState["軽作業エリア"]?.full,
                "金属エリア": false,
                "木工エリア": false,
                "電子工作室": false,
                "ミーティングルーム": false,
            },
        };
    },
    //============================================================
    [actions.timecard.set]: (state, { payload: { object } }) => {
        return {
            ...state,
            ...object,
        };
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
    [actions.timecard.setDate]: (state, { payload: { date } }) => {
        return {
            ...state,
            date,
        };
    },
    //============================================================
    [actions.timecard.setArea]: (state, { payload: { areaName, value } }) => {
        return {
            ...state,
            area: {
                ...state.area,
                [areaName]: value ? true : false,
            },
        };
    },
    //============================================================
}, defaultState);

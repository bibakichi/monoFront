import { handleActions } from 'redux-actions';
import actions from '../actions';

const defaultState = {
    ready: false,
    filter: {
        userId: 'ALL',
        year: '',
        month: '',
    },
    items: [],
    machinesRecords: [],
};

export default handleActions({
    //============================================================
    [actions.user.timecard.get]: (state) => {
        return {
            ...state,
            ready: false,
        };
    },
    //============================================================
    [actions.user.timecard.set]: (state, { payload: { object } }) => {
        return {
            ...state,
            ...object,
            ready: true,
            machinesRecords: getMachinesRecords(object.items),
        };
    },
    //============================================================
    [actions.user.timecard.filter.setUserId]: (state, { payload: { userId } }) => {
        return {
            ...state,
            filter: {
                ...state.filter,
                userId,
            },
        };
    },
    //============================================================
    [actions.user.timecard.filter.setYear]: (state, { payload: { year } }) => {
        return {
            ...state,
            filter: {
                ...state.filter,
                year,
            },
        };
    },
    //============================================================
    [actions.user.timecard.filter.setMonth]: (state, { payload: { month } }) => {
        return {
            ...state,
            filter: {
                ...state.filter,
                month,
            },
        };
    },
    //============================================================
}, defaultState);

const getMachinesRecords = (items) => {
    const machinesRecords = [];
    for (const item of items) {
        console.log(item.equipments);
        if (typeof item.equipments !== "object") {
            break;
        }
        if (Object.keys(item.equipments).length === 0) {
            break;
        }
        if (!machinesRecords[item.date - 1]) {
            machinesRecords[item.date - 1] = {
                "年": item.year,
                "月": item.month,
                "日": item.date,
            };
        }
        for (const equipment in item.equipments) {
            if (!machinesRecords[item.date - 1][equipment]) {
                machinesRecords[item.date - 1][equipment] = 0;
            }
            machinesRecords[item.date - 1][equipment]++;
        }
    }
    return machinesRecords.filter(machinesRecord => machinesRecord);
}
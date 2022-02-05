import { handleActions } from 'redux-actions';
import actions from '../actions';

const defaultState = {
    ready: false,
    rows: [],
};

export default handleActions({
    //============================================================
    [actions.timecard.get]: (state) => {
        return {
            ...state,
            ready: false,
        };
    },
    //============================================================
    [actions.timecard.set]: (state, { payload: { object } }) => {
        const dateMap = {};
        for (const item of object.items) {
            if (typeof item.machines !== "object") {
                continue;
            }
            if (Object.keys(item.machines).length === 0) {
                continue;
            }
            for (const machine in item.machines) {
                if (!item.machines[machine]) {
                    continue;
                }
                if (!dateMap[item.dateString]) {
                    dateMap[item.dateString] = {
                        "日時": item.dateString,
                    };
                }
                if (!dateMap[item.dateString][machine]) {
                    dateMap[item.dateString][machine] = 0;
                }
                dateMap[item.dateString][machine]++;
            }
        }
        return {
            ready: true,
            rows: Object.keys(dateMap).map(dateString => dateMap[dateString]),
        };
    },
    //============================================================
}, defaultState);

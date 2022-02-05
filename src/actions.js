import { createActions } from 'redux-actions'

export default createActions({
    EVENT: {
        GET_MONTH: (year, month) => ({ year, month }),
    },
    FRONT_PORTAL: {
        INIT: () => ({}),
        NEXT: () => ({}),
        BACK: () => ({}),
        SELECT_NEW_USER: () => ({}),
        SELECT_RESERVED: () => ({}),
        SELECT_NOT_RESERVED: () => ({}),
        SELECT_LARGE_PRINT: () => ({}),
        FORGET_CARD: () => ({}),
    },
    TIMECARD: {
        GET: () => ({}),
        SET: (object) => ({ object }),
        SET_USER_ID: (userId) => ({ userId }),
        SET_YEAR: (year) => ({ year }),
        SET_MONTH: (month) => ({ month }),
        SET_AREA: (areaName, value) => ({ areaName, value }),
    },
})
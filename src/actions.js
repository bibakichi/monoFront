import { createActions } from 'redux-actions'

export default createActions({
    FRONT_PORTAL: {
        SET_INPUT_TEXT: (inputText) => ({ inputText }),
        SUBMIT_INPUT_TEXT: () => ({}),
        INIT: () => ({}),
        NEXT: () => ({}),
        BACK: () => ({}),
        SET_NEXT_BUTTON_ENABLE: (enable) => ({ enable }),
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
        SET_DATE: (date) => ({ date }),
        SET_AREA: (areaName, value) => ({ areaName, value }),
    },
    LICENSE: {
        GET: () => ({}),
        SET: (object) => ({ object }),
        SET_USER_ID: (userId) => ({ userId }),
        SET_YEAR: (year) => ({ year }),
        SET_MONTH: (month) => ({ month }),
    },
    EVENT: {
    },
})
import { createActions } from 'redux-actions'

export default createActions({
    CARD_READER: {
        SET_USER_ID: (userId) => ({ userId }),
    },
    EVENT: {
        GET_MONTH: (year, month) => ({ year, month }),
    },
    LICENSE: {
        GET: (userId) => ({ userId }),
    },
    TIMECARD: {
        SET_USER_ID: (userId) => ({ userId }),
        SET_YEAR: (year) => ({ year }),
        SET_MONTH: (month) => ({ month }),
        GET: () => ({}),
        SET: (object) => ({ object }),
    },
})
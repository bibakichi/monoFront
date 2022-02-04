import { createActions } from 'redux-actions'

export default createActions({
    EVENT: {
        GET_MONTH: (year, month) => ({ year, month }),
    },
    USER: {
        LICENSE: {
            GET: (userId) => ({ userId }),
        },
        TIMECARD: {
            FILTER: {
                SET_USER_ID: (userId) => ({ userId }),
                SET_YEAR: (year) => ({ year }),
                SET_MONTH: (month) => ({ month }),
            },
            GET: () => ({}),
            SET: (object) => ({ object }),
        },
    },
})
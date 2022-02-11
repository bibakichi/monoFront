import { createActions } from 'redux-actions'

export default createActions({
    IMAGE_UPLOADER: {
        REPLACE: (beforeUrl, afterUrl, file) => ({ beforeUrl, afterUrl, file }),
        UPLOADED: (success, url) => ({ success, url }),
    },
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
    LINKS: {
        GET: () => ({}),
        POST: () => ({}),
        DELETE: () => ({}),
        SET_ALL: (items) => ({ items }),
        SET_ALL_BY_CATEGORIZED: (categorizedData) => ({ categorizedData }),
        OPEN_DIALOG: (category, index) => ({ category, index }),
        CLOSE_DIALOG: () => ({}),
        EDIT: (key, value) => ({ key, value }),
        MOVE: (ballItem, catcherItem) => ({ ballItem, catcherItem }),
    },
})
import { createActions } from 'redux-actions'

export default createActions({
    IMAGE_UPLOADER: {
        REPLACE: (beforeUrl, afterUrl, file) => ({ beforeUrl, afterUrl, file }),
        UPLOADED: (success, url) => ({ success, url }),
    },
    LINKS: {
        GET: () => ({}),
        POST: () => ({}),
        DELETE: (category, index) => ({ category, index }),
        SET_ALL: (items) => ({ items }),
        SET_ALL_BY_CATEGORIZED: (categorizedData) => ({ categorizedData }),
        OPEN_DIALOG: (category, index) => ({ category, index }),
        CLOSE_DIALOG: () => ({}),
        EDIT: (key, value) => ({ key, value }),
        MOVE: (ballItem, catcherItem) => ({ ballItem, catcherItem }),
    },
})
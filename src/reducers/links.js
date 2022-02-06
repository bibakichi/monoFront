import { handleActions } from 'redux-actions';
import actions from '../actions';

const defaultState = {
    category: '事務',
    linkId: '',
    title: '',
    imageUrl: '',
    url: '',
    text: '',
    newLinkId: 0,
    items: [],
    categorizedItems: {},
};

export default handleActions({
    //============================================================
    [actions.links.set]: (state, { payload: { items } }) => {
        const categorized = {};
        let newLinkId = 1;
        for (const item of items) {
            if (newLinkId <= item.linkId) {
                newLinkId = item.linkId + 1;
            }
            if (!categorized[item.category]) {
                categorized[item.category] = [];
            }
            categorized[item.category].push(item);
        }
        return {
            ...defaultState,
            newLinkId,
            items,
            categorizedItems: categorized,
        };
    },
    //============================================================
    [actions.links.setNewLinkId]: (state) => {
        return {
            ...state,
            linkId: state.newLinkId,
            category: '事務',
            title: '',
            imageUrl: '',
            url: '',
            text: '',
        };
    },
    //============================================================
    [actions.links.setCategory]: (state, { payload: { category } }) => {
        return {
            ...state,
            category,
        };
    },
    //============================================================
    [actions.links.setLinkId]: (state, { payload: { linkId } }) => {
        for (const item of state.items) {
            if (item?.linkId !== linkId) {
                continue;
            }
            return {
                ...state,
                linkId,
                category: item?.category,
                title: item?.title,
                imageUrl: item?.imageUrl,
                url: item?.url,
                text: item?.text,
            };
        }
        return {
            ...state,
            linkId,
        }
    },
    //============================================================
    [actions.links.setTitle]: (state, { payload: { title } }) => {
        return {
            ...state,
            title,
        };
    },
    //============================================================
    [actions.links.setImageUrl]: (state, { payload: { imageUrl } }) => {
        return {
            ...state,
            imageUrl,
        };
    },
    //============================================================
    [actions.links.setUrl]: (state, { payload: { url } }) => {
        return {
            ...state,
            url,
        };
    },
    //============================================================
    [actions.links.setText]: (state, { payload: { text } }) => {
        return {
            ...state,
            text,
        };
    },
    //============================================================
}, defaultState);

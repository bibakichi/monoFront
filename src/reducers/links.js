import { handleActions } from 'redux-actions';
import actions from '../actions';

const defaultState = {
    openDialog: false,
    select: {
        new: true,
        category: '',
        index: 0,
    },
    newItem: {
        category: '商品',
        order: null,
        text: '',
        title: '',
        subTitle: '',
        url: '',
        image1: '',
        image2: '',
        image3: '',
        image4: '',
    },
    categories: {},
};

export default handleActions({
    //============================================================
    [actions.links.setAll]: (state, { payload: { items } }) => {
        const categorized = {};
        for (const item of items) {
            if (!categorized[item.category]) {
                categorized[item.category] = [];
            }
            categorized[item.category].push(item);
        }
        return {
            ...defaultState,
            categories: categorized,
        };
    },
    //============================================================
    [actions.links.setAllByCategorized]: (state, { payload: { categorizedData } }) => {
        return {
            ...defaultState,
            categories: categorizedData,
        };
    },
    //============================================================
    [actions.links.openDialog]: (state, { payload: { category, index } }) => {
        const items = state.categories[category];
        return {
            ...state,
            openDialog: true,
            select: {
                new: (!category) || (index === null) || (index >= items?.length),
                category,
                index,
            },
        };
    },
    //============================================================
    [actions.links.closeDialog]: (state) => {
        return {
            ...state,
            openDialog: false,
        };
    },
    //============================================================
    [actions.links.edit]: (state, { payload: { key, value } }) => {
        if (state?.select?.new) {
            //新しい項目を作成しているとき
            return {
                ...state,
                newItem: {
                    ...state.newItem,
                    [key]: value,
                },
            };
        }
        else {
            //既存の項目を編集しているとき
            const selectCategory = state?.select?.category;   //選択中のカテゴリ
            const selectIndex = state?.select?.index;   //選択中の番号
            const items = [
                ...state.categories[selectCategory]
            ];
            items[selectIndex] = {
                ...state.categories[selectCategory][selectIndex],
                [key]: value,
            };
            return {
                ...state,
                categories: {
                    ...state.categories,
                    [selectCategory]: items,
                },
            };
        }
    },
    //============================================================
}, defaultState);

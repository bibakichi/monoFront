
import { handleActions } from 'redux-actions';
import actions from '../actions';

//それぞれの画面で「次へ」ボタンが押せるかどうか
const nextButtonEnables = {
    "ENTRANCE": false,
    "SELECT_AREA": true,
    "CARD_READER": false,
    "FORGET_CARD": true,
    "SELECT_VISIT_ALONE": false,
    "COMPLETE": false,
    "COMPLETE_VISIT_ALONE": false,
    "COMPLETE_VISIT_TOGETHER": false,
    "COMPLETE_LARGE_PRINTER": false,
};

const defaultState = {
    inputText: '',
    step: 0,
    reserved: false,
    pageIds: [
        "ENTRANCE",
        "SELECT_AREA",
        "CARD_READER",
        "COMPLETE",
    ],
    nextButtonEnable: false,
}

export default handleActions({
    //============================================================
    [actions.frontPortal.setInputText]: (state, { payload: { inputText } }) => {
        return {
            ...state,
            inputText,
        };
    },
    //============================================================
    [actions.frontPortal.init]: (state) => {
        return defaultState;
    },
    //============================================================
    [actions.frontPortal.next]: (state) => {
        // 「次へ」ボタンが押されたとき
        let step = state.step + 1;
        let pageIds = state.pageIds;
        if (step >= pageIds.length) {
            step = 0;
            pageIds = defaultState.pageIds;
        }
        return {
            ...state,
            step,
            pageIds,
            nextButtonEnable: nextButtonEnables[pageIds[step]],
        };
    },
    //============================================================
    [actions.frontPortal.back]: (state) => {
        // 「戻る」ボタンが押されたとき
        let step = state.step - 1;
        let pageIds = state.pageIds;
        if (step <= 0) {
            step = 0;
            pageIds = defaultState.pageIds;
        }
        return {
            ...state,
            step,
            pageIds,
            nextButtonEnable: nextButtonEnables[pageIds[step]],
        };
    },
    //============================================================
    [actions.frontPortal.setNextButtonEnable]: (state, { payload: { enable } }) => {
        return {
            ...state,
            nextButtonEnable: nextButtonEnables[state.pageIds[state.step]] && enable,
        };
    },
    //============================================================
    [actions.frontPortal.selectNewUser]: (state) => {
        // 「はじめて」ボタンが押されたとき
        const step = state.step + 1;
        const pageIds = state.pageIds.slice(0, step);
        //pageIds.push("SELECT_VISIT_ALONE");          //見学のときに１人がいいのか尋ねる
        pageIds.push("COMPLETE_VISIT_TOGETHER");     //完了画面を表示
        return {
            ...state,
            step,
            pageIds,
            nextButtonEnable: nextButtonEnables[pageIds[step]],
        };
    },
    //============================================================
    [actions.frontPortal.selectLargePrint]: (state) => {
        // 「大判プリント」ボタンが押されたとき
        const step = state.step + 1;
        const pageIds = state.pageIds.slice(0, step);
        pageIds.push("COMPLETE_LARGE_PRINTER");    //完了画面を表示
        return {
            ...state,
            step,
            pageIds,
            nextButtonEnable: nextButtonEnables[pageIds[step]],
        };
    },
    //============================================================
    [actions.frontPortal.selectReserved]: (state) => {
        // 「予約済み」ボタンが押されたとき
        const step = state.step + 1;
        const pageIds = state.pageIds.slice(0, step);
        pageIds.push("CARD_READER");  //学生証を読み取る
        pageIds.push("COMPLETE");     //完了画面を表示
        return {
            ...state,
            reserved: true,
            step,
            pageIds,
            nextButtonEnable: nextButtonEnables[pageIds[step]],
        };
    },
    //============================================================
    [actions.frontPortal.selectNotReserved]: (state) => {
        // 「予約していない」ボタンが押されたとき
        const step = state.step + 1;
        const pageIds = state.pageIds.slice(0, step);
        pageIds.push("CARD_READER");  //学生証を読み取る
        pageIds.push("SELECT_AREA");  //作業エリアを選択させる
        pageIds.push("COMPLETE");     //完了画面を表示
        return {
            ...state,
            reserved: false,
            step,
            pageIds,
            nextButtonEnable: nextButtonEnables[pageIds[step]],
        };
    },
    //============================================================
    [actions.frontPortal.forgetCard]: (state) => {
        // 「学生証を持っていない」ボタンが押されたとき
        const step = state.step + 1;
        const pageIds = state.pageIds.slice(0, step);
        pageIds.push("FORGET_CARD");  //学生証を読み取る
        pageIds.push("COMPLETE");     //完了画面を表示
        return {
            ...state,
            step,
            pageIds,
            nextButtonEnable: nextButtonEnables[pageIds[step]],
        };
    },
    //============================================================
}, defaultState);

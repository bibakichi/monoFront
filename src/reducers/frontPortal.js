
import { handleActions } from 'redux-actions';
import actions from '../actions';

//それぞれの画面で「次へ」ボタンが押せるかどうか
const nextButtonEnables = {
    "ENTRANCE": false,
    "SELECT_AREA": true,
    "CARD_READER": false,
    "COMPLETE": true,
    "SELECT_VISIT_ALONE": false,
    "COMPLETE_VISIT_ALONE": false,
    "COMPLETE_VISIT_TOGETHER": false,
    "COMPLETE_LARGE_PRINTER": false,
};

const defaultState = {
    step: 0,
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
    [actions.frontPortal.init]: (state) => {
        return defaultState;
    },
    //============================================================
    [actions.frontPortal.next]: (state) => {
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
        pageIds.push("SELECT_AREA");  //作業エリアを選択させる
        pageIds.push("CARD_READER");  //学生証を読み取る
        pageIds.push("COMPLETE");     //完了画面を表示
        return {
            ...state,
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
    [actions.timecard.setUserId]: (state, { payload: { userId } }) => {
        switch (state.pageIds[state.step]) {
            case "STAND_BY":
                break;
            case "ENTRANCE":
                break
            case "BEGINER_SELECT_ALONE":
                break;
            default:
        }
        return state;
    },
    //============================================================
}, defaultState);

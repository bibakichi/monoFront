
import { put, select } from 'redux-saga/effects';
import axios from 'axios';
import actions from '../actions';

export default function* getTimecard() {
    let userId = yield select(state => state.timecard.userId);
    let year = yield select(state => state.timecard.year);
    let month = yield select(state => state.timecard.month);
    userId = (userId === "全") ? "ALL" : convertHankaku(userId);
    year = (year === "全") ? "ALL" : convertHankaku(year);
    month = (month === "全") ? "ALL" : convertHankaku(month);
    let url = 'https://rrzvkjke5e.execute-api.ap-northeast-1.amazonaws.com/production/users/';
    url += userId + '/timecard?';
    url += year ? ('year=' + year + '&') : '';
    url += month ? ('month=' + month) : '';
    console.log("ロード開始 " + url);
    try {
        const res = yield axios.get(url);
        console.log("ロード完了");
        yield put(actions.timecard.set(res.data));
    }
    catch (e) {
        console.log('ロード中にエラー発生 : ' + e);
    }
}


const convertHankaku = (str) => {
    if (typeof str === "number") {
        return String(str);
    }
    else if (typeof str !== "string") {
        return "";
    }
    return str.replace(/[Ａ-Ｚａ-ｚ０-９]/g, function (s) {
        return String.fromCharCode(s.charCodeAt(0) - 0xFEE0);
    });
}
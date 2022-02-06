
//yield put({type:'ACTION', ...})   ActionをDispatchする
//yield take(['ACTION'])            指定のActionがDispatchされるまで待つ
//yield takeEvery('ACTION', func)   ActionがDispatchされたら、毎回関数を呼び出すように設定する（同じActionが複数回来た場合は、並列で処理を行う）
//yield call(func, args)            関数をを呼び出して、終了を待つ（関数から戻り値を貰える）
//yield fork(func)                  バックグラウンド処理を開始する。（終了は待たない）
//yield select(selector関数, args)  storeからデータを取りたい
//takeLatest                        処理をキャンセルし、新しい処理を行う
//axios.get(..)                     GET関数とかをコール

import { takeEvery, select, put } from 'redux-saga/effects';
import actions from '../actions';
import getTimecard from './getTimecard';
import getLicense from './getLicense';
//import deletePenFn from './actionTrigger/deletePen'

export default function* rootSaga() {
    yield takeEvery(actions.timecard.get, getTimecard);
    yield takeEvery(actions.license.get, getLicense);
    yield takeEvery(actions.frontPortal.submitInputText, submitInputText);
}

function* submitInputText() {
    let inputText = yield select(state => state.frontPortal.inputText);
    inputText = convertHankaku(inputText);
    const array = inputText.split(',');
    const userId = formatID(array[0]);
    //const userName = (array.length > 1) ? array[1] : '';
    //
    yield put(actions.frontPortal.setInputText(''));  //テキストエリアを空にする
    if (userId === '') {
        alert('入力された学籍番号は無効な書式です。スタッフを呼んでください。');
        return;
    }
    yield put(actions.license.setUserId(userId));
    yield put(actions.license.setYear('ALL'));
    yield put(actions.license.setMonth('ALL'));
    yield put(actions.license.get());
    //
    yield put(actions.timecard.setUserId(userId));
    yield put(actions.timecard.setYear('ALL'));
    yield put(actions.timecard.setMonth('ALL'));
    yield put(actions.timecard.setDate('ALL'));
    yield put(actions.timecard.get());
}

//文字列を0で埋める関数
//numにオリジナルの数字を、lengthに桁数をいれてください。
function zeroPadding(num, length) {
    return ('0000000000' + num).slice(-length);
}

//学籍番号を整形する関数
function formatID(id) {
    if (id === '' || id === null) {
        return '';
    }
    id = zeroPadding(id, 8);
    id = id.toUpperCase();
    let ok = id.match("^(([A-Z]{2}|[a-z]{2}|(00))[0-9]{6})$");  //正規表現
    if (ok === null) {
        return '';
    }
    return id;
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
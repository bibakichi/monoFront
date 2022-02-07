
import { select, put } from 'redux-saga/effects';
import axios from 'axios';
import actions from '../../actions';

export default function* postLink() {
    const newFlag = yield select(state => state?.links?.select?.new);
    const selectCategory = yield select(state => state?.links?.select?.category);
    const newItem = yield select(state => state?.links?.newItem);
    const categories = yield select(state => state?.links?.categories);
    //
    console.log("アップロード開始");
    try {
        const res = yield axios.post(
            'https://rrzvkjke5e.execute-api.ap-northeast-1.amazonaws.com/production/links',
            newFlag ? newItem : categories[selectCategory],
        );
        if (typeof res.data === "string") {
            console.log('サーバーエラー：' + res.data);
            alert('サーバーエラー');
            return;
        }
        console.log("アップロード完了");
        yield put(actions.links.setAll(res.data));
    }
    catch (e) {
        alert('ネットワークエラー');
        console.log('アップロード中にエラー発生 : ' + e);
    }
}


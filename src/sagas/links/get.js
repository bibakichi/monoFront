
import { put } from 'redux-saga/effects';
import axios from 'axios';
import actions from '../../actions';

export default function* getLinks() {
    let url = 'https://rrzvkjke5e.execute-api.ap-northeast-1.amazonaws.com/production/links';
    //
    console.log("ロード開始 " + url);
    try {
        const res = yield axios.get(url);
        if (typeof res.data === "string") {
            console.log('サーバーエラー：' + res.data);
            alert('サーバーエラー');
            return;
        }
        console.log("ロード完了");
        yield put(actions.links.setAll(res.data));
    }
    catch (e) {
        alert('ネットワークエラー');
        console.log('ロード中にエラー発生 : ' + e);
    }
}

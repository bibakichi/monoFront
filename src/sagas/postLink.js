
import { select, put } from 'redux-saga/effects';
import axios from 'axios';
import actions from '../actions';

export default function* postLink() {
    const linkId = yield select(state => state.links.linkId);
    const category = yield select(state => state.links.category);
    const title = yield select(state => state.links.title);
    const imageUrl = yield select(state => state.links.imageUrl);
    const url = yield select(state => state.links.url);
    const text = yield select(state => state.links.text);
    //
    console.log("アップロード開始");
    try {
        const res = yield axios.post(
            'https://rrzvkjke5e.execute-api.ap-northeast-1.amazonaws.com/production/links',
            {
                category,
                linkId,
                title,
                imageUrl,
                url,
                text,
            }
        );
        if (typeof res.data === "string") {
            console.log('サーバーエラー：' + res.data);
            alert('サーバーエラー');
            return;
        }
        console.log("アップロード完了");
        yield put(actions.links.set(res.data));
    }
    catch (e) {
        alert('ネットワークエラー');
        console.log('アップロード中にエラー発生 : ' + e);
    }
}


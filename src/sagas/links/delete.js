
import { select, put } from 'redux-saga/effects';
import axios from 'axios';
import actions from '../../actions';

export default function* deleteLink({ payload: { category, index } }) {
    const categories = yield select(state => state?.links?.categories);
    //
    console.log("削除開始");
    try {
        const res = yield axios.delete(
            'https://rrzvkjke5e.execute-api.ap-northeast-1.amazonaws.com/production/links?'
            + 'category=' + category
            + '&order=' + categories[category][index].order
        );
        if (typeof res.data === "string") {
            console.log('サーバーエラー：' + res.data);
            alert('サーバーエラー');
            return;
        }
        console.log("削除完了");
        yield put(actions.links.setAll(res.data));
    }
    catch (e) {
        alert('ネットワークエラー');
        console.log('削除中にエラー発生 : ' + e);
    }
}


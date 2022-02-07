
import { select, put } from 'redux-saga/effects';
import axios from 'axios';
import actions from '../../actions';

export default function* deleteLink() {
    const newFlag = yield select(state => state?.links?.select?.new);
    const categories = yield select(state => state?.links?.categories);
    const selectCategory = yield select(state => state?.links?.select?.category);
    const selectIndex = yield select(state => state?.links?.select?.index);
    //
    if (newFlag) {
        alert('エラー：newFlagがtrueなのに削除しようとしました');
    }
    console.log("削除開始");
    try {
        const res = yield axios.delete(
            'https://rrzvkjke5e.execute-api.ap-northeast-1.amazonaws.com/production/links?'
            + 'category=' + selectCategory
            + '&order=' + categories[selectCategory][selectIndex].order
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


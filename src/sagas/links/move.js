
import { select, put } from 'redux-saga/effects';
import update from 'immutability-helper';
import axios from 'axios';
import actions from '../../actions';

export default function* moveLink({ payload: { ballItem, catcherItem } }) {
    //###########################################################################
    // 移動処理
    //
    const categories = yield select(state => state?.links?.categories);
    //
    // ballItem.index番目から　１個消す
    let array1 = categories[ballItem.category];
    array1 = update(array1, { $splice: [[ballItem.index, 1]] });
    categories[ballItem.category] = array1;
    //
    // catcherItem.index番目から　０個消して　ballItemを追加
    const newBallItem = {
        ...ballItem,
        category: catcherItem.category,
    };
    let array2 = categories[catcherItem.category];
    array2 = update(array2, { $splice: [[catcherItem.index, 0, newBallItem]] });
    categories[catcherItem.category] = array2;
    //
    //###########################################################################
    // 通信環境が悪かったときの為に、まずは見た目を変える
    yield put(actions.links.setAllByCategorized({ ...categories }));
    //
    //###########################################################################
    console.log("削除開始");
    const url = 'https://rrzvkjke5e.execute-api.ap-northeast-1.amazonaws.com/production/links?'
        + 'category=' + ballItem.category + '&order=' + ballItem.order;
    console.log(url);
    try {
        const res = yield axios.delete(url);
        if (typeof res.data === "string") {
            console.log('サーバーエラー：' + res.data);
            alert('サーバーエラー');
            return;
        }
        console.log("削除完了");
    }
    catch (e) {
        alert('ネットワークエラー');
        console.log('削除中にエラー発生 : ' + e);
        return;
    }
    //###########################################################################
    console.log("アップロード開始");
    try {
        const res = yield axios.post(
            'https://rrzvkjke5e.execute-api.ap-northeast-1.amazonaws.com/production/links',
            array2,
        );
        if (typeof res.data === "string") {
            console.log('サーバーエラー：' + res.data);
            alert('サーバーエラー');
            return;
        }
        console.log("アップロード完了");
        //####################################################################
        yield put(actions.links.setAll(res.data));
        //####################################################################
    }
    catch (e) {
        alert('ネットワークエラー');
        console.log('アップロード中にエラー発生 : ' + e);
        return;
    }
    //###########################################################################
}


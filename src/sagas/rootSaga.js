
//yield put({type:'ACTION', ...})   ActionをDispatchする
//yield take(['ACTION'])            指定のActionがDispatchされるまで待つ
//yield takeEvery('ACTION', func)   ActionがDispatchされたら、毎回関数を呼び出すように設定する（同じActionが複数回来た場合は、並列で処理を行う）
//yield call(func, args)            関数をを呼び出して、終了を待つ（関数から戻り値を貰える）
//yield fork(func)                  バックグラウンド処理を開始する。（終了は待たない）
//yield select(selector関数, args)  storeからデータを取りたい
//takeLatest                        処理をキャンセルし、新しい処理を行う
//axios.get(..)                     GET関数とかをコール

import { takeEvery } from 'redux-saga/effects';
import actions from '../actions';
import getLinks from './links/get';
import postLink from './links/post';
import deleteLink from './links/delete';
import moveLink from './links/move';
import replaceImage from './replaceImage';

export default function* rootSaga() {
    yield takeEvery(actions.links.get, getLinks);
    yield takeEvery(actions.links.post, postLink);
    yield takeEvery(actions.links.delete, deleteLink);
    yield takeEvery(actions.links.move, moveLink);
    yield takeEvery(actions.imageUploader.replace, replaceImage);
}

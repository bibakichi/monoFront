
import { put, select } from 'redux-saga/effects';
import axios from 'axios';
import actions from '../actions';

export default function* getTimecard() {
    const filter = yield select(state => state.user.timecard.filter);
    let url = 'https://rrzvkjke5e.execute-api.ap-northeast-1.amazonaws.com/production/users/';
    url += (filter.userId ? filter.userId : '') + '/timecard?';
    url += filter.year ? ('year=' + filter.year + '&') : '';
    url += filter.month ? ('month=' + filter.month) : '';
    console.log("ロード開始 " + url);
    try {
        const res = yield axios.get(url);
        console.log("ロード完了");
        yield put(actions.user.timecard.set(res.data));
    }
    catch (e) {
        console.log('ロード中にエラー発生 : ' + e);
    }
}
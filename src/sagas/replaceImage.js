
import { put } from 'redux-saga/effects';
import axios from 'axios';
import actions from '../actions';
/*
const bucketName = 'mono-image';
const afterUrl = 'https://rrzvkjke5e.execute-api.ap-northeast-1.amazonaws.com/production/s3/'
    + bucketName + '/' + afterId;
const beforeUrl = 'https://rrzvkjke5e.execute-api.ap-northeast-1.amazonaws.com/production/s3/'
    + bucketName + '/' + beforeId;
*/
export default function* replaceImage({ payload: { beforeUrl, afterUrl, file } }) {
    //###########################################################################
    console.log("S3アップロード開始");
    console.log(afterUrl);
    try {
        const res = yield axios.post(
            afterUrl,
            file,
            {
                headers: {
                    'content-type': 'image/png',
                },
            }
        );
        if (typeof res.data === "string") {
            console.log('サーバーエラー：' + res.data);
            alert('サーバーエラー');
            yield put(actions.imageUploader.uploaded(false, afterUrl));
            return;
        }
        console.log("アップロード完了");
    }
    catch (e) {
        alert('ネットワークエラー');
        console.log('アップロード中にエラー発生 : ' + e);
        yield put(actions.imageUploader.uploaded(false, afterUrl));
        return;
    }
    //###########################################################################
    // 追加完了報告
    yield put(actions.imageUploader.uploaded(true, afterUrl));
    //
    //###########################################################################
    if (!beforeUrl) {
        return;
    }
    /*
    console.log("S3削除開始");
    console.log(beforeUrl);
    try {
        const res = yield axios.delete(beforeUrl);
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
    */
    //
    //###########################################################################
}



import { put } from 'redux-saga/effects';
import axios from 'axios';
import actions from '../actions';

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
}


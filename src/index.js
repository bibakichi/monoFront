import React from 'react';
import * as ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { compose, createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga'
import { Provider } from 'react-redux'
import { createLogger } from 'redux-logger'
import { createBrowserHistory } from 'history';

import './index.css';
import rootReducer from './reducers/rootReducer'
import rootSaga from './sagas/rootSaga'
import reportWebVitals from './reportWebVitals';
import App from './App';

const customizedhistory = createBrowserHistory({ basename: '/production/s3-private/mono-frontPortal/' });

const sagaMiddleware = createSagaMiddleware();
const logger = createLogger({ diff: true, collapsed: true, });
const store = createStore(
  rootReducer,
  //compose(applyMiddleware(sagaMiddleware)),
  compose(applyMiddleware(sagaMiddleware, logger)),
);
sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter history={customizedhistory}>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
// ↑ アプリのパフォーマンスを測定したいときは、
// ↑ 「reportWebVitals()」の括弧の中に表示用関数を書いてください。
// ↑ たとえば「reportWebVitals(console.log)」と記述すると、
// ↑ ログに測定結果を表示できます。
// ↑ 詳しくは https://bit.ly/CRA-vitals を参照してください。
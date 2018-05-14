import { all, call, put, takeLatest } from 'redux-saga/effects';

import { prefix, types, actions } from './PriceLineAction';
import API from './PriceLineAPI';


function* watchFetchingPriceLines(action) {
    yield put(actions.request());
    const { payload, error } = yield call(API.list, action.payload);
    if (payload && !error) {
        yield put(actions.success(payload));
    } else {
        yield put(actions.fail(error));
    }
}

export default function* watcher() {
    yield all([
        takeLatest(types.INDEX, watchFetchingPriceLines),
    ]);
}

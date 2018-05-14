import { all, call, put, takeLatest } from 'redux-saga/effects';

import { FETCH_LIST, SHOW } from './ProductAction';
import { FETCH as FETCH_SEARCH } from '../search/SearchAction';

import API from './ProductAPI';

function* watchFetchingProducts(action) {
    yield put(FETCH_LIST.actions.request());
    const { conditions } = action.payload;
    const { category, priceline, pagination, sale } = conditions;

    const params = {
        page: pagination.page,
        per: pagination.per,
        sale: sale,
    };

    if (category) params.category_id = category.id;
    if (priceline) params.price_line_id = priceline.id;

    const { payload, error } = yield call(API.list, params);
    if (payload && !error) {
        yield put(FETCH_LIST.actions.success(payload));
        yield put(FETCH_SEARCH.action(payload));
    } else {
        yield put(FETCH_LIST.actions.fail(error));
    }
}

export default function* watcher() {
    yield all([
        takeLatest(FETCH_LIST.types.INDEX, watchFetchingProducts),
    ]);
}

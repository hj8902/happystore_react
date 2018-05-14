import { all, fork } from 'redux-saga/effects';

import CategoryWatcher from './category/CategoryWatcher';
import ProductWatcher from './product/ProductWatcher';
import PriceLineWatcher from './priceline/PriceLineWatcher';

export default function* sagas() {
    yield all([
        fork(CategoryWatcher),
        fork(ProductWatcher),
        fork(PriceLineWatcher),
    ]);
}

import { combineReducers } from 'redux';

import category from './category/CategoryReducer';
import product from './product/ProductReducer';
import priceline from './priceline/PriceLineReducer';
import search from './search/SearchReducer';

export default combineReducers({ category, product, priceline, search });

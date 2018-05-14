import _ from 'lodash';
import { FETCH_LIST, SHOW, HIDE } from './ProductAction';

export const init = {
    items: [],
    modal: {
        product: null,
    },
};

export default function (state = init, action) {
    switch (action.type) {
    case FETCH_LIST.types.SUCCESS:
        return { items: action.payload.products, modal: { product: null } };
    case SHOW.type: {
        const clone = _.cloneDeep(state);
        clone.modal = { product: action.payload.product };
        return clone;
    }
    case HIDE.type: {
        const clone = _.cloneDeep(state);
        clone.modal = { product: null };
        return clone;
    }
    default:
        return state;
    }
}

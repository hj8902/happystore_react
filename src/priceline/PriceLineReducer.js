import { types } from './PriceLineAction';

export const init = {
    items: [],
};

export default function (state = init, action) {
    switch (action.type) {
    case types.SUCCESS:
        return { items: action.payload.price_lines };
    default:
        return state;
    }
}

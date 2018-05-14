import { types } from './CategoryAction';

export const init = {
    items: [],
};

export default function (state = init, action) {
    switch (action.type) {
    case types.SUCCESS:
        return { items: action.payload.categories };
    default:
        return state;
    }
}

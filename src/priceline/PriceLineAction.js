import Helper from '../libs/ActionHelper';

export const prefix = 'app/priceline/FETCH_LIST';
export const types = Helper.makeAsyncActions(prefix);
export const actions = Helper.makeAsyncActionCreator(types);

export default { prefix, types, actions };

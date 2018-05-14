import Helper from '../libs/ActionHelper';

const FETCH_LIST_PREFIX = 'app/products/FETCH_LIST';
const FETCH_LIST_TYPES = Helper.makeAsyncActions(FETCH_LIST_PREFIX);
const FETCH_LIST_ACTIONS = Helper.makeAsyncActionCreator(FETCH_LIST_TYPES);

const SHOW_PREFIX = 'app/products/SHOW';
const SHOW_ACTION = Helper.makeActionCreator(SHOW_PREFIX);
const HIDE_PREFIX = 'app/products/HIDE';
const HIDE_ACTION = Helper.makeActionCreator(HIDE_PREFIX);

export const FETCH_LIST = { type: FETCH_LIST_PREFIX, types: FETCH_LIST_TYPES, actions: FETCH_LIST_ACTIONS };
export const SHOW = { type: SHOW_PREFIX, action: SHOW_ACTION };
export const HIDE = { type: HIDE_PREFIX, action: HIDE_ACTION };

export default { FETCH_LIST, SHOW, HIDE };

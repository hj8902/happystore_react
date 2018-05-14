import Helper from '../libs/ActionHelper';

const FETCH_PREFIX = 'app/search/FETCH';
const FETCH_ACTION = Helper.makeActionCreator(FETCH_PREFIX);

const UPDATE_PREFIX = 'app/search/UPDATE';
const UPDATE_ACTION = Helper.makeActionCreator(UPDATE_PREFIX);

export const FETCH = { type: FETCH_PREFIX, action: FETCH_ACTION };
export const UPDATE = { type: UPDATE_PREFIX, action: UPDATE_ACTION };

export default { FETCH, UPDATE };

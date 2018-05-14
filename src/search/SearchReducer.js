import _ from 'lodash';
import { FETCH, UPDATE } from './SearchAction';
import { actions } from '../product/ProductAction';

const DEFAULT_PAGE = 1;
const DEFAULT_PER = 8;

export const init = {
    conditions: {
        priceline: null,
        category: null,
        sale: false,
        pagination: {
            page: 1,
            per: DEFAULT_PER,
            totalPage: 0,
            totalCount: 0,
        },
    },
};

const changePagination = (conditions, pagination) => {
    conditions.pagination.page = pagination.page;
    conditions.pagination.per = pagination.per;
    conditions.pagination.totalPage = pagination.total_page || pagination.totalPage;
    conditions.pagination.totalCount = pagination.total_count || pagination.totalCount;
};

const changeCondition = (conditions, sale, priceline, category, pagination) => {
    if (!_.isUndefined(sale)) conditions.sale = sale;
    if (!_.isUndefined(priceline)) conditions.priceline = priceline;
    if (!_.isUndefined(category)) conditions.category = category;
    if (!_.isUndefined(pagination)) changePagination(conditions, pagination);
};

export default function (state = init, action) {
    switch (action.type) {
    case FETCH.type: {
        const clone = _.cloneDeep(state);
        const { conditions } = clone;
        const { pagination } = action.payload;
        changePagination(conditions, pagination);
        return clone;
    }
    case UPDATE.type: {
        const clone = _.cloneDeep(state);
        const { conditions } = clone;
        const { priceline, category, pagination, sale } = action.payload;
        changeCondition(conditions, sale, priceline, category, pagination);
        return clone;
    }
    default:
        return state;
    }
}

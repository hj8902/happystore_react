import _ from 'lodash';
import React from 'react';
import ClassNames from 'classnames/bind';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Pagination } from 'semantic-ui-react';

import { UPDATE as SEARCH } from '../search/SearchAction';

// component part
class PaginationComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = { pagination: _.cloneDeep(this.props.pagination) };
        this.onPageChange = this.onPageChange.bind(this);
    }

    onPageChange(e, data) {
        const pagination = this.state.pagination;
        pagination.page = data.activePage.toString();
        this.props.search(pagination);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ pagination: _.cloneDeep(nextProps.pagination) });
    }

    render() {
        return (
            <Pagination defaultActivePage={this.state.pagination.page}
                totalPages={this.state.pagination.totalPage}
                onPageChange={this.onPageChange} />
        );
    }
}

export { PaginationComponent };

// container part
// for mappping props to redux data
const mapStateToProps = state => ({ pagination: state.search.conditions.pagination });

// in component, disptch after triggering props
const mapDispatchToProps = dispatch => ({
    search: pagination => dispatch(SEARCH.action({ pagination })),
});

// connect component with data layer
export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(PaginationComponent);

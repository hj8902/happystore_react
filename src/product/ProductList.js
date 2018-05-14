import _ from 'lodash';
import React from 'react';
import ClassNames from 'classnames/bind';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Card } from 'semantic-ui-react';
import Styles from './product.scss';

import { FETCH_LIST } from './ProductAction';
import ProducItem from './ProducItem';

const cx = ClassNames.bind(Styles);

function difference(object, base) {
    return _.transform(object, (result, value, key) => {
        if (!_.isEqual(value, base[key])) {
            result[key] = _.isObject(value) && _.isObject(base[key]) ? difference(value, base[key]) : value;
        }
    });
}

// component part
class ProductListComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = { mounted: false };
    }

    componentWillMount() {
        this.props.index(this.props.conditions);
        this.updated = this.updated.bind(this);
    }

    componentDidMount() {
        this.setState({ mounted: true });
    }

    updated(nextProps) {
        return this.state.mounted && !_.isEqual(
            _.omit(this.props.conditions, ['pagination.totalCount', 'pagination.totalPage']),
            _.omit(nextProps.conditions, ['pagination.totalCount', 'pagination.totalPage']),
        );
    }

    componentWillReceiveProps(nextProps) {
        if (this.updated(nextProps)) {
            this.props.index(nextProps.conditions);
        }
    }

    render() {
        return (
            <Card.Group itemsPerRow="4" className={cx('product', 'list')}>
                { this.props.items.map((product, i) => <ProducItem product={product} key={i} />) }
            </Card.Group>
        );
    }
}

export { ProductListComponent };

// container part
// for mappping props to redux data
const mapStateToProps = state => ({ items: state.product.items, conditions: state.search.conditions });

// in component, disptch after triggering props
const mapDispatchToProps = dispatch => ({
    index: conditions => dispatch(FETCH_LIST.actions({ conditions })),
});

// connect component with data layer
export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ProductListComponent);

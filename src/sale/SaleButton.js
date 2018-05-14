import _ from 'lodash';
import React from 'react';
import ClassNames from 'classnames/bind';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Checkbox } from 'semantic-ui-react';

import SearchAction from '../search/SearchAction';

// component part
class SaleButtonComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = { sale: !!this.props.sale };
        this.onChange = this.onChange.bind(this);
    }

    onChange(e, data) {
        this.setState({ sale: data.checked });
        this.props.search(data.checked);
    }

    render() {
        return (
            <Checkbox slider label="Find Sale!" onChange={this.onChange} checked={this.state.sale}/>
        );
    }
}

export { SaleButtonComponent };

// container part
// for mappping props to redux data
const mapStateToProps = state => ({ sale: state.search.conditions.sale });

// in component, disptch after triggering props
const mapDispatchToProps = dispatch => ({
    search: sale => dispatch(SearchAction.UPDATE.action({ sale })),
});

// connect component with data layer
export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(SaleButtonComponent);

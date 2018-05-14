import React from 'react';
import ClassNames from 'classnames/bind';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Dropdown } from 'semantic-ui-react';
import Styles from './priceline.scss';

import { actions } from './PriceLineAction';
import { UPDATE as SEARCH } from '../search/SearchAction';

const cx = ClassNames.bind(Styles);

const options = (items) => {
    const pricelines = [{ text: 'Clear', key: 0, value: 0 }];
    return pricelines.concat(
        items.map(priceline => ({ text: priceline.name, key: priceline.id, value: priceline.id })),
    );
};

// component part
class PriceLineComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = { value: 0 };
        this.onChangePriceLine = this.onChangePriceLine.bind(this);
    }

    onChangePriceLine(e, data) {
        const value = data.value;
        this.setState({ value });
        if (value === 0) {
            this.props.search(null);
        } else {
            this.props.search({ id: value });
        }
    }

    componentWillMount() {
        this.props.index();
    }

    render() {
        return (
            <Dropdown placeholder="Select price line"
                selection
                closeOnChange={true}
                options={options(this.props.items)}
                onChange={this.onChangePriceLine}/>
        );
    }
}

export { PriceLineComponent };

// container part
// for mappping props to redux data
const mapStateToProps = state => ({ items: state.priceline.items });

// in component, disptch after triggering props
const mapDispatchToProps = dispatch => ({
    index: () => dispatch(actions()),
    search: priceline => dispatch(SEARCH.action({ priceline })),
});

// connect component with data layer
export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(PriceLineComponent);

import React from 'react';
import ClassNames from 'classnames/bind';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Container, Segment } from 'semantic-ui-react';
import Category from '../category/Category';
import ProductList from '../product/ProductList';
import ProductModal from '../product/ProducModal';
import PriceLine from '../priceline/PriceLine';
import Pagination from '../pagination/Pagination';
import SaleButton from '../sale/SaleButton';

import Styles from './app.scss';

const cx = ClassNames.bind(Styles);

// component part
class AppComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <React.Fragment>
                <Container className={cx('container')}>
                    <Segment basic floated="left">
                        <PriceLine/>
                    </Segment>
                    <Segment basic floated="right">
                        <SaleButton />
                    </Segment>
                    <Category />
                    <ProductList />
                    <Segment textAlign="center" basic><Pagination /></Segment>
                    <ProductModal />
                </Container>
            </React.Fragment>);
    }
}

export { AppComponent };

// container part
// for mappping props to redux data
const mapStateToProps = state => ({});

// in component, disptch after triggering props
const mapDispatchToProps = dispatch => ({
});

// connect component with data layer
export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(AppComponent);

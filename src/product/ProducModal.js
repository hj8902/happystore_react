import React from 'react';
import ClassNames from 'classnames/bind';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Modal, Image, Header, Flag } from 'semantic-ui-react';

import { HIDE } from './ProductAction';
import Styles from './product.scss';

const cx = ClassNames.bind(Styles);

// component part
class ProductModalComponent extends React.Component {
    constructor(props) {
        super(props);
        this.onClose = this.onClose.bind(this);
    }

    onClose() {
        this.props.hide();
    }

    render() {
        const product = this.props.product;
        const component = product ? (
            <Modal open={true} onClose={this.onClose} className={cx('product', 'item')}>
                <Modal.Header>{this.props.product.name}</Modal.Header>
                <Modal.Content image>
                    <Image wrapped size="medium" src="https://react.semantic-ui.com/assets/images/avatar/large/rachel.png" />
                    <Modal.Description>
                        <Header>{this.props.product.name}</Header>
                        <p className={cx('price')}>
                            {
                                this.props.product.under_sale ?
                                    <s>{this.props.product.price}</s> :
                                    <b>{this.props.product.price}</b>
                            }
                        </p>
                        { this.props.product.under_sale ?
                            (<p className={cx('price', 'sale')}>
                                <b>{this.props.product.sale.price}</b></p>) : ''
                        }
                        { this.props.product.under_sale ?
                            (<p>{this.props.product.sale.description}</p>) : ''
                        }
                    </Modal.Description>
                </Modal.Content>
            </Modal>
        ) : '';

        return component;
    }
}

export { ProductModalComponent };

// container part
// for mappping props to redux data
const mapStateToProps = state => ({ product: state.product.modal.product });

// in component, disptch after triggering props
const mapDispatchToProps = dispatch => ({
    hide: () => dispatch(HIDE.action()),
});

// connect component with data layer
export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ProductModalComponent);

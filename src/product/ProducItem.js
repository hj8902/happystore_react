import React from 'react';
import ClassNames from 'classnames/bind';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Card, Button, Image } from 'semantic-ui-react';

import { SHOW } from './ProductAction';
import Styles from './product.scss';

const cx = ClassNames.bind(Styles);

// component part
class ProductItemComponent extends React.Component {
    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
    }

    onClick() {
        this.props.show(this.props.product);
    }

    render() {
        return (
            <Card className={cx('product', 'item')} onClick={this.onClick}>
                <Card.Content>
                    <Card.Header>
                        { this.props.product.name }
                    </Card.Header>
                    <Card.Meta className={cx('price')}>
                        {
                            this.props.product.under_sale ?
                                <s>{this.props.product.price}</s> :
                                <b>{this.props.product.price}</b>
                        }
                    </Card.Meta>
                    { this.props.product.under_sale ?
                        (
                            <Card.Meta className={cx('price', 'sale')}>
                                <b>{this.props.product.sale.price}</b>
                            </Card.Meta>
                        ) : ''
                    }
                    { this.props.product.under_sale ?
                        (
                            <Card.Description>
                                {this.props.product.sale.description}
                            </Card.Description>
                        ) : ''
                    }
                </Card.Content>
                <Card.Content extra>
                    <div className="ui two buttons">
                        { this.props.product.under_sale ?
                            <Button basic color="red">Sale!</Button> :
                            <Button basic color="green">Buy</Button> }
                    </div>
                </Card.Content>
            </Card>
        );
    }
}

export { ProductItemComponent };

// container part
// for mappping props to redux data
const mapStateToProps = state => ({});

// in component, disptch after triggering props
const mapDispatchToProps = dispatch => ({
    show: product => dispatch(SHOW.action({ product })),
});

// connect component with data layer
export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ProductItemComponent);

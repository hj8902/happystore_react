import React from 'react';
import ClassNames from 'classnames/bind';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Tab, Menu } from 'semantic-ui-react';
import Styles from './category.scss';

import { actions } from './CategoryAction';
import { UPDATE as SEARCH } from '../search/SearchAction';

const cx = ClassNames.bind(Styles);

const LastCategory = (props) => {
    const category = props.category;
    return <Menu.Item category={category} name={category.name} onClick={props.onClick} />;
};

const MidCategory = (props) => {
    const category = props.category;

    return <Menu vertical size="huge" floated={false} className={cx('menu')}>
        <Menu.Item category={category} name={category.name} onClick={props.onClick} />
        <Menu.Item>
            <Menu.Menu>
                { category.children.map((child, i) => <LastCategory category={child} onClick={props.onClick} key={i}/>) }
            </Menu.Menu>
        </Menu.Item>
    </Menu>;
};

const FirstCategory = (props) => {
    const category = props.category;

    if (!category.children) return <Tab.Pane className={cx('tab')} />;
    return <Tab.Pane className={cx('tab')}>
        { category.children.map((child, i) => <MidCategory key={i} category={child} onClick={props.onClick} />) }
    </Tab.Pane>;
};

const panes = (items, onChangeCategory) => {
    const all = [{ menuItem: 'ALL' }];
    return all.concat(
        items.map(category => ({ category: category, menuItem: category.name, render: () => <FirstCategory category={category} onClick={onChangeCategory}/> })),
    );
};

// component part
class CategoryComponent extends React.Component {
    constructor(props) {
        super(props);
        this.onChangeCategory = this.onChangeCategory.bind(this);
        this.onTabChange = this.onTabChange.bind(this);
    }

    onTabChange(e, data) {
        this.onChangeCategory(e, data.panes[data.activeIndex]);
    }

    onChangeCategory(e, data) {
        const category = data.category;
        if (!category) {
            this.props.search(null);
            return;
        }

        this.props.search({ id: category.id });
    }

    componentWillMount() {
        this.props.index();
    }

    render() {
        return (
            <div className={cx('category')}>
                <Tab onTabChange={this.onTabChange} panes={panes(this.props.items, this.onChangeCategory)} />
            </div>
        );
    }
}

export { CategoryComponent };

// container part
// for mappping props to redux data
const mapStateToProps = state => ({ items: state.category.items });

// in component, disptch after triggering props
const mapDispatchToProps = dispatch => ({
    index: () => dispatch(actions()),
    search: category => dispatch(SEARCH.action({ category })),
});

// connect component with data layer
export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(CategoryComponent);

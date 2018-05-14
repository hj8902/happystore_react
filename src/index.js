import React from 'react';
import ReactDOM from 'react-dom';
import AppContainer from 'react-hot-loader/lib/AppContainer';

import { createStore, applyMiddleware, combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { Provider } from 'react-redux';

import reducers from './reducers';
import sagas from './sagas';
import App from './app/App';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(reducers, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(sagas);

const container = document.getElementById('container');
const render = (Component) => {
    ReactDOM.render(
        <AppContainer>
            <Provider store={ store }>
                <Component />
            </Provider>
        </AppContainer>,
        container,
    );
};

render(App);

// hot loader
if (module.hot) { module.hot.accept('./app/App', () => render(App)); }

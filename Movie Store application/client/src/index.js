import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk'
import reducers from './reducers'
import './index.css';
import App from './App';

/*    here we are creating a store combined of reducers which is available
    to all of our application to be mainpulated anywhere in the application 
    the provider provides to create the store the other componentes are useful to create 
    the store in the application and the reducers include the combined reducers that will be available 
    across the application
    */

const store = createStore(reducers, compose(applyMiddleware(thunk)))
ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>
, document.getElementById('root'))


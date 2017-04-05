import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import {createStore, applyMiddleware } from 'redux'
import reducer from './reducers'
import Form from './components/form.jsx'
import List from './components/list.jsx'
import logger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {fetch_jobs} from './actions.js'
import {connect} from 'react-redux';

let store = createStore(reducer, applyMiddleware(thunkMiddleware, logger))

class Application extends React.Component {

    componentDidMount() {
        // check for session to see if user is already logged in
        const { dispatch} = this.props;
        dispatch(fetch_jobs());
    }

    render() {
        return (<div>
            <Form />
            <List />
        </div>)

    }

}

const RApplication = connect()(Application);

render(
    <Provider store={store}>
        <RApplication />
    </Provider>,
    document.getElementById('root')
);

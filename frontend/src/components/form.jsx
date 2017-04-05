import React from 'react';
import {connect} from 'react-redux';
import {submitJob} from '../actions.js';

const Formez = ({dispatch}) => {

    let oo;

    return (<div>
        <form onSubmit={e => {e.preventDefault();
		        dispatch(submitJob(oo.value))}}>
            <input type="text" ref={x => {oo = x}}/>
            <button type="submit">Add Job</button>
        </form>
    </div>)

};

const CustomForm = connect()(Formez);

export default CustomForm;


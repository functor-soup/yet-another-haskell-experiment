import React from 'react';
import {connect} from 'react-redux';
import {submitJob} from '../actions.js';

const Formez = ({dispatch}) => {

 let oo;

 return (<div>
            <input type="text" ref={x => {oo = x}} 
	      onSubmit={e => {e.preventDefault(); 
		        dispatch(submitJob(oo.value))}}
       	      />	
	</div>)

}

const CustomForm = connect()(Formez);

export default CustomForm;


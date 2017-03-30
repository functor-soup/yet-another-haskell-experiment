import React from 'react';
import {connect} from 'react-redux';

const List = (props) => {
  return (<div>
	   <ul>
	     {(props.list || []).map(x => <li>{x}</li>)}  
           </ul>
	  </div>) 
}

const mapStateToProps = (state) => {
 return {
   list:state.jobs
 }
}

const CustomList = connect(mapStateToProps)(List)

export default CustomList

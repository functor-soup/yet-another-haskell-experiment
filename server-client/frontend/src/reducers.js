import I from 'seamless-immutable';
import {STASH_JOBS, TOGGLE_PROCESSING_REQUEST} from './actions.js';

const initialState = {processing: false, jobs:[]}

const stateReducer = (state=initialState, action) => {

 switch(action.type){
   case STASH_JOBS:
      return I.set(state, 'jobs', action.jobs)

   case TOGGLE_PROCESSING_REQUEST:
      return I.update(state, 'processing',x => !x) 

   default:
      return state;

  }

}


export default stateReducer;

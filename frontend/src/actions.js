import fetch from 'isomorphic-fetch'  

export const STASH_JOBS = "STASH_JOBS";
export const TOGGLE_PROCESSING_REQUEST = "PROCESSING_REQUEST"

const backend = "http://localhost:5000/"

export const fetch_jobs = () => {
  return (dispatch) =>{
     fetch(backend)
       .then(x => x.json())
       .then(x => dispatch(stashJobs(x)))
  }
}

export const toggleProcessingRequest = () => { return {type: TOGGLE_PROCESSING_REQUEST}}

export const stashJobs = (jobs) => {
  return {type: STASH_JOBS, jobs}
}

export const submitJob = (job) => {
  return (dispatch) => {
    dispatch(toggleProcessingRequest())
    fetch(backend,{method:"POST", body:JSON.stringify({job})}) 
     .then(x => {
           dispatch(fetch_jobs())
           dispatch(toggleProcessingRequest())
     })
  }
}

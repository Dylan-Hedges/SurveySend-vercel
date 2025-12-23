import {FETCH_SURVEYS} from '../actions/types';

//Reducer that updates the Redux Store with the latest list of surveys the user has created in Redux Store
export default function(state = [], action){
  //Switch statement that looks at type sent by AC
  switch(action.type){
    //When AC sends the type FETCH_SURVEYS
    case FETCH_SURVEYS:
      //Updates the Redux Store with the latest user model containing the array of surveys - passed in from fetchSurveys
      return action.payload;
    default:
      //Returns state - no changes
      return state;
  }
}

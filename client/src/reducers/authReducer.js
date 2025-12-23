import {FETCH_USER} from '../actions/types';

//Reducer that updates the latest user model in Redux Store - used to check if user is logged in & increase or decrease credits
export default function (state = null, action) {
  //Switch statement that looks at type sent by AC
  switch (action.type){
    //When AC sends the type FETCH_USER
    case FETCH_USER:
      //Updates Redux Store with new user model passed in from fetchUser, handleToken or submitSurvey ACs - Google Info (logged in) OR false (not logged in, returns empty string, in JS an empty string = false)
      return action.payload || false;
    default:
      //Returns state - no changes
      return state;
  }
}

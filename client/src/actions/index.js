import axios from 'axios';
import {FETCH_USER, FETCH_SURVEYS} from './types';

//Action Creator to fetch the logged in users info
export const fetchUser = () => {
  //Asyncronous AC - returns a function (not a plain object as standard), requires Redux Thunk (wired as middleware when creating Redux Store), pauses automatically dispatching an action so that we can make a request to the Express backend, once completed then it dispatches an action with containing the result to the reducers
  return async (dispatch) => {
    //Gets users google id - makes a GET request to Express back end route to get users Google id
    const res = await axios.get('/api/current_user');
    //Dispatches user model with user info to reducers - authReducer uses it to see if user is logged in (id exists) or not (id doesnt exist)
    dispatch ({type: FETCH_USER, payload: res.data});
  };
};

//AC to add credits & charge user
export const handleToken = (token) =>{
  //Asyncronous AC
  return async (dispatch) => {
    //Makes charge & updates credits - makes a POST request to back end with Strpe auth token, gets back user model with updated credits, saves the response
    const res = await axios.post('/api/stripe', token);
    //Dispatches new user model with +5 credits to reducers - authReducer updates Redux Store, components use store to display number of credits
    dispatch ({type: FETCH_USER, payload: res.data});
  };
};

//AC to create a new survey
export const submitSurvey = (values, history) => async dispatch => {
  //Sends form values user typed in to the back end - sends the entered form values to the Express backend, survey is created using these values, survey + the email template are passed into a Mailer object which SendGrid uses to send emails to recipients
  const res = await axios.post('/api/surveys', values);
  //Redirects users back to the main surveys page after they submit the form
  history.push('/surveys');
  //Dispatches new user model with -1 credits to reducers - authReducer updates Redux Store, components use store to display number of credits
  dispatch ({type: FETCH_USER, payload: res.data});
};

//AC that fetches list of surveys a user has created
export const fetchSurveys = () => async dispatch => {
  //Gets all surveys user has created - makes GET request to back end, gets back an array of all the surveys the user has created
  const res = await axios.get('/api/surveys');
  //Dispatches new user model with list of surveys user has created - surveysReducer updates Redux Store, components use to display surveys user has created
  dispatch({type: FETCH_SURVEYS, payload: res.data});
}

//AC that deletes surveys
export const deleteSurvey = (surveyid) => async dispatch => {
  //Sends a Mongo delete survey request to back end Express (using JSON)
  const res = await axios.post('/api/surveys/deletesurvey', surveyid);
  //Dispatches new user model with list of surveys user has created (array of surveys is from the RH mongoose query)
  dispatch({type: FETCH_SURVEYS, payload: res.data});
}

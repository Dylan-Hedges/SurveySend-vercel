//Imports the combine reducers call to combine reducers
import { combineReducers } from 'redux';
//Imports the Redux Form reducer - needed to wire up Redux form, we rename it to reduxForm, it must be assigned under the key "form:"
import { reducer as reduxForm} from 'redux-form';
//Imports the Auth Reducer
import authReducer from './authReducer';
//Imports the Surveys Reducer
import surveysReducer from './surveysReducer';

//Combines & exports all Reducers - the output from the reducers are storred under these keys in the Redux Store
export default combineReducers({
  auth: authReducer,
  form: reduxForm,
  surveys: surveysReducer
});

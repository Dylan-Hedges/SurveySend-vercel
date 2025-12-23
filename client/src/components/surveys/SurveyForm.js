import _ from 'lodash';
import React, {Component} from 'react';
import {reduxForm, Field} from 'redux-form';
import {Link} from 'react-router-dom';
import SurveyField from './SurveyField';
import validateEmails from '../../utils/validateEmails';
import formFields from './formFields';

//Component that displays a form the user can fill out
class SurveyForm extends Component{
  //Creates a new <Field /> component for each entry in the formFields array - Uses Lodash to iterate over the  array, generates a new field and passes in label and name (the key the data will be saved under in Redux Store)
  renderFields(){
    return _.map(formFields, ({ label, name }) =>{
      return (
        <Field
          key={name}
          component={SurveyField}
          type="text"
          label={label}
          name={name}
        />
      );
    });
  }
  //Renders the fields on screen & displays form user can fill out - Uses the renderFields() helper function to loop through the FIELDS array and create the fields
  render(){
    return(
      <div>
        <form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>
          {this.renderFields()}
          <Link to="/surveys" className="red btn-flat white-text">Cancel</Link>
          <button type="submit" className="green btn-flat right white-text">
            Next
            <i className="material-icons right">done</i>
          </button>
        </form>
      </div>
    );
  }
}

//Validation function - performs checks before submitting the form, part of reduxForm, wired up at the bottom (similar to how mapStateToProps is wired up)
function validate(values){
  const errors = {};
  //Checks the recipients list to see if there are any errors - runs the validateEmails function, assigns whatever is returned to errors.emails, || '' pass in empty string on page load
  errors.recipients = validateEmails(values.recipients || '');
  //Adds a property to the errors[name] object containing a string - we use [name] when we reference something on the fly, errors[name] changes for each entry in the array so it will be errors.title then errors.subject etc.
  _.each(formFields, ({name}) => {
    //If there is no value  - when looking under the name (used as the key for the data in Redux Store)
    if(!values[name]){
      //Add a property to the errors object containing a string - Redux Form automatically passes this to the <Field /> with name="title" under meta.error
      errors[name] = 'You must provide a value';
    }
  });
  //Return errors (If applicable) - if a blank object is returned there are no issues and form submittal can go ahead
  return errors;
}

//Wires up reduxForm to the component - wires up form to Redux Store, executes validation function, does not destory the data even if user goes away from component
export default reduxForm({
    validate: validate,
    form: 'surveyForm',
    destroyOnUnmount: false
})(SurveyForm);

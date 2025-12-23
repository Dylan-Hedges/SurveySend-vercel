import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import formFields from './formFields';
import { withRouter } from 'react-router-dom';
import * as actions from '../../actions';

//Component that lets user review what they have typed before submitting the survey
const SurveyFormReview = ({ onCancel, formValues, submitSurvey, history }) => {
	//Iterates over thearray in formFields and generates JSX for the label and name
	const reviewFields = _.map(formFields, ({ name, label }) => {
		//Returns html for each of our survey fields - "{formvalues[field.name]}" remember "formValues" is the new array and we want to access only the name for EACH entry, "<div key={name}>" when we produce a list of elements React wants us to have a unique key, hence why we are using the individual "name" as a key
		return (
			<div key={name}>
				<label>{label}</label>
				<div>{formValues[name]}</div>
			</div>
		);
	});
	//Returns JSX so user can review what they have typed and submit the form
	return (
		<div>
			<h5>Please confirm your entries</h5>
			{reviewFields}
			<div className="surveyformreviewnavigation">
				<button className="teal white-text btn-flat" onClick={onCancel}>
					Back
				</button>
				<button
					onClick={() => submitSurvey(formValues, history)}
					className="green btn-flat right white-text"
				>
					Send Survey
					<i className="material-icons right">email</i>
				</button>
			</div>
		</div>
	);
};
//Maps the Redux Store to the props of this component
function mapStateToProps(state) {
	return { formValues: state.form.surveyForm.values };
}

//Wires up Redux Store & Action creator & withRouter (passes in react-router history, used by AC to redirect after clicking submit)
export default connect(mapStateToProps, actions)(withRouter(SurveyFormReview));

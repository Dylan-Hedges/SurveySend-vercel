import React, {Component} from 'react';
import { reduxForm } from 'redux-form';
import SurveyForm from './SurveyForm';
import SurveyFormReview from './SurveyFormReview';

//Logic component that determines if new survey or review survey component is shown - Parent to SurveyForm & SurveyFormReview, has logic that determine if the new survey page or review survey page is shown
class SurveyNew extends Component{
  //Initalises state for component
  constructor(props){
    //Calls parent component constructor - lets this component access props from parent component
    super(props);
    //Set inital state so that the review component is not shown on load up
    this.state = { showFormReview: false}
  }
  //Logic that determines if to show new survey or review survey component
  renderContent(){
    //If state.showFormReview is equal to true
    if(this.state.showFormReview){
      //Show survey review component
      return <SurveyFormReview onCancel={()=> this.setState({showFormReview: false})}/>;
    }
    //Show new survey component
    return <SurveyForm onSurveySubmit={() => this.setState({showFormReview: true})}/>;
  }
  //Executes the function which determines which component to show
  render(){
    return(
      <div>
        {this.renderContent()}
      </div>
    );
  }
}

//Wires up the Redux Form to this component - used to scrap all values when user moves away from this component (by default Redux Form scraps everything unless destoryOnUmount: false)
export default reduxForm({
	form: 'surveyForm'
})(SurveyNew);

import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../actions';

//Component that displays all surveys user has created on screen
class SurveyList extends Component {
  //Grabs the list of surveys on component load - executes the AC using component lifecycle method
  componentDidMount(){
    this.props.fetchSurveys();
  }
  //Function that checks if last responded date is invalid & returns JSX
  displayLastResponded(survey){
    //Pulls date object from the DB and converts it to a readble string
    const date = new Date(survey.lastResponded).toLocaleDateString();
    //Checks if date once converted is "Invalid Date" (there are no responses yet from recipients)
    if( date === "Invalid Date"){
      return(
        <p className="right">
          Last Responded: No responses yet
        </p>
      )
    }
    //Returns JSX with date of last response
    return(
      <p className="right">
        Last Responded: {date}
      </p>
    )
  }
  //Renders the surveys on screen - maps over the surveys prop (list of surveys) and generates JSX for each survey
  renderSurveys(){
    return this.props.surveys.reverse().map(survey => {
      return(
        <div id="surveylist" className="card darken-1" key={survey._id}>
          <div className="card-content">
            <span className="card-title surveytitle">{survey.title}</span>
            <p>{survey.subject}</p>
            <p className="right">
              Sent On: {new Date(survey.dateSent).toLocaleDateString()}
            </p>
          </div>
          <div className="card-action">
            <a className="green-text">Yes:<span className="response">{survey.yes}</span></a>
            <a className="green-text">No:<span className="response">{survey.no}</span></a>
            <button className="red darken-1 btn-flat white-text" onClick={() => this.props.deleteSurvey({surveyid:survey._id})}>Delete</button>
            {this.displayLastResponded(survey)}
          </div>
        </div>
      )
    });
  }
  //Executes the renderSurveys function
  render(){
    return(
      <div>
          {this.renderSurveys()}
      </div>
    );
  }
}

//Maps the list of surveys from Redux Store to the props of this component
function mapStateToProps(state){
  return {surveys: state.surveys};
}

//Wires up Redux Store and AC to this component
export default connect(mapStateToProps, actions)(SurveyList);

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom'
import SurveyList from './surveys/SurveyList';

//Displays survey list component and add new survey button
class Dashboard extends Component {
  //Checks if user has enough credits to create a survey
  checkCreditsNewSurveyButton(){
    //When component first loads auth = null, prevents error
    if (this.props.auth === null){
      return <div></div>;
    }
    //If the user has enough credits (greater than 0) display the add button to let them create a new survey
    if(this.props.auth.credits > 0) {
      return(
        <Link to="/surveys/new" className="btn-floating btn-large red">
          <i className="material-icons green">add</i>
        </Link>
      )
    }
    //If the user does not have enough credits (less than 0) show a button that when clicked alters the user to add more credits
    if(this.props.auth.credits <= 0) {
      return(
        <a onClick={() => {alert("Please add more credits to your account before creating a survey.")}} className="btn-floating btn-large red">
          <i className="material-icons green">add</i>
        </a>
      )
    }
  }
  render(){
    return(
      <div>
        <SurveyList />
        <div className="fix-action-btn">
          {this.checkCreditsNewSurveyButton()}
        </div>
      </div>
    );
  }
};

//Maps Redux Store to the component so that the amount of credits can be checked
function mapStateToProps(state){
  //Maps the auth state to the props of this component under the prop auth
  return{auth: state.auth}
}

//Wires Redux Store to the component
export default connect(mapStateToProps)(Dashboard);

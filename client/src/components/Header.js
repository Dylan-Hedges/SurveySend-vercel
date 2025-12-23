import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import Payments from './Payments.js';


//Displays header/nav bar along the top of the page
class Header extends Component{
  //Determines what navigation options are displayed in the main menu - new survey, add credits, credits, logout or login
  renderContent(){
    //Switch statement that determines what to do if user is loading, needs to login or logout
    switch(this.props.auth) {
      //Loading - Show nothing
      case null:
        return;
      //Not logged in
      case false:
        return(
          <li><a href="/auth/google"><i className="material-icons">account_circle</i>Login</a></li>
        );
      //Logged in
      default:
        //When component first loads auth = null, prevents error
        if (this.props.auth === null){
          return <div></div>;
        }
        //If the user has enough credits (greater than 0) display the add button to let them create a new survey
        if(this.props.auth.credits > 0) {
          return(
            [
              <li key="1"><Link to={'/surveys/new'} className="newsurveymainbutton"><button className="btn green white-text">New Survey</button></Link></li>,
              <li key="2"><Payments sideMenu={false} /></li>,
              <li key="3" style={{margin: '0 10px'}}>Credits: {this.props.auth.credits}</li>,
              <li key="4"><a href="/api/logout">Logout</a></li>
            ]
          )
        }
        //If the user does not have enough credits (less than 0) show a button that when clicked alters the user to add more credits
        if(this.props.auth.credits <= 0) {
          return(
            [
              <li key="1"><a onClick={() => {alert("Please add more credits to your account before creating a survey.")}} className="newsurveymainbutton"><button className="btn green white-text">New Survey</button></a></li>,
              <li key="2"><Payments sideMenu={false} /></li>,
              <li key="3" style={{margin: '0 10px'}}>Credits: {this.props.auth.credits}</li>,
              <li key="4"><a href="/api/logout">Logout</a></li>
            ]
          )
        }
    }
  }

  //Determines what navigation options are displayed in the side menu
  renderSideContent(){
    //Switch statement that determines what to do if user is loading, needs to login or logout
    switch(this.props.auth) {
      //Loading - Show nothing
      case null:
        return;
      //Not logged in
      case false:
        return(
          <li><a href="/auth/google"><i className="material-icons">account_circle</i>Login</a></li>
        );
      //Logged in
      default:
        //When component first loads auth = null, prevents error
        if (this.props.auth === null){
          return <div></div>;
        }
        //If the user has enough credits (greater than 0) display the add button to let them create a new survey
        if(this.props.auth.credits > 0) {
          return(
            [
              <li key="5" className="sidemenucredits">Credits: {this.props.auth.credits}</li>,
              <li key="6"><Link to={'/surveys/new'}>New Survey</Link></li>,
              <li key="7"><Payments sideMenu={true} /></li>,
              <li key="8"><a href="/api/logout">Logout</a></li>
            ]
          )
        }
        //If the user does not have enough credits (less than 0) show a button that when clicked alters the user to add more credits
        if(this.props.auth.credits <= 0) {
          return(
            [
              <li key="5" className="sidemenucredits">Credits: {this.props.auth.credits}</li>,
              <li key="6"><a onClick={() => {alert("Please add more credits to your account before creating a survey.")}}>New Survey</a></li>,
              <li key="7"><Payments sideMenu={true} /></li>,
              <li key="8"><a href="/api/logout">Logout</a></li>
            ]
          )
        }
    }
  }

  //Displays navbar on screen
  render(){
    return(
      <div>
        <nav id="navbar">
          <div className="nav-wrapper">
            <Link to={this.props.auth ? '/surveys' : '/'} id="logo">
              <i className="material-icons">mail_outline</i>
              SurveySend
            </Link>
            <a href="#" data-target="mobile-demo" className="sidenav-trigger"><i className="material-icons">menu</i></a>
            <ul className="right hide-on-med-and-down">
              {this.renderContent()}
            </ul>
          </div>
        </nav>
        <ul className="sidenav" id="mobile-demo">
          {this.renderSideContent()}
        </ul>
      </div>
    );
  }
}

//Maps Redux store to props of this component - state.auth is defined in reducers index.js
function mapStateToProps(state){
  // console.log(state)
  return { auth: state.auth};
}

//Wires up Redux Store to this component
export default connect(mapStateToProps)(Header);

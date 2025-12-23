import React, {Component} from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import Header from './Header';
import Landing from './Landing';
import Dashboard from './Dashboard';
import SurveyNew from './surveys/SurveyNew';
import {connect} from 'react-redux';
import * as actions from '../actions';

//BrowserRouter - changes components shown based on URL; Route - sets the rules for what components are shown based on the route the user is on
class App extends Component {
  //Checks user is logged in - Calls the Action Creator fetchUser() when component mounts (lifecycle method)
  componentDidMount(){
    this.props.fetchUser();
  }
  //Main parent component - used for React-Router
  render(){
    return(
      <div className="container">
        <BrowserRouter>
          <div className="container">
            <Header />
            <Route exact={true} path="/" component={Landing} />
            <Route exact={true} path="/surveys" component={Dashboard} />
            <Route path="/surveys/new" component={SurveyNew} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
};

//Wries AC to component
export default connect(null, actions)(App);

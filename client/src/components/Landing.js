import React, {Component} from 'react';
import Stars from '../images/stars.jpg';
import Stats from '../images/stats.png';


//Display component that shows landing page when user first enters app
const Landing = () => {
  return(
    <div id="landing">
      <div className="row">
        <div className="introtext">
          <h4>Discover what you can learn about your users</h4>
          <h6>Sign in below are start creating surveys to send to your users</h6>
        </div>
        <a href="/auth/google"><button className="green btn-flat btn-large white-text"><strong>Discover Insights</strong></button></a>

      </div>
      <div className="row">
        <div className="col s6">
          <div className="row">
          	<i className="medium material-icons green-text text-accent-4">filter_1</i>
          	<p>Login using Google</p>
          </div>
          <div className="row">
            <i className="medium material-icons green-text text-accent-4">filter_2</i>
          	<p>Add credits to your account</p>
          </div>
          <div className="row">
          	<i className="medium material-icons green-text text-accent-4">filter_3</i>
          	<p>Create your survey</p>
          </div>
          <div className="row">
          	<i className="medium material-icons green-text text-accent-4">filter_4</i>
          	<p>Add participants emails</p>
          </div>
          <div className="row">
          	<i className="medium material-icons green-text text-accent-4">filter_5</i>
          	<p>Review and send!</p>
          </div>
          <div className="row">
          	<i className="medium material-icons green-text text-accent-4">filter_6</i>
          	<p>View response counts</p>
          </div>
          <div className="row">
          	<i className="medium material-icons green-text text-accent-4">filter_7</i>
          	<p>Use feedback to make decisions</p>
          </div>
        </div>
        <div className="col s6">
          <img src={Stars} />
          <img src={Stats} />
        </div>
      </div>
    </div>
  );
}

export default Landing;

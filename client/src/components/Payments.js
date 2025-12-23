import React, {Component} from 'react';
import StripeCheckout from 'react-stripe-checkout';
import  {connect} from 'react-redux';
import * as actions from '../actions';

//Component that displays Stripe Add Credits form after clicking add credits button in header
class Payments extends Component{
  returnButtonOrText(){
    if(this.props.sideMenu){
      return(
        <div className="sidemenuaddcreditsbackground">
          <button className="sidemenuaddcredits">
            Add Credits
          </button>
        </div>
      )
    }
    return(
      <button className="btn green white-text">
        Add Credits
      </button>
    )
  }

  render(){
    return(
      <StripeCheckout
        name="Feedback App"
        description="$5 for 5 email credits"
        amount={500}
        token={token => {this.props.handleToken(token)}}
        stripeKey={process.env.REACT_APP_STRIPE_KEY}
      >
      {this.returnButtonOrText()}
      </StripeCheckout>
    );
  }
}

export default connect(null, actions)(Payments);

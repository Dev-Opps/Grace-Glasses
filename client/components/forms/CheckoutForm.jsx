import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios'

export default class CheckoutForm extends React.Component {
  onToken = token => {
    axios.post('/api/checkout/save-stripe-token', token)
    .then(response => response.data)
    .then(data => {
        alert('We are in business', data);
      });
    }


  render() {
    return (
      <StripeCheckout
        token={this.onToken}
        stripeKey="pk_test_C8JNuSYPaxSMyliDj2pt5LYe"    
        billingAddress={true}
      />
    );
  }
}


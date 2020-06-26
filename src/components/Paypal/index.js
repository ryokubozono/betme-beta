import React, { useContext, useEffect, useState } from "react";
import AppLayout from 'components/commons/layout/AppLayout';
import { PayPalButton } from "react-paypal-button-v2";

const Paypal = (props) => {
  return (
    <>
      <AppLayout>
        <PayPalButton
          amount='1'
          currency='JPY' // default is 'USD'
          country='JP'
          shippingPreference="NO_SHIPPING" // default is "GET_FROM_FILE"
          onSuccess={(details, data) => {
            alert("Transaction completed by " + details.payer.name.given_name);
            // OPTIONAL: Call your server to save the transaction
            return fetch("/paypal-transaction-complete", {
              method: "post",
              body: JSON.stringify({
                orderID: data.orderID
              })
            });
          }}

          // sandbox => comment out options, production => enable options
          // currency default is USD
          options={{
            clientId: "AQmjU-3JUfO8J9eV2pJ30hotJCJywhbUNgPiP7mnuFs8ErIYGpVADBuL90Kec0VrWCEBfi2EsB8QJARp",
            currency: 'JPY',
          }}
        
        />
      </AppLayout>
    </>
  )
}

export default Paypal;

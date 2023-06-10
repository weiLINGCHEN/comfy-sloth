// domain/.netlify/functions/create-payment-intent

require("dotenv").config();
const stripe = require("stripe")(process.env.REACT_APP_STRIPE_SECRET_KEY);

exports.handler = async function (event, context) {
  if (event.body) {
    const { cart, subtotal, shipping } = JSON.parse(event.body);

    const calculateOrderAmount = () => {
      // normally would be used to communicate with our own backend or our own api
      // passing the id to get actual value of the items
      // prevent maliciously manipulate the data

      return subtotal + shipping;
    };
    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: calculateOrderAmount(),
        currency: "usd",
      });
      return {
        statusCode: 200,
        body: JSON.stringify({ clientSecret: paymentIntent.client_secret }),
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: JSON.stringify({ msg: error.message }),
      };
    }
  }
  return {
    statusCode: 200,
    body: "create payment intent",
  };
};

import asyncHandler from "../utils/asyncHandler.js";
import Stripe from 'stripe';

// Ensure to use process.env for the secret key in production

export const processPayment = asyncHandler(async (req, res, next) => {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'secret_test_key');
    try {
        const myPayment = await stripe.paymentIntents.create({
            amount: req.body.amount,
            currency: "inr",
            metadata: {
                company: "Ecommerce",
            },
        });

        // console.log("Payment Intent created:", myPayment);
        res.status(200).json({ success: true, client_secret: myPayment.client_secret });
    } catch (error) {
        console.error("Error creating payment intent:", error);
        next(error); // Pass the error to your error-handling middleware
    }
});

export const sendStripeApiKey = asyncHandler(async (req, res, next) => {
    try {
        const stripeApiKey = process.env.STRIPE_API_KEY;
        // console.log("Stripe API Key:", stripeApiKey);
        res.status(200).json({ stripeApiKey });
    } catch (error) {
        console.error("Error sending Stripe API Key:", error);
        next(error); // Pass the error to your error-handling middleware
    }
});

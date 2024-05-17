import express from "express"
import Stripe from "stripe";
import { userVerify } from "../MIDDLEWARE/authMiddleware.js";
import bodyParser from "body-parser";
import Order from "../SCHEMA/orderSchema.js";
import mongoose from "mongoose";


const router = express.Router();

router.post('/create-checkout-session', userVerify, async (req, res) => {
  const stripe = Stripe(process.env.STRIPE_SECRET_KEY)

  try {
    if (req.body.directPurchaseItem) {
      const productIds = await req.body.directPurchaseItem._id;
      const iscustomers = await stripe.customers.create({
        metadata: {
          userId: req.user.id,
          cart: JSON.stringify(productIds),
        },
      });
      const directPurchaseItem = await req.body.directPurchaseItem;
      const line_item = {
        price_data: {
          currency: 'inr',
          product_data: {
            name: directPurchaseItem.name,
            images: [directPurchaseItem.photo[0]],
            metadata: {
              id: directPurchaseItem._id
            }
          },
          unit_amount: directPurchaseItem.price * 100,
        },
        quantity: 1, // Since it's a direct purchase, quantity is 1
      };
      const session = await stripe.checkout.sessions.create({
        shipping_address_collection: {
          allowed_countries: ['US', 'CA', 'IN'],
        },
        shipping_options: [
          {
            shipping_rate_data: {
              type: 'fixed_amount',
              fixed_amount: {
                amount: 0,
                currency: 'inr',
              },
              display_name: 'Free shipping',
              delivery_estimate: {
                minimum: {
                  unit: 'business_day',
                  value: 5,
                },
                maximum: {
                  unit: 'business_day',
                  value: 7,
                },
              },
            },
          },
          {
            shipping_rate_data: {
              type: 'fixed_amount',
              fixed_amount: {
                amount: 1500,
                currency: 'inr',
              },
              display_name: 'Next day air',
              delivery_estimate: {
                minimum: {
                  unit: 'business_day',
                  value: 1,
                },
                maximum: {
                  unit: 'business_day',
                  value: 1,
                },
              },
            },
          },
        ],
        customer: iscustomers.id,
        line_items: [line_item],
        mode: 'payment',
        success_url: `${process.env.CLIENT_URL}/checkout-success`,
        cancel_url: `${process.env.CLIENT_URL}/cart`,
      });

      res.send({ url: session.url }).status(200);
    } else if (req.body.cartItems && req.body.cartItems.length > 0) {

      const productIds = await req.body.cartItems.map(item => item._id);
      const iscustomers = await stripe.customers.create({
        metadata: {
          userId: req.user.id,
          cart: JSON.stringify(productIds),
        },
      });

      const line_items = await req.body.cartItems?.map((item) => {
        return {
          price_data: {
            currency: 'inr',
            product_data: {
              name: item?.name,
              images: [item.photo[0]],
              metadata: {
                id: item._id
              }
            },
            unit_amount:  item.price * 100,
          },
          quantity: item.cartQuantity,
        }

      })
      const session = await stripe.checkout.sessions.create({
        shipping_address_collection: {
          allowed_countries: ['US', 'CA', 'IN'],
        },
        shipping_options: [
          {
            shipping_rate_data: {
              type: 'fixed_amount',
              fixed_amount: {
                amount: 0,
                currency: 'inr',
              },
              display_name: 'Free shipping',
              delivery_estimate: {
                minimum: {
                  unit: 'business_day',
                  value: 5,
                },
                maximum: {
                  unit: 'business_day',
                  value: 7,
                },
              },
            },
          },
          {
            shipping_rate_data: {
              type: 'fixed_amount',
              fixed_amount: {
                amount: 1500,
                currency: 'inr',
              },
              display_name: 'Next day air',
              delivery_estimate: {
                minimum: {
                  unit: 'business_day',
                  value: 1,
                },
                maximum: {
                  unit: 'business_day',
                  value: 1,
                },
              },
            },
          },
        ],
        customer: iscustomers.id,
        line_items,
        mode: 'payment',
        success_url: `${process.env.CLIENT_URL}/checkout-success`,
        cancel_url: `${process.env.CLIENT_URL}/cart`,
      });

      res.send({ url: session.url }).status(200);
    }

    //expand user data

  } catch (error) {
    console.log(`error in stripeControler ${error}`);
    res.status(500).send({
      success: false,
      message: "Internul Server Error"
    })
  }

});


//stripe webhook

// This is your Stripe CLI webhook secret for testing your endpoint locally.

router.post('/webhook', express.raw({ type: 'application/json' }), async(req, res) => {
  let endpointSecret;
  console.log("in webHook");
  //endpointSecret = "whsec_58b95a06d79b824149ca3b4e0ad959621213abf77c0bdb0bad541bd23638990e";
  const stripe = Stripe(process.env.STRIPE_SECRET_KEY)
  const sig = req.headers['stripe-signature'];

  let data;
  let eventtype;

  if (endpointSecret) {
    let event;
    try {
      const bodyString = req.body.toString('utf8');
      event = stripe.webhooks.constructEvent(bodyString, sig, endpointSecret);
      console.log("WebHoook Vrifyed");
    } catch (err) {
      console.log(`Webhook Error: ${err.message}`)
      res.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }
    data = event.data.object;
    eventtype = event.type;
  } else {
    data = req.body.data.object;
    eventtype = req.body.type
  }

  // Handle the event
  if (eventtype === 'checkout.session.completed') {
    console.log("Checkout session completed event received");
   const orderData = await stripe.customers.retrieve(data.customer).then((custo) => {
      console.log("data", data);
      console.log(custo);
      const items = JSON.parse(custo.metadata.cart);
      console.log(items);
      const newOrder = new Order({
        userId: custo.metadata.userId,
        customerId: data.custo,
        paymentIntentId: data.payment_intent,
        productsId: items,
        subTotal: data.amount_subtotal,
        total: data.amount_total,
        shippingAddress: data.customer_details,
        payment_status: data.payment_status
      });

      try {
        if (newOrder) {
          const savedOrder = newOrder.save();
          console.log("Orders Store In Db");
        } else {
          console.log("error while saving to database");
        }
      } catch (error) {
        console.log(error);
      }

    }).catch((err) => console.log(err.message))
  }

  // Return a 200 res to acknowledge receipt of the event
  res.send().end();
});





export default router
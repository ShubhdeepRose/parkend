require("dotenv").config();
const express = require("express");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY_MY);
const router = express.Router();
const { db } = require("../fire/firebase");

const {
  getDocs,
  query,
  collection,
  where,
  doc,
  updateDoc,
} = require("firebase/firestore");

router.post("/create-checkout-session", async (req, res) => {
  console.log(req.body);
  const slot = req.body.seat.data.slot * 1;
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: "inr",
          product_data: {
            name: `PARKING SLOT - ${slot}`,
          },
          unit_amount: 5000,
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `${process.env.CLIENT_URL}/checkout-success`,
    cancel_url: `${process.env.CLIENT_URL}/dashboard`,
    metadata: {
      seatId: req.body.seat.id,
    },
  });

  res.send({ url: session.url });
});

router.post(
  "/webhook",
  express.json({ type: "application/json" }),
  async (req, res) => {
    let data;
    let eventType;
    let webhookSecret;

    if (webhookSecret) {
      let event;
      let signature = req.headers["stripe-signature"];

      try {
        event = stripe.webhooks.constructEvent(
          req.body,
          signature,
          webhookSecret
        );
      } catch (err) {
        console.log(`⚠️  Webhook signature verification failed:  ${err}`);
        return res.sendStatus(400);
      }

      data = event.data.object;
      eventType = event.type;
    } else {
      data = req.body.data.object;
      eventType = req.body.type;
    }

    if (eventType === "checkout.session.completed") {
      const seatId = data.metadata.seatId;
      const dbRef = doc(db, "slots", seatId);

      try {
        await updateDoc(dbRef, {
          status: true,
        });
        console.log(`Seat ${seatId} successfully updated`);
      } catch (err) {
        console.log(`Error updating seat ${seatId}: ${err.message}`);
      }
    }

    res.status(200).end();
  }
);

router.post("/sensor", async (req, res) => {
  const updates = req.body;

  try {
    await Promise.all(
      updates.map(async ({ ultra, status }) => {
        const docRef = doc(db, "slots", ultra);
        await updateDoc(docRef, {
          status: status,
        });
        console.log(
          `Document ${ultra} successfully updated with status ${status}`
        );
      })
    );
    res.sendStatus(200);
  } catch (err) {
    console.log(`Error updating documents: ${err.message}`);
    res.sendStatus(500);
  }
});

router.post("/rfid", async (req, res) => {
  const rfid = req.body.rfid;
  const userQuery = query(collection(db, "users"), where("rfid", "==", rfid));
  const userDocs = await getDocs(userQuery);
  if (!userDocs.empty) {
    const docSnap = userDocs.docs[0];
    const { credit } = docSnap.data();
    if (credit < 100) {
      res.status(403).send("Insufficient credit");
    } else {
      const docRef = doc(db, "users", docSnap.id);
      await updateDoc(docRef, {
        credit: credit - 20,
      });
      console.log(
        `User with rfid ${rfid} successfully updated with new credit: ${
          credit - 20
        }`
      );
      res.sendStatus(200);
    }
  } else {
    res.status(404).send(`User with rfid ${rfid} not found`);
  }
});

module.exports = router;
//The function starts by setting up a webhook secret, which is used to verify the authenticity of incoming webhook requests. If the secret is provided, the function attempts to construct an event object using the Stripe SDK's constructEvent method. If the verification fails, the function responds with a 400 error.

//If the verification succeeds, the function extracts the relevant data from the event object and determines the type of event that was triggered. In this case, the function checks for the checkout.session.completed event type, which is triggered when a customer successfully completes a payment checkout session.

//If the event type is checkout.session.completed, the function extracts the seatId from the metadata of the payment session and updates the corresponding seat status in the database. The function then logs a success message to the console.

//When creating a Checkout Session in Stripe, you can include metadata that will be associated with the session. In this case, the code is expecting that the seatId will be included as metadata when the customer completes the checkout process. The webhook event triggered by the checkout.session.completed event type will then contain this metadata, which the code can extract and use to update the corresponding seat status in the database. So, the seatId is passed back to the server through the webhook event data, allowing the server to associate the payment with the correct seat.

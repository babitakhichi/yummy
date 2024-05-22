const { connectToDatabase } = require("../../lib/mongodb");
import { ObjectId } from "mongodb";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

async function CreateStripeSession(req, res) {
  const { item } = req.body;

  const redirectURL =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000/home"
      : "https://stripe-checkout-next-js-demo.vercel.app";

  const transformedItem = {
    price_data: {
      currency: "usd",
      product_data: {
        images: [item.image],
        name: item.name,
      },
      unit_amount: item.price * 100,
    },
    // date: new Date(),
    quantity: item.quantity,
  };

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [transformedItem],
    mode: "payment",
    success_url: redirectURL + "?status=success",
    cancel_url: redirectURL + "?status=cancel",
    metadata: {
      images: item.image,
    },
  });

  res.json({ id: session.id });
  if (res.status(200)) {
    await orderSuccess(item, item.id);
  }
  // console.log("session", session);
}

async function orderSuccess(transformedItem, id) {
  try {
    let { db } = await connectToDatabase();

    const userUpdatedObj = await db.collection("users").updateOne(
      {
        _id: new ObjectId(id),
      },
      {
        $push: {
          order: { $each: transformedItem?.product },
        },
      }
    );

    if (userUpdatedObj.acknowledged) {
      res.json({
        message: "Address update successfully",
        success: true,
      });
    }
  } catch (error) {
    // Handle any fetch or network error
    console.error("Update API call error:", error);
  }
}
export default CreateStripeSession;

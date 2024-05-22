const { connectToDatabase } = require("../../../lib/mongodb");
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  try {
    let { db } = await connectToDatabase();
    const { id } = req.query;
    const data = JSON.parse(req.body);

    const user = await db.collection("users").updateOne(
      {
        _id: new ObjectId(id),
      },
      {
        $set: {
          ...data,
        },
      }
    );
    console.log("user", user);
    if (user.acknowledged) {
      res.json({
        message: "Address update successfully",
        success: true,
      });
    }
  } catch (error) {
    console.log("error", error);
    return res.json({
      message: new Error(error).message,
      success: false,
    });
  }
}

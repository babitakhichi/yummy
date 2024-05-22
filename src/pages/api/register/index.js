const { connectToDatabase } = require("../../../lib/mongodb");

export default async function handler(req, res) {
  let data = JSON.parse(req.body);
  try {
    let { db } = await connectToDatabase();
    const user = await db.collection("users").findOne({ email: data.email });
    if (!user) {
      await db.collection("users").insertOne(JSON.parse(req.body));
      return res.json({
        message: "Sign-Up successfully",
        success: true,
      });
    } else {
      res.status(400).json({ error: "User already exists" });
    }
  } catch (error) {
    return res.json({
      message: new Error(error).message,
      success: false,
    });
  }
}

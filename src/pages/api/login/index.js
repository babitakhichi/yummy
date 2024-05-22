const { connectToDatabase } = require("../../../lib/mongodb");

export default async function handler(req, res) {
  try {
    let { db } = await connectToDatabase();
    const { email, password } = JSON.parse(req.body);

    const user = await db.collection("users").findOne(JSON.parse(req.body));

    if (user) {
      //check if password matches
      const result = password === user.password;

      let data = user;
      delete data.password;
      if (result) {
        res.json({
          message: "Login successfully",
          success: true,
          data: data,
        });
      } else {
        res.status(400).json({ error: "password doesn't match" });
      }
    } else {
      res.status(400).json({ error: "User doesn't exist" });
    }
  } catch (error) {
    return res.json({
      message: new Error(error).message,
      success: false,
    });
  }
}

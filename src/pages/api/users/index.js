// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const { connectToDatabase } = require("../../../lib/mongodb");
const ObjectId = require("mongodb").ObjectId;

export default async function handler(req, res) {
  // switch the methods
  switch (req.method) {
    case "GET": {
      return getPosts(req, res);
    }

    case "POST": {
      return addPost(req, res);
    }

    case "PUT": {
      return updatePost(req, res);
    }

    case "DELETE": {
      return deletePost(req, res);
    }
  }
}

// Getting all posts.
// async function getPosts(req, res) {
//   try {
//     let { db } = await connectToDatabase();
//     let posts = await db
//       .collection("users")
//       .find({})
//       .sort({ published: -1 })
//       .toArray();
//     return res.json({
//       message: JSON.parse(JSON.stringify(posts)),
//       success: true,
//     });
//   } catch (error) {
//     return res.json({
//       message: new Error(error).message,
//       success: false,
//     });
//   }
// }
async function getPosts(req, res) {
  const { id } = req.query;
  try {
    let { db } = await connectToDatabase();
    let posts = await db.collection("users").findOne({ _id: new ObjectId(id) });

    return res.json({
      data: JSON.parse(JSON.stringify(posts)),
      success: true,
    });
  } catch (error) {
    return res.json({
      message: new Error(error).message,
      success: false,
    });
  }
}
// Adding a new post
async function addPost(req, res) {
  try {
    let { db } = await connectToDatabase();
    await db.collection("users").insertOne(JSON.parse(req.body));
    return res.json({
      message: "Sign-Up successfully",
      success: true,
    });
  } catch (error) {
    return res.json({
      message: new Error(error).message,
      success: false,
    });
  }
}

// Updating a post
async function updatePost(req, res) {
  try {
    let { db } = await connectToDatabase();

    await db.collection("users").updateOne(
      {
        _id: new ObjectId(req.body),
      },
      { $set: { published: true } }
    );

    return res.json({
      message: "Post updated successfully",
      success: true,
    });
  } catch (error) {
    return res.json({
      message: new Error(error).message,
      success: false,
    });
  }
}

// deleting a post
async function deletePost(req, res) {
  try {
    let { db } = await connectToDatabase();

    await db.collection("users").deleteOne({
      _id: new ObjectId(req.body),
    });

    return res.json({
      message: "Post deleted successfully",
      success: true,
    });
  } catch (error) {
    return res.json({
      message: new Error(error).message,
      success: false,
    });
  }
}

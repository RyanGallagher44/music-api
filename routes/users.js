import { Router } from "express";

const router = Router();
import { users } from "../config/mongoCollections.js";

router.get("/:id", async (req, res) => {
  const userCollection = await users();
  const { id } = req.params;

  const user = await userCollection.findOne({ id: id });

  res.json(user);
});

router.post("/like", async (req, res) => {
  const userCollection = await users();
  const { userId } = req.body;
  const { artistId } = req.body;

  await userCollection.updateOne(
    { id: userId },
    { $push: { artists: artistId } },
  );

  res.json({
    success: `User ${userId} liked artist ${artistId}`,
  });
});

router.post("/unlike", async (req, res) => {
  const userCollection = await users();
  const { userId } = req.body;
  const { artistId } = req.body;

  await userCollection.updateOne(
    { id: userId },
    { $pull: { artists: artistId } },
  );

  res.json({
    success: `User ${userId} unliked artist ${artistId}`,
  });
});

export default router;

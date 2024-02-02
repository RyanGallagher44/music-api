import { Router } from "express";

const router = Router();
import { users } from "../config/mongoCollections.js";

router.get("/:id", async (req, res) => {
  const userCollection = await users();
  const { id } = req.params;

  const user = await userCollection.findOne({ id: id });

  res.json(user);
});

router.post("/artist/like", async (req, res) => {
  const userCollection = await users();
  const { userId } = req.body;
  const { artistId } = req.body;

  await userCollection.updateOne(
    { id: userId },
    { $push: { artists: artistId } }
  );

  res.json({
    success: `User ${userId} liked artist ${artistId}`,
  });
});

router.post("/artist/unlike", async (req, res) => {
  const userCollection = await users();
  const { userId } = req.body;
  const { artistId } = req.body;

  await userCollection.updateOne(
    { id: userId },
    { $pull: { artists: artistId } }
  );

  res.json({
    success: `User ${userId} unliked artist ${artistId}`,
  });
});

router.post("/track/like", async (req, res) => {
  const userCollection = await users();
  const { userId } = req.body;
  const { trackId } = req.body;

  await userCollection.updateOne(
    { id: userId },
    { $push: { tracks: trackId } }
  );
  res.json({
    success: `User ${userId} liked track ${trackId}`,
  });
});

router.post("/track/unlike", async (req, res) => {
    const userCollection = await users();
    const { userId } = req.body;
    const { trackId } = req.body;
  
    await userCollection.updateOne(
      { id: userId },
      { $pull: { tracks: trackId } }
    );
  
    res.json({
      success: `User ${userId} unliked track ${trackId}`,
    });
  });

export default router;
import { Router } from "express";
import { spotify } from "./helpers.js";

const router = Router();

// audio-analysis endpoint removed: Spotify deprecated audio-features/audio-analysis

router.post("/:id", async (req, res) => {
  const { id } = req.params;
  const { accessToken } = req.body;
  const data = await spotify(`/albums/${id}/tracks?market=US`, accessToken);
  res.json(data);
});

export default router;

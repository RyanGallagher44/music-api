import { Router } from "express";
import { addToFeatureValues, reformatFeatures, spotify } from "./helpers.js";

const router = Router();

router.post("/:id/audio-analysis", async (req, res) => {
  const { id } = req.params;
  const { accessToken } = req.body;
  const data = await spotify(`/albums/${id}/tracks?market=US`, accessToken);
  const trackIds = [];
  data.items.forEach((track) => {
    trackIds.push(track.id);
  });
  let features = {
    acousticness: 0,
    danceability: 0,
    duration: 0,
    energy: 0,
    instrumentalness: 0,
    key: 0,
    liveness: 0,
    loudness: 0,
    mode: 0,
    speechiness: 0,
    tempo: 0,
    timeSignature: 0,
    valence: 0,
  };
  for (let i = 0; i < trackIds.length; i++) {
    const data = await spotify(`/audio-features/${trackIds[i]}`, accessToken);
    features = addToFeatureValues(features, data);
  }
  features = reformatFeatures(features, trackIds.length);
  res.json(features);
});

router.post("/:id", async (req, res) => {
  const { id } = req.params;
  const { accessToken } = req.body;
  const data = await spotify(`/albums/${id}/tracks?market=US`, accessToken);
  res.json(data);
});

export default router;

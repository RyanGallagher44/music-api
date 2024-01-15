import { Router } from "express";

const router = Router();
import { spotify } from "./helpers.js";

router.post(`/search`, async (req, res) => {
  const { searchTerm, accessToken } = req.body;
  const data = await spotify(
    `/search?q=${searchTerm}&type=artist`,
    accessToken,
  );
  res.json(data);
});

router.post(`/:id`, async (req, res) => {
  const { accessToken } = req.body;
  const { id } = req.params;
  const data = await spotify(`/artists/${id}`, accessToken);
  res.json(data);
});

router.post(`/:id/top-tracks`, async (req, res) => {
  const { accessToken } = req.body;
  const { id } = req.params;
  const data = await spotify(
    `/artists/${id}/top-tracks?market=US`,
    accessToken,
  );
  res.json(data);
});

router.post(`/:id/albums`, async (req, res) => {
  const { accessToken } = req.body;
  const { id } = req.params;
  const data = await spotify(`/artists/${id}/albums?market=US`, accessToken);
  res.json(data);
});

export default router;

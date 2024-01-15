import { Router } from "express";
import { spotify } from "./helpers.js";

const router = Router();

router.post("/:id", async (req, res) => {
  const { id } = req.params;
  const { accessToken } = req.body;
  const data = await spotify(`/tracks/${id}`, accessToken);
  res.json(data);
});

export default router;

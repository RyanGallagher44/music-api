import { Router } from "express";

const router = Router();
import axios from "axios";

router.post("/:id", async (req, res) => {
  const id = req.params.id;
  const accessToken = req.body.accessToken;
  const { data } = await axios.get(`https://api.spotify.com/v1/tracks/${id}`, {
    headers: {
      Authorization: "Bearer " + accessToken,
    },
  });
  res.json(data);
});

export default router;

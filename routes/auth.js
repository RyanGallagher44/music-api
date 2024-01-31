import { Router } from "express";

const router = Router();
import querystring from "node:querystring";
import { config } from "dotenv";
import axios from "axios";
import { spotify } from "./helpers.js";
import { users } from "../config/mongoCollections.js";

config();

let client_id = process.env.client_id;
let client_secret = process.env.client_secret;
let redirect_uri = process.env.redirect_uri;

router.get("/login", (req, res) => {
  const scope = "user-read-private user-read-email user-follow-read";
  res.redirect(
    `https://accounts.spotify.com/authorize?${querystring.stringify({
      response_type: "code",
      client_id,
      scope,
      redirect_uri,
    })}`,
  );
});

router.get("/callback", async (req, res) => {
  const code = req.query.code || null;

  const tokenParams = {
    code,
    redirect_uri,
    grant_type: "authorization_code",
    client_id,
    client_secret,
  };

  try {
    const tokenResponse = await axios.post(
      "https://accounts.spotify.com/api/token",
      querystring.stringify(tokenParams),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      },
    );

    const accessToken = tokenResponse.data.access_token;

    const data = await spotify("/me", accessToken);

    const userCollection = await users();
    const user = await userCollection.findOne({ id: data.id });
    if (user === null) {
      data.tracks = [];
      data.artists = [];
      await userCollection.insertOne(data);

      return res.redirect(`http://localhost:3000/?token=${accessToken}`);
    } else {
      return res.redirect(`http://localhost:3000/?token=${accessToken}`);
    }
  } catch (error) {
    console.error("Error exchanging code for access token:", error.message);
    return res.status(500).send("Error during authentication");
  }
});

export default router;

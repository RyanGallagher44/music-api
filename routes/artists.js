import {Router} from "express"
const router = Router();
import querystring from 'node:querystring';
import { config } from 'dotenv';
import axios from 'axios';

router.post('/search', async (req, res) => {
    // https://api.spotify.com/v1/search?q=artist&type=artist
    let searchTerm = req.body.searchTerm
    let accessToken = req.body.accessToken
    let {data} = await axios.get(`https://api.spotify.com/v1/search?q=${searchTerm}&type=artist`, {
        headers: {
        Authorization: 'Bearer ' + accessToken
        }
    })
    res.json(data)
});





export default router;
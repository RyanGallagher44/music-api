import {Router} from "express"
const router = Router();
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

router.post(`/:id`, async (req, res) => {
    let accessToken = req.body.accessToken
    let id = req.params.id
    let {data} = await axios.get(`https://api.spotify.com/v1/artists/${id}/top-tracks?market=US`, {
        headers: {
        Authorization: 'Bearer ' + accessToken
        }
    })
    res.json(data)
})



export default router;
import { Router } from 'express';
const router = Router();
import querystring from 'node:querystring';
import axios from 'axios';

router.get('/', async (req, res) => {
    const config = {
        headers: { Authorization: `Bearer ${req.query.code}` }
    };

    const { data } = await axios.get('https://api.spotify.com/v1/search?q=famous', config);

    res.json(data);
});

let client_id = '132f4ea63f7c4eb58c7ce744a33479fa';
let redirect_uri = 'http://localhost:3030/music';

router.get('/login', function(req, res) {
  let scope = 'user-read-private user-read-email';

  res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: client_id,
      scope: scope,
      redirect_uri: redirect_uri
    }));
});

export default router;
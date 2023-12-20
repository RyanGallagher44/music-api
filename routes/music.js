import { Router } from 'express';
const router = Router();
import querystring from 'node:querystring';
import request from 'request';
import { config } from 'dotenv';

config();

let client_id = process.env.client_id;
let client_secret = process.env.client_secret;
let redirect_uri = process.env.redirect_uri;

router.get('/', async (req, res) => {
    // your application requests refresh and access tokens
    // after checking the state parameter
    let code = req.query.code || null;

    var authOptions = {
        url: 'https://accounts.spotify.com/api/token',
        form: {
            code: code,
            redirect_uri: redirect_uri,
            grant_type: 'authorization_code'
        },
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            Authorization: 'Basic ' + (new Buffer.from(client_id + ':' + client_secret).toString('base64'))
        },
        json: true
    };
  
    request.post(authOptions, function(error, response, body) {
        if (!error && response.statusCode === 200) {
            var access_token = body.access_token,
                refresh_token = body.refresh_token;
  
            var options = {
                url: 'https://api.spotify.com/v1/search?q=good%20charlotte&type=artist',
                headers: { 'Authorization': 'Bearer ' + access_token },
                json: true
            };
  
            // use the access token to access the Spotify Web API
            request.get(options, function(error, response, body) {
                res.json(body);
            });
        } else {
            res.redirect('/#' +
            querystring.stringify({
              error: 'invalid_token'
            }));
        }
    });
});

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
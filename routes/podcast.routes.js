
const router = require('express').Router();
const axios = require('axios');
require('dotenv').config(); 
 //Is required to read .env file 

const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;
const redirect_uri = 'https://localhost:5173/';

//1. GET ACCESS TOKEN FROM SPOTIFY API (https:developer.spotify.com/documentation/general/guides/authorization/client-credentials/)
//SUCCESSFUL RESPONSE LOOKS LIKE THIS USE 'access_token' in step 2
 {
  "access_token": "NgCXRKc...MzYjw",
  "token_type": "bearer",
  "expires_in": 3600/ };

let token;

 const authOptions = {
   baseUrl: 'https:accounts.spotify.com/api/token',
   headers: {
     Authorization: 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
   },
    form: {
   grant_type: 'client_credentials'
  },
 json: true
};

  axios.post(authOptions)
  .then(response => {
  token = response.data.access_token;
    fetchShows();
  })
  .catch(error => {
    console.error(error);
  });



// 2. USE ACCESS TOKEN IN REQUEST TO FETCH PODCAST DATA (see spotifyAPI below 'token')

 const spotifyAPI = axios.create({
   baseUrl: 'https:api.spotify.com/v1',
   headers: {
     Authorization: `Bearer ${token}`,
     'Content-Type': 'application/x-www-form-urlencoded',
   }
 });

 function fetchShows(url) {
    const requestUrl = url || '/shows';
    spotifyAPI.get(requestUrl, {
      params: {
        q: 'podcast',
        limit: 50
      }
    })
      .then(response => {
        const shows = response.data.items;
        if (response.data.next) {
          fetchShows(response.data.next);
        } else {
          console.log(shows);
        }
      })
      .catch(error => {
        console.error(error);
      });
  }
  
  router.get('/shows', (req, res, next) => {
    fetchShows();
  });
  
module.exports = router;

/* const SpotifyWebApi = require('spotify-web-api-node')
require('dotenv').config();  Is required to read .env file 
const router = require('express').Router()



const spotifyApi = new SpotifyWebApi({
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
})

router.get('/podcast', (req, res, next) => {
    res.json('All good')
})

   Retrieve an access token
  spotifyApi
    .clientCredentialsGrant()
    .then(data => spotifyApi.setAccessToken(data.body['access_token']))
    .catch(error => console.log('Something went wrong when retrieving an access token', error))


    router.get('/shows', (req, res) => {
        console.log(req.query)
        const podcast = req.query.podcastSearch
        spotifyApi
      .searchPodcasts(podcast)
      .then(data => {
        console.log('The received data from the API: ', data.body)
        const allPodcasts = data.body.podcast.items
        res.render('shows-search-results', {allPodcasts})
      })
      .catch(err => console.log('The error while searching artists occurred: ', err))
    })
    
    router.get('/shows-search-results', (req, res) => {
        res.render('/shows-search-results')
    })
    
    router.listen(5173, () => console.log('My Spotify project running on port 3000'))
    
    */
const router = require('express').Router()
const qs = require('qs');
const axios = require('axios');
require('dotenv').config(); 
 //Is required to read .env file 

const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;
const auth_token = Buffer.from(`${client_id}:${client_secret}`, 'utf-8').toString('base64');

const getAuth = async () => {
  try{
    //make post request to SPOTIFY API for access token, sending relavent info
    const token_url = 'https://accounts.spotify.com/api/token';
    const data = qs.stringify({'grant_type':'client_credentials'});

    const response = await axios.post(token_url, data, {
      headers: { 
        'Authorization': `Basic ${auth_token}`,
        'Content-Type': 'application/x-www-form-urlencoded' 
      }
    })
    //return access token
    return response.data.access_token;
   // console.log(response.data.access_token);   
  }catch(error){
    //on fail, log the error in console
    console.log(error);
  }
}

const searchShows = async (ids) => {
  //request token using getAuth() function
  const access_token = await getAuth();
  //console.log(access_token);

  const api_url = `https://api.spotify.com/v1/shows?ids=${ids}`;
  //console.log(api_url);
  try{
    const response = await axios.get(api_url, {
      headers: {
        'Authorization': `Bearer ${access_token}`
      }
    });
      //console.log(response.data);
    return response.data.shows;
  }catch(error){
    console.log(error);
  }  
};

router.get('/search', async (req, res, next) => {
  const ids = req.query.ids;
  if (!ids) {
    return res.status(400).send('Bad request');
  }

  try {
    const data = await searchShows(ids);
    res.status(200).send(data);
  } catch (error) {
    next(error);
  }
});

module.exports = router

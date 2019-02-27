const express = require('express');
const basicAuth = require('express-basic-auth')
const SquareConnect = require('square-connect');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(basicAuth({
  users: { 
    'greysnaa@gmail.com': process.env.BASIC_AUTH_PW_1,
    'brock@sharproot.com': process.env.BASIC_AUTH_PW_2
  },
  unauthorizedResponse: getUnauthorizedResponse
}))

function getUnauthorizedResponse(req) {
  return req.auth
    ? ('Obviously ' + req.auth.user + ':' + req.auth.password + ' isn\'t cool enough to access this inf. Loser.')
    : 'Dude, you didn\'t provide the correct digits.'
}

var defaultClient = SquareConnect.ApiClient.instance;
var oauth2 = defaultClient.authentications['oauth2'];
oauth2.accessToken = process.env.SOOPER_SEKRET_KEY;

var square_api = new SquareConnect.LocationsApi();


app.listen(PORT, () => {
  console.log('We are live on ' + PORT);
});

app.get('/', (req, res, next) => {
  res.send('Hello there. Please supply the correct URL and super secret password to continue.');
});

app.get("/get", (req, res, next) => {

  square_api.listLocations().then(function (data) {
  
    console.log('API called successfully. Returned data: ' + JSON.stringify(data));
    res.json(data);
  
  }, function (error) {
    console.error(error);
  });


  // res.json(["Tony", "Lisa", "Michael", "Ginger", "Food"]);
});
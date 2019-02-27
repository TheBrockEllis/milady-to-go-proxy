const express = require('express');
const bodyParser = require('body-parser');
const SquareConnect = require('square-connect');
const app = express();
const PORT = process.env.PORT || 3000;

var defaultClient = SquareConnect.ApiClient.instance;

// Configure OAuth2 access token for authorization: oauth2
var oauth2 = defaultClient.authentications['oauth2'];
oauth2.accessToken = process.env.SOOPER_SEKRET_KEY;

var square_api = new SquareConnect.LocationsApi();


app.listen(PORT, () => {
  console.log('We are live on ' + PORT);
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
const express = require('express');
const cors = require('cors');
const basicAuth = require('express-basic-auth')
const SquareConnect = require('square-connect');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.use(basicAuth({
  users: { 
    'greysnaa@gmail.com': process.env.BASIC_AUTH_PW_1,
    'brock@sharproot.com': process.env.BASIC_AUTH_PW_2
  },
  unauthorizedResponse: getUnauthorizedResponse
}))

function getUnauthorizedResponse(req) {
  return req.auth
    ? ('Obviously ' + req.auth.user + ':' + req.auth.password + ' isn\'t cool enough to access this info. Loser.')
    : 'Dude, you didn\'t provide the correct digits.'
}

const defaultClient = SquareConnect.ApiClient.instance;
const oauth2 = defaultClient.authentications['oauth2'];
oauth2.accessToken = process.env.SOOPER_SEKRET_KEY;

var api_instance; 

app.get('/', (req, res, next) => {
  res.send('Hello there. Please supply the correct URL and super secret password to continue.');
});

app.get("/locations", (req, res, next) => {
  api_instance = new SquareConnect.LocationsApi();

  api_instance.listLocations().then(function (data) {
    console.log('API called successfully. Returned data: ' + JSON.stringify(data));
    res.json(data);
  
  }, function (error) {
    console.error(error);
  });
});

app.get("/catalogitems", (req, res, next) => {
  api_instance  = new SquareConnect.CatalogApi();

  var opts = {
    // 'cursor': "cursor_example", // String | The pagination cursor returned in the previous response. Leave unset for an initial request. See [Paginating results](#paginatingresults) for more information.
    'types': "ITEM" // String | An optional case-insensitive, comma-separated list of object types to retrieve, for example `ITEM,ITEM_VARIATION,CATEGORY`.  The legal values are taken from the [CatalogObjectType](#type-catalogobjecttype) enumeration, namely `\"ITEM\"`, `\"ITEM_VARIATION\"`, `\"CATEGORY\"`, `\"DISCOUNT\"`, `\"TAX\"`, `\"MODIFIER\"`, or `\"MODIFIER_LIST\"`.
  };
  api_instance.listCatalog(opts).then(function (data) {
    console.log('API called successfully. Returned data: ' + data);
    res.json(data);
  }, function (error) {
    console.error(error);
  });
});

app.listen(PORT, () => {
  console.log('We are live on ' + PORT);
});

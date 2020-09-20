const crypto = require('crypto');

exports.handler = function (event, context, callback) {
  console.log('--------------- BODY ---------------');
  console.log(JSON.parse(event.body));
  console.log('--------------- HEADERS ---------------');
  console.log(event.headers);

  const hmac = event.headers['x-shopify-hmac-sha256'];

  const hash = crypto
    .createHmac('sha256', process.env.SHOPIFY_WEBHOOK_KEY)
    .update(event.body, 'utf8', 'hex')
    .digest('base64');

  // Compare our hash to Shopify's hash
  if (hash === hmac) {
    // It's a match! All good
    console.log('MATCH');
    callback(null, {
      statusCode: 200,
    });
  } else {
    console.log('NO MATCH');
    // No match! This request didn't originate from Shopify
    callback(null, {
      statusCode: 403,
    });
  }
};

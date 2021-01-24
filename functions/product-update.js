const faunadb = require('faunadb');
const verifyWebhookIntegrity = require('shopify-verify-webhook');
const axios = require('axios');

const q = faunadb.query;
const client = new faunadb.Client({
  secret: process.env.FAUNADB_SECRET,
});

exports.handler = function (event, context, callback) {
  const isValid = verifyWebhookIntegrity(
    process.env.SHOPIFY_WEBHOOK_KEY,
    event.headers['x-shopify-hmac-sha256'],
    event.body
  );

  if (isValid) {
    const body = JSON.parse(event.body);
    const { id } = body;
    delete body.updated_at;
    body.variants.forEach(variant => {
      delete variant.updated_at;
      delete variant.inventory_quantity;
      delete variant.old_inventory_quantity;
    });

    const bodyString = JSON.stringify(body);

    client
      .query(q.Get(q.Match(q.Index('product_by_id'), id)))
      .then(result => {
        if (result.data.product !== bodyString) {
          client
            .query(
              q.Update(result.ref, {
                data: { product: bodyString },
              })
            )
            .then(() => {
              // call rebuild
              axios.post(process.env.NETLIFY_BUILD_URL);
            })
            .catch(e => {
              console.log('error updating product: ', e);
            });
        }
      })
      .catch(() => {
        client
          .query(
            q.Create(q.Collection('products'), {
              data: { id, product: bodyString },
            })
          )
          .then(() => {
            // call rebuild
            axios.post(process.env.NETLIFY_BUILD_URL);
          })
          .catch(e => {
            console.log('error adding to db: ', e);
          });
      });
  } else {
    callback(null, {
      statusCode: 403,
      body: 'Error',
    });
  }
};

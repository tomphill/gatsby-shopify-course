const crypto = require('crypto');
const faunadb = require('faunadb');

const q = faunadb.query;
const client = new faunadb.Client({
  secret: process.env.FAUNADB_SECRET,
});

exports.handler = function (event, context, callback) {
  const hmac = event.headers['x-shopify-hmac-sha256'];

  const hash = crypto
    .createHmac('sha256', process.env.SHOPIFY_WEBHOOK_KEY)
    .update(event.body, 'utf8', 'hex')
    .digest('base64');

  // Compare our hash to Shopify's hash
  if (hash === hmac) {
    // check against db
    if (event.body) {
      try {
        const body = JSON.parse(event.body);
        const { id } = body;
        // remove all updated dates and inventory fields
        delete body.updated_at;
        body.variants.forEach((v, i) => {
          delete v.updated_at;
          delete v.inventory_quantity;
          delete v.old_inventory_quantity;
        });

        const bodyString = JSON.stringify(body);

        client
          .query(q.Get(q.Match(q.Index('product_by_id'), id)))
          .then(result => {
            if (result.data.product !== bodyString) {
              // update record
              client
                .query(
                  q.Update(q.Ref(q.Collection('products'), id), {
                    data: { product: bodyString },
                  })
                )
                .then(() => {
                  // call rebuild
                });
            }
          })
          .catch(() => {
            // add to db
            client
              .query(
                q.Create(q.Collection('posts'), {
                  data: { id, product: bodyString },
                })
              )
              .then(() => {
                // call rebuild
              });
          });
      } catch (e) {}
    }
  } else {
    // This request didn't originate from Shopify
    callback(null, {
      statusCode: 403,
    });
  }
};

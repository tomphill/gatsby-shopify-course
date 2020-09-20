import { POINT_CONVERSION_COMPRESSED } from 'constants';
import crypto from 'crypto';
import faunadb from 'faunadb';

const q = faunadb.query;
const client = new faunadb.Client({
    secret: process.env.FAUNADB_SECRET
})

exports.handler = async = (event, context, callback) => {
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

    // check against db
    if (event.body) {
      try {
        console.log('--------------- BODY ---------------');
        const body = JSON.parse(event.body);
        console.log(body);
        const { id } = body;
        const result = await client.query(q.Get(q.Ref(q.Collection('products'), id)));
        if(result){
            console.log('result! ', result);
        }else{
            console.log('no result ', result);
        }

        const result1 = await client.query(q.Get(q.Ref(q.Collection('products'), 1)));
        if(result1){
            console.log('result1! ', result1);
        }else{
            console.log('no result1 ', result1);
        }
      } catch (e) {}
    }
  } else {
    console.log('NO MATCH');
    // No match! This request didn't originate from Shopify
    callback(null, {
      statusCode: 403,
    });
  }
};

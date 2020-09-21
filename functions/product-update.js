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

        console.log('NEW BODY ---------------------------');
        console.log(body);
        /*
        {
  id: 5427710230692,
  title: '3 part Knitted Wool Cap',
  body_html: '<p>3 part full face knitted wool cap. Perfect for winter!</p>',
  vendor: 'tomphill',
  product_type: 'Winter hat',
  created_at: '2020-07-09T00:37:32-04:00',
  handle: '3-part-knitted-wool-cap',
  updated_at: '2020-09-21T00:01:50-04:00',
  published_at: '2020-07-09T00:37:22-04:00',
  template_suffix: '',
  published_scope: 'web',
  tags: 'Winter',
  admin_graphql_api_id: 'gid://shopify/Product/5427710230692',
  variants: [
    {
      id: 35099710193828,
      product_id: 5427710230692,
      title: 'Black',
      price: '5.00',
      sku: '28986468-black',
      position: 1,
      inventory_policy: 'deny',
      compare_at_price: '18.26',
      fulfillment_service: 'oberlo',
      inventory_management: 'shopify',
      option1: 'Black',
      option2: null,
      option3: null,
      created_at: '2020-07-09T00:37:32-04:00',
      updated_at: '2020-09-21T00:01:50-04:00',
      taxable: false,
      barcode: '',
      grams: 0,
      image_id: 17926440648868,
      weight: 0,
      weight_unit: 'lb',
      inventory_item_id: 37038313570468,
      inventory_quantity: 5,
      old_inventory_quantity: 5,
      requires_shipping: true,
      admin_graphql_api_id: 'gid://shopify/ProductVariant/35099710193828'
    },
    {
      id: 35099710226596,
      product_id: 5427710230692,
      title: 'Beige',
      price: '18.26',
      sku: '28986468-beige',
      position: 2,
      inventory_policy: 'deny',
      compare_at_price: '18.26',
      fulfillment_service: 'oberlo',
      inventory_management: 'shopify',
      option1: 'Beige',
      option2: null,
      option3: null,
      created_at: '2020-07-09T00:37:32-04:00',
      updated_at: '2020-08-22T04:08:50-04:00',
      taxable: false,
      barcode: null,
      grams: 0,
      image_id: 17926440681636,
      weight: 0,
      weight_unit: 'lb',
      inventory_item_id: 37038313603236,
      inventory_quantity: 0,
      old_inventory_quantity: 0,
      requires_shipping: true,
      admin_graphql_api_id: 'gid://shopify/ProductVariant/35099710226596'
    },
    {
      id: 35099710259364,
      product_id: 5427710230692,
      title: 'Pink',
      price: '18.26',
      sku: '28986468-pink',
      position: 3,
      inventory_policy: 'deny',
      compare_at_price: '18.26',
      fulfillment_service: 'oberlo',
      inventory_management: 'shopify',
      option1: 'Pink',
      option2: null,
      option3: null,
      created_at: '2020-07-09T00:37:32-04:00',
      updated_at: '2020-08-22T04:08:50-04:00',
      taxable: false,
      barcode: null,
      grams: 0,
      image_id: 17926440583332,
      weight: 0,
      weight_unit: 'lb',
      inventory_item_id: 37038313636004,
      inventory_quantity: 0,
      old_inventory_quantity: 0,
      requires_shipping: true,
      admin_graphql_api_id: 'gid://shopify/ProductVariant/35099710259364'
    },
    {
      id: 35099710292132,
      product_id: 5427710230692,
      title: 'Brown',
      price: '18.26',
      sku: '28986468-brown',
      position: 4,
      inventory_policy: 'deny',
      compare_at_price: '18.26',
      fulfillment_service: 'oberlo',
      inventory_management: 'shopify',
      option1: 'Brown',
      option2: null,
      option3: null,
      created_at: '2020-07-09T00:37:32-04:00',
      updated_at: '2020-08-22T04:08:50-04:00',
      taxable: false,
      barcode: null,
      grams: 0,
      image_id: 17926440714404,
      weight: 0,
      weight_unit: 'lb',
      inventory_item_id: 37038313668772,
      inventory_quantity: 0,
      old_inventory_quantity: 0,
      requires_shipping: true,
      admin_graphql_api_id: 'gid://shopify/ProductVariant/35099710292132'
    },
    {
      id: 35099710324900,
      product_id: 5427710230692,
      title: 'Burgundy',
      price: '18.26',
      sku: '28986468-burgundy',
      position: 5,
      inventory_policy: 'deny',
      compare_at_price: '18.26',
      fulfillment_service: 'oberlo',
      inventory_management: 'shopify',
      option1: 'Burgundy',
      option2: null,
      option3: null,
      created_at: '2020-07-09T00:37:33-04:00',
      updated_at: '2020-08-22T04:08:50-04:00',
      taxable: false,
      barcode: null,
      grams: 0,
      image_id: 17926440747172,
      weight: 0,
      weight_unit: 'lb',
      inventory_item_id: 37038313701540,
      inventory_quantity: 0,
      old_inventory_quantity: 0,
      requires_shipping: true,
      admin_graphql_api_id: 'gid://shopify/ProductVariant/35099710324900'
    },
    {
      id: 35099710390436,
      product_id: 5427710230692,
      title: 'Navy Blue',
      price: '18.26',
      sku: '28986468-navy-blue',
      position: 6,
      inventory_policy: 'deny',
      compare_at_price: '18.26',
      fulfillment_service: 'oberlo',
      inventory_management: 'shopify',
      option1: 'Navy Blue',
      option2: null,
      option3: null,
      created_at: '2020-07-09T00:37:33-04:00',
      updated_at: '2020-08-22T04:08:50-04:00',
      taxable: false,
      barcode: null,
      grams: 0,
      image_id: 17926440616100,
      weight: 0,
      weight_unit: 'lb',
      inventory_item_id: 37038313734308,
      inventory_quantity: 0,
      old_inventory_quantity: 0,
      requires_shipping: true,
      admin_graphql_api_id: 'gid://shopify/ProductVariant/35099710390436'
    }
  ],
  options: [
    {
      id: 6917091983524,
      product_id: 5427710230692,
      name: 'Color',
      position: 1,
      values: [Array]
    }
  ],
  images: [
    {
      id: 17926440550564,
      product_id: 5427710230692,
      position: 1,
      created_at: '2020-07-09T00:37:32-04:00',
      updated_at: '2020-07-09T00:37:32-04:00',
      alt: null,
      width: 900,
      height: 900,
      src: 'https://cdn.shopify.com/s/files/1/0430/4800/9892/products/product-image-1338651730.jpg?v=1594269452',
      variant_ids: [],
      admin_graphql_api_id: 'gid://shopify/ProductImage/17926440550564'
    },
    {
      id: 17926440583332,
      product_id: 5427710230692,
      position: 2,
      created_at: '2020-07-09T00:37:32-04:00',
      updated_at: '2020-07-09T00:37:32-04:00',
      alt: null,
      width: 640,
      height: 640,
      src: 'https://cdn.shopify.com/s/files/1/0430/4800/9892/products/product-image-1338651737.jpg?v=1594269452',
      variant_ids: [Array],
      admin_graphql_api_id: 'gid://shopify/ProductImage/17926440583332'
    },
    {
      id: 17926440616100,
      product_id: 5427710230692,
      position: 3,
      created_at: '2020-07-09T00:37:32-04:00',
      updated_at: '2020-07-09T00:37:32-04:00',
      alt: null,
      width: 640,
      height: 640,
      src: 'https://cdn.shopify.com/s/files/1/0430/4800/9892/products/product-image-1338651741.jpg?v=1594269452',
      variant_ids: [Array],
      admin_graphql_api_id: 'gid://shopify/ProductImage/17926440616100'
    },
    {
      id: 17926440648868,
      product_id: 5427710230692,
      position: 4,
      created_at: '2020-07-09T00:37:32-04:00',
      updated_at: '2020-07-09T00:37:32-04:00',
      alt: null,
      width: 640,
      height: 640,
      src: 'https://cdn.shopify.com/s/files/1/0430/4800/9892/products/product-image-1338651736.jpg?v=1594269452',
      variant_ids: [Array],
      admin_graphql_api_id: 'gid://shopify/ProductImage/17926440648868'
    },
    {
      id: 17926440681636,
      product_id: 5427710230692,
      position: 5,
      created_at: '2020-07-09T00:37:32-04:00',
      updated_at: '2020-07-09T00:37:32-04:00',
      alt: null,
      width: 640,
      height: 640,
      src: 'https://cdn.shopify.com/s/files/1/0430/4800/9892/products/product-image-1338651739.jpg?v=1594269452',
      variant_ids: [Array],
      admin_graphql_api_id: 'gid://shopify/ProductImage/17926440681636'
    },
    {
      id: 17926440714404,
      product_id: 5427710230692,
      position: 6,
      created_at: '2020-07-09T00:37:32-04:00',
      updated_at: '2020-07-09T00:37:32-04:00',
      alt: null,
      width: 640,
      height: 640,
      src: 'https://cdn.shopify.com/s/files/1/0430/4800/9892/products/product-image-1338651738.jpg?v=1594269452',
      variant_ids: [Array],
      admin_graphql_api_id: 'gid://shopify/ProductImage/17926440714404'
    },
    {
      id: 17926440747172,
      product_id: 5427710230692,
      position: 7,
      created_at: '2020-07-09T00:37:32-04:00',
      updated_at: '2020-07-09T00:37:32-04:00',
      alt: null,
      width: 640,
      height: 640,
      src: 'https://cdn.shopify.com/s/files/1/0430/4800/9892/products/product-image-1338651740.jpg?v=1594269452',
      variant_ids: [Array],
      admin_graphql_api_id: 'gid://shopify/ProductImage/17926440747172'
    }
  ],
  image: {
    id: 17926440550564,
    product_id: 5427710230692,
    position: 1,
    created_at: '2020-07-09T00:37:32-04:00',
    updated_at: '2020-07-09T00:37:32-04:00',
    alt: null,
    width: 900,
    height: 900,
    src: 'https://cdn.shopify.com/s/files/1/0430/4800/9892/products/product-image-1338651730.jpg?v=1594269452',
    variant_ids: [],
    admin_graphql_api_id: 'gid://shopify/ProductImage/17926440550564'
  }
} */

        client
          .query(q.Get(q.Match(q.Index('product_by_id'), id)))
          .then(result => {
            if (result.data.product) {
              console.log('result! ', result);
            }
          })
          .catch(() => {
            // add to db
            console.log('result rejection, does not exist');
            // call rebuild
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

exports.handler = function (event, context, callback) {
  console.log(event);
  callback(null, {
    statusCode: 200,
  });
};

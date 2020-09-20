exports.handler = function (event, context, callback) {
  console.log('--------------- BODY ---------------');
  console.log(JSON.parse(event.body));
  console.log('--------------- HEADERS ---------------');
  console.log(event.headers);
  console.log('--------------- CONTEXT ---------------');
  console.log(context);
  callback(null, {
    statusCode: 200,
  });
};

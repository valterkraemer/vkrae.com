exports.handler = (event, context, callback) => {
  callback(null, {
    statusCode: 200,
    body: JSON.stringify({
      value: Math.random()
    }),
    headers: { "Content-Type": "application/json" }
  });
};

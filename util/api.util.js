exports.handleError = (err, res, statusCode = 500) => {
  res.status(statusCode).send({
    error: err,
    data: null,
    count: -1,
  });
};

exports.sendResponse = (result, res, count) => {
  res.status(200).send({ data: result, count, error: null });
};

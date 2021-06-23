const { Comment } = require("../model/comment");
const { Task } = require("../model/task");
const apiUtil = require("../util/api.util");
const async = require("async");

exports.getTaskPage = (req, res) => {
  var page = req.query.page;
  var size = req.query.size;
  var sort = req.query.sort;
  var order = req.query.order;
  if (!page) {
    page = 0;
  }
  if (!size) {
    size = 10;
  }
  async.parallel(
    [
      (cb) => {
        Task.count({
          where: req.body,
        })
          .then((count) => {
            cb(null, count);
          })
          .catch((err) => {
            cb(err, -1);
          });
      },
      (cb) => {
        Task.findAll({
          where: req.body,
          limit: size,
          offset: size * page,
          order: [[sort, order]],
        })
          .then((count) => {
            cb(null, count);
          })
          .catch((err) => {
            console.log(err);
            cb(err, -1);
          });
      },
    ],
    (err, result) => {
      if (err) {
        apiUtil.handleError(err, res);
      } else {
        apiUtil.sendResponse(result, res);
      }
    }
  );
};

exports.createTask = (req, res) => {
  Task.create(req.body)
    .then((result) => {
      apiUtil.sendResponse(result, res);
    })
    .catch((err) => {
      console.log(err);
      apiUtil.handleError(err, res);
    });
};

exports.updateTask = (req, res) => {
  Task.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((result) => {
      apiUtil.sendResponse(result, res);
    })
    .catch((err) => {
      apiUtil.handleError(err, res);
    });
};

exports.deleteTask = (req, res) => {
  Task.destroy({
    where: {
      id: req.params.id,
    },
    cascade: true,
  })
    .then((result) => {
      apiUtil.sendResponse(result, res);
    })
    .catch((err) => {
      apiUtil.handleError(err, res);
    });
};

exports.getTaskById = (req, res) => {
  Task.findOne({
    where: {
      id: req.params.id,
    },
    include: [Comment],
  })
    .then((result) => {
      apiUtil.sendResponse(result, res);
    })
    .catch((err) => {
      apiUtil.handleError(err, res);
    });
};

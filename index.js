const express = require("express");
const process = require("process");
const bodyParser = require("body-parser");
const cors = require("cors");
const fileUpload = require("express-fileupload");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp",
  })
);

const sequelize = require("./config/sequelize");
const { Task } = require("./model/task");
const { Comment } = require("./model/comment");

Task.hasMany(Comment);
Comment.belongsTo(Task);

sequelize.sync();

require("./route/task_route")(app);

var port = process.env.port;
if (!port) {
  port = 6060;
}
app.listen(port, () => {
  console.log(`Server started in port ${port} successfully.`);
});

const {
  getTaskPage,
  getTaskById,
  createTask,
  deleteTask,
  updateTask,
} = require("../controller/task_controller");

module.exports = (app) => {
  app.post("/api/v1/task/page", getTaskPage);
  app.get("/api/v1/task/:id", getTaskById);
  app.post("/api/v1/task", createTask);
  app.delete("/api/v1/task/:id", deleteTask);
  app.put("/api/v1/task/:id", updateTask);
};

const { Socket } = require("socket.io");
const redis = require("redis");
const app = require("express")();
const http = require("http").createServer(app);
const io = require("socket.io")(http, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});
require("dotenv").config();
var workspaceList = [];
var taskList = [];

const { setWorkspaces, addWorkspace, getWorkspaces } = require("./workspaces");
const { setTasks, addTask, getTasks, getAllTasks } = require("./tasks");

let redisClient = redis.createClient({
  //   host: process.env.REDIS_HOSTNAME,
  //   port: process.env.REDIS_PORT,
  //   password: process.env.REDIS_PASSWORD,
  //   url: process.env.REDIS_URL,
});
redisClient.connect();

redisClient.on("connect", () => {
  console.log("Redis client Connected");
});

redisClient.get("workspaces", (error, workspaces) => {
  if (error) console.log(error);
  // console.log(workspaces);
  workspaceList = workspaces;
});
// console.log("Redis: ", workspaceList);
// setWorkspaces(
//   workspaceList.then((result) => {
//     return result;
//   })
// );
setWorkspaces(workspaceList);

console.log("Workspaces updated... ", getWorkspaces());

redisClient.get("tasks", (error, tasks) => {
  if (error) console.log(error);
  taskList = task;
});

setTasks(taskList);

console.log("Tasks updated... ");

io.on("connection", (socket) => {
  socket.on("login", () => {
    console.log("new login");
    io.emit("allWorkspaces", getWorkspaces());
  });

  socket.on("openWorkspace", (workspace) => {
    console.log(workspace.name);
    socket.join(workspace.name);
    io.in(workspace.name).emit("allTasks", getTasks(workspace.name));
  });

  socket.on("addTask", (task) => {
    console.log(task);
    addTask(task);
    io.in(task.workspaceName).emit("newTask", { task });
    redisClient.set("tasks", getAllTasks());
  });

  socket.on("addWorkspace", (workspace) => {
    console.log(getWorkspaces());
    addWorkspace(workspace);
    io.emit("newWorkspace", { workspace });
    redisClient.set("workspaces", getWorkspaces());
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

http.listen(4000, function () {
  console.log("listening on port 4000");
});

// Importing dependencied
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
const { setWorkspaces, addWorkspace, getWorkspaces } = require("./workspaces");
const { setTasks, addTask, getTasks, getAllTasks } = require("./tasks");


var workspaceList = [];
var taskList = [];

// Defining redis-client to connect to server running in localhsot
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


// Bringing back values stored in DB for previously created Workspaces and Tasks
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

// Initializing the socket io connection
io.on("connection", (socket) => {
  socket.on("login", () => {
    console.log("new login");
    // Returns list of all workspaces within the organization
    io.emit("allWorkspaces", getWorkspaces());
  });

  socket.on("openWorkspace", (workspace) => {
    console.log(workspace.name);
    
    // Create a new room with the workspace name
    socket.join(workspace.name);
    // All subsequest emmision happen in the room.
    io.in(workspace.name).emit("allTasks", getTasks(workspace.name));
  });

  // Endpoint for adding new Task
  socket.on("addTask", (task) => {
    console.log(task);
    addTask(task);
    io.in(task.workspaceName).emit("newTask", { task });
    
    // Update data in DB
    redisClient.set("tasks", getAllTasks());
  });

  // Endpoint for adding new Workspace
  socket.on("addWorkspace", (workspace) => {
    console.log(getWorkspaces());
    addWorkspace(workspace);
    io.emit("newWorkspace", { workspace });
    
    // Store new data into DB
    redisClient.set("workspaces", getWorkspaces());
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

// Starting the server at port 4000
http.listen(4000, function () {
  console.log("listening on port 4000");
});

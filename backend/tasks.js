/*
Schema:
{
  name: // Contains the name of the task
  description: //Contains details about the task, its requirements and objectives
  status: //Denotes the current status of the task being one of the following: [New Task, In Progress, Under Review, Completed]
  assignedTo: //Holds the user details to whom the task has been delegated
  workspaceName: //Holds the name of the workspace the task belongs to
}
*/
// To locally hold the list of all created tasks
var tasks = [];

// Load the 'tasks' variable with all previusly created tasks
const setTasks = (taskList) => {
  tasks = taskList;
};

// Add a new task to the list
const addTask = (task) => {
  tasks.push(task);
  return "Task Added Successfully";
};

// Get all tasks related to a given workspace
const getTasks = (workspaceName) => {
  var allTasks = tasks.filter((task) => task.workspaceName === workspaceName);
  console.log(allTasks);
  return allTasks;
};

// Get all the tasks ever created
const getAllTasks = () => {
  return tasks;
};

module.exports = { setTasks, addTask, getTasks, getAllTasks };

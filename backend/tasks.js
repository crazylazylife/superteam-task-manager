var tasks = [];

const setTasks = (taskList) => {
  tasks = taskList;
};

const addTask = (task) => {
  tasks.push(task);
  return "Task Added Successfully";
};

const getTasks = (workspaceName) => {
  var allTasks = tasks.filter((task) => task.workspaceName === workspaceName);
  console.log(allTasks);
  return allTasks;
};

const getAllTasks = () => {
  return tasks;
};

module.exports = { setTasks, addTask, getTasks, getAllTasks };

// For schema details of the Task object, refer to tasks.js in backend folder

import React, { useEffect, useState } from "react";
import "./Tasks.css";
import { Modal } from "react-responsive-modal";
import { Socket } from "socket.io-client";

function Tasks(props) {
  const [taskList, setTaskList] = useState([
    // {
    //   name: "Task 1",
    //   description: "This is a very long description of the task being defined.",
    //   status: "Unassigned",
    //   assignedTo: "None",
    // },
    // {
    //   name: "Task 2",
    //   description: "This is a very long description of the task being defined.",
    //   status: "In Progress",
    //   assignedTo: "User 1",
    // },
  ]);
  const [open, setOpen] = useState(false);
  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  // Load the list of previously created tasks for the corresponding selected workspace once during the first rendering
  useEffect(() => {
    props.socket.emit("openWorkspace", props.selectedWorkspace);
    props.socket.on("allTasks", (tasks) => {
      setTaskList(tasks);
    });
  }, []);

  // Keep listening for New Tasks that might be added by other users to this workspace
  useEffect(() => {
    const tasklistener = ({ task }) => {
      setTaskList((oldList) => [...oldList, task]);
    };
    props.socket.on("newTask", tasklistener);
    return () => props.socket.off("newTask", tasklistener);
  });

  // Function to be called whenever a new task is created
  const addNewTask = () => {
    var newTask = {
      name: document.getElementById("name").value,
      description: document.getElementById("desc").value,
      status: "Unassigned",
      assignedTo: "None",
      workspaceName: props.selectedWorkspace.name,
    };
    // Send the details to the server to be stored and broadcasted to other users
    props.socket.emit("addTask", newTask);
    setOpen(false);
  };

  return (
    <div>
      <div className="task-header">
        <p>Tasks for {props.selectedWorkspace.name}</p>
        <button onClick={onOpenModal}>Add New Task</button>
      </div>
      <div className="task-body">
        {taskList.length > 0 ? (
          taskList.map((task, id) => {
            return (
              <div
                className="tasks"
                key={id}
                // onClick={() => props.setTask(task)}
              >
                <div className="task-details">
                  <p className="task-name">{task.name}</p>
                  <br />
                  <p className="task-desc">{task.description}</p>
                </div>
                <div className="task-status">
                  <p className="task-name">Status: {task.status}</p>
                  <br />
                  <p className="task-desc">Assigned To: {task.assignedTo}</p>
                </div>
              </div>
            );
          })
        ) : (
          <p>No tasks created</p>
        )}
      </div>
      <Modal open={open} onClose={onCloseModal} center>
        <div className="modal-body">
          <h2>Create New Task</h2>
          <form className="contact-form" noValidate="noValidate">
            <div className="form-group">
              <input
                className="form-control"
                type="text"
                name="name"
                id="name"
                placeholder="Task Name"
                required=""
              />
            </div>
            <div className="form-group">
              <textarea
                className="form-control"
                name="desc"
                id="desc"
                placeholder="Task Details"
                required=""
              />
            </div>
            <input
              className="new-btn"
              id="add_task"
              type="button"
              value="Add Task"
              onClick={addNewTask}
            />
          </form>
        </div>
      </Modal>
    </div>
  );
}

export default Tasks;
<p>Tasks</p>;

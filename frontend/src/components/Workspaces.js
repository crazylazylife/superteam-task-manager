import React, { useEffect, useState } from "react";
import "./Workspace.css";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";

function Workspaces(props) {
  const [workspaceList, setWorkspaceList] = useState([]);
  const [open, setOpen] = useState(false);
  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);
  var newWorkspace = {};

  useEffect(() => {
    props.socket.emit("login");
    props.socket.on("allWorkspaces", (workspaces) => {
      // console.log("Workspaces: ", workspaces);
      //   return workspaces;
      setWorkspaceList(workspaces);
    });
  }, []);

  useEffect(() => {
    // console.log("use effect");
    const wplistener = ({ workspace }) => {
      setWorkspaceList((oldList) => [...oldList, workspace]);
    };
    props.socket.on("newWorkspace", wplistener);
    return () => props.socket.off("newWorkspace", wplistener);
  });

  const addNewWorkspace = () => {
    // e.preventDefault();
    console.log("adding workspace...");
    newWorkspace = {
      name: document.getElementById("name").value,
      description: document.getElementById("desc").value,
    };
    props.socket.emit("addWorkspace", newWorkspace);
    setOpen(false);
  };

  return (
    <div>
      <div className="wp-header">
        <p>Workspaces List</p>
        <button onClick={onOpenModal}>Create New Workspace</button>
      </div>
      <div className="wp-body">
        {workspaceList.length > 0 ? (
          workspaceList.map((workspace, id) => {
            return (
              <div className="workspace" key={id}>
                <div className="wp-details">
                  <p className="wp-name">{workspace.name}</p>
                  <br />
                  <p className="wp-desc">{workspace.description}</p>
                </div>
                <button
                  onClick={
                    () => props.setSelectedWorkspace(workspace)
                    //   console.log("clicked")
                  }
                >
                  Open
                </button>
              </div>
            );
          })
        ) : (
          <p>No workspaces created yet</p>
        )}
      </div>
      <Modal open={open} onClose={onCloseModal} center>
        <div className="modal-body">
          <h2>Create New Task</h2>
          <form
            className="task-form"
            noValidate="noValidate"
            // onSubmit={addNewWorkspace}
          >
            <div className="form-group">
              <input
                className="form-control"
                type="text"
                name="name"
                id="name"
                placeholder="Workspace Name"
                required=""
              />
            </div>
            <div className="form-group">
              <textarea
                className="form-control"
                name="desc"
                id="desc"
                placeholder="Workspace Details"
                required=""
              />
            </div>
            <input
              className="new-btn"
              id="add_task"
              type="button"
              value="Add Workspace"
              onClick={addNewWorkspace}
            />
          </form>
        </div>
      </Modal>
    </div>
  );
}

export default Workspaces;

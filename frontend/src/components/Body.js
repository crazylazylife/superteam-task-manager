import React, { useState } from "react";
import Tasks from "./Tasks";
import Workspaces from "./Workspaces";
import "./Body.css";
import io from "socket.io-client";

const socket = io.connect("http://localhost:4000");
function Body() {
  // To hold the details of the currently selected workspace
  const [selectedWorkspace, setSelectedWorkspace] = useState(null);
  
  //   const [workspaceList = [];
  //   socket.emit("login");
  //   socket.on("allWorkspaces", ({ workspaces }) => {
  //     console.log("Workspaces: ", workspaces);
  //     workspaceList = workspaces;
  //   });

  return (
    <div className="body-main">
      <div
        className="wp-link"
        onClick={() => {
          setSelectedWorkspace(null);
        }}
      >
        Workspaces
      </div>
      
      {//Render the Workspace component is no workspace is selected else render the Tasks component for the corresponding selected workspace
        !selectedWorkspace ? (
        <Workspaces
          socket={socket}
          //   workspaceList={workspaceList}
          selectedWorkspace={selectedWorkspace}
          setSelectedWorkspace={setSelectedWorkspace}
        />
      ) : (
        <Tasks socket={socket} selectedWorkspace={selectedWorkspace} />
      )}
    </div>
  );
}

export default Body;

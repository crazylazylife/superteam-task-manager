/*
Schema:
{
  name: // Contains the name of the worksace
  description: //Contains details about the workspace, its requirements and objectives
}
*/

// To locally hold the list of all created workspaces
var workspaces = [];

// Load the 'workspaces' variable with all previusly created workspaces
const setWorkspaces = (workspaceList) => {
  workspaces = workspaceList;
};

// Add a new workspace to the list
const addWorkspace = (workspace) => {
  workspaces.push(workspace);
  return "Addition Successfull";
};

// Get all the workspaces created
const getWorkspaces = () => {
  return workspaces;
};

module.exports = { setWorkspaces, addWorkspace, getWorkspaces };

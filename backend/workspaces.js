var workspaces = [];

const setWorkspaces = (workspaceList) => {
  workspaces = workspaceList;
};

const addWorkspace = (workspace) => {
  workspaces.push(workspace);
  return "Addition Successfull";
};

const getWorkspaces = () => {
  return workspaces;
};

module.exports = { setWorkspaces, addWorkspace, getWorkspaces };

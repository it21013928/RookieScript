import React, { useState, useEffect } from "react";
import Axios from "axios";

function WorkspacePage() {
  const [workspaces, setWorkspaces] = useState([]);

  const fetchWorkspaces = async () => {
    const response = await Axios.get("http://localhost:7000/api/workspace/");
    setWorkspaces(response.data);
  };

  useEffect(() => {
    fetchWorkspaces();
  }, []);

  return (
    <div>
      <div class="grid grid-cols-3 gap-10">
        {workspaces.map((workspace, index) => (
          <div
            class="grid-item border p-4 bg-gray-200 text-center text-gray-800 cursor-pointer"
            key={index}
            onClick={() => alert(workspace.name)}
          >
            {workspace.name}
          </div>
        ))}
      </div>
    </div>
  );
}

export default WorkspacePage;

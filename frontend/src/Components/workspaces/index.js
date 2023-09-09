import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";

function WorkspaceComponent() {
  const [workspaces, setWorkspaces] = useState([]);
  const router = useRouter();

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
          <Link
            href={{
              pathname: "/workspace",
              query: { workspacename: workspace.name }, // the data
            }}
          >
            <div
              class="grid-item border p-4 bg-gray-200 text-center text-gray-800 cursor-pointer"
              key={index}
            >
              {workspace.name}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default WorkspaceComponent;

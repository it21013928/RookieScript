import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useRouter } from "next/router";

function CodesComponent() {
  const [codes, setCodes] = useState([]);
  const router = useRouter();

  const workspace = router.query;

  const fetchCodes = async () => {
    const response = await Axios.get(
      "http://localhost:7000/api/code/workspace/" + workspace.workspacename
    );
    setCodes(response.data);
  };

  useEffect(() => {
    fetchCodes();
  }, []);

  return (
    <div>
      <div className="text-center">
        <p className="font-bold text-xl mt-2 uppercase">
          Workspace - {workspace.workspacename}
        </p>
      </div>
      <div class="grid grid-cols-3 gap-10">
        {codes.map((code, index) => (
          <div
            class="grid-item border p-4 bg-gray-200 text-center text-gray-800 cursor-pointer"
            key={index}
            onClick={() => alert(code.name)}
          >
            {code.name}
          </div>
        ))}
      </div>
    </div>
  );
}

export default CodesComponent;

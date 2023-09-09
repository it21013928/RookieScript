import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useRouter } from "next/router";
import Link from "next/link";

function CodesComponent() {
  const [codes, setCodes] = useState([]);
  const router = useRouter();

  // const [workspace, setWorkspace] = useState("");

  // const workspace = router.query;

  useEffect(() => {
    const fetchCodes = async () => {
      try {
        const response = await Axios.get(
          `http://localhost:7000/api/code/workspace/${router.query.workspacename}`
        );
        setCodes(response.data);
      } catch (error) {
        console.error("Error fetching codes:", error);
      }
    };

    if (router.query.workspacename) {
      fetchCodes();
    }
  }, [router.query.workspacename]);

  return (
    <div>
      <div className="text-center">
        <p className="font-bold text-xl mt-2 uppercase">
          Workspace - {router.query.workspacename}
        </p>
      </div>
      <div className="grid grid-cols-4 gap-10">
        <Link
          href={{
            pathname: "/compiler",
            query: { workspacename: router.query.workspacename },
          }}
        >
          <div className="grid-item border p-4 bg-gray-500 text-center text-gray-800 cursor-pointer">
            Write a new code
          </div>
        </Link>
        {codes.map((code, index) => (
          <Link
            href={{
              pathname: "/compiler",
              query: { code: code.code, language: code.language }, // the data
            }}
          >
            <div
              className="grid-item border p-4 bg-gray-200 text-center text-gray-800 cursor-pointer"
              key={index}
              // onClick={() => alert(code.name)}
            >
              {code.name}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default CodesComponent;

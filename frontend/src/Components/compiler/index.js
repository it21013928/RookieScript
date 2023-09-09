import React from "react";
import { useEffect, useState } from "react";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/mode-php";
import "ace-builds/src-noconflict/mode-python";
import Link from "next/link";
import "ace-builds/src-noconflict/mode-javascript";
import $ from "jquery";
import Grid from "@mui/material/Grid";
import { Grow } from "@mui/material";
import { Bubblegum_Sans } from "next/font/google";
import { useRouter } from "next/navigation";
export default function compiler() {
  const [selectedLanguage, setSelectedLanguage] = useState("c_cpp");
  const [output, setOutput] = useState("");
  const [editorTheme, setEditorTheme] = useState("monokai");
  const [isError, setIsError] = useState(false);
  const router = useRouter();
  useEffect(() => {
    const editor = ace.edit("editor");
    editor.setTheme(`ace/theme/${editorTheme}`);
    editor.session.setMode(`ace/mode/${selectedLanguage}`);
  }, [selectedLanguage, editorTheme]);

  function changeLanguage(event) {
    const language = event.target.value;
    setSelectedLanguage(language);

    // Define a mapping of languages to themes here
    const languageThemes = {
      python: "solarized_dark",
      java: "eclipse", // Change to the desired theme for Java
    };

    // Set the editor theme based on the selected language
    setEditorTheme(languageThemes[language]);
  }

  function executeCode() {
    $.ajax({
      url: "http://localhost/RookieScriptCompiler/app/compiler.php",
      method: "POST",
      data: {
        language: selectedLanguage,
        code: ace.edit("editor").getSession().getValue(),
      },
      success: function (response) {
        setOutput(output + response);
      },
    });
  }
  return (
    <div>
      <Grid container spacing={0}>
        <Grid item xs={10}></Grid>
        <Grid item xs={2}>
          <button
            className="mt-4  text-white-800 py-1 px-8 self-center border border-gray-800 text-white"
            style={{ backgroundColor: "green", marginBottom: "1em" }}
          >
            Code Generator
          </button>
        </Grid>

        <Grid item xs={7} style={{ backgroundColor: "#2D2F34", height: "3em" }}>
          <Grid container spacing={0}>
            <Grid item xs={6.0}>
              <p className="mt-3 text-white">workspace name</p>
            </Grid>
            <Grid item xs={2}>
              <p className="mt-3 text-white">Select language </p>
            </Grid>
            <Grid item xs={2}>
              {" "}
              <select
                className="mt-3 px-8 py-1  rounded-lg border focus:ring focus:ring-blue-300 focus:outline-none bg-gray-700 text-white text-sm"
                id="languages"
                value={selectedLanguage}
                onChange={changeLanguage}
              >
                <option value="python">Python</option>
                <option value="java">Java</option>
                {/* Add more options for other languages as needed */}
              </select>{" "}
            </Grid>
            <Grid item xs={2} style={{ borderRight: "2px solid gray" }}>
              <button
                className="mt-3 bg-blue-800 text-white py-1 px-8 rounded-md self-center"
                onClick={executeCode}
              >
                Run
              </button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={5} style={{ backgroundColor: "#2D2F34", height: "3em" }}>
          <Grid container spacing={0}>
            <Grid item xs={3}>
              <p className="ml-2 mt-3 text-white">Output</p>
            </Grid>
            <Grid item xs={6}>
              <button
                className="mt-4 mr-3 text-white-800 py-1 px-8 self-center border border-gray-800 text-white "
                onClick={executeCode}
                style={{
                  fontSize: "0.7em",
                  backgroundColor: "green",
                  borderRadius: "5px",
                }}
              >
                Evaluate code
              </button>
              {true ? (
                <button
                  className="mt-4  text-white-800 py-1 px-8 self-center border border-gray-800 text-white "
                  onClick={executeCode}
                  style={{
                    fontSize: "0.7em",
                    backgroundColor: "#620E17",
                    borderRadius: "5px",
                  }}
                >
                  Explore error
                </button>
              ) : (
                <></>
              )}
            </Grid>
            <Grid item xs={2}>
              <button
                className="mt-3 bg-transparent text-white-800 py-1 px-6  self-center border border-white-800 text-white text-sm"
                onClick={executeCode}
              >
                Clear
              </button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={7} style={{ borderRight: "2px solid gray" }}>
          {/* <AceEditor
            style={{ width: "100%", height: "calc(100vh - 200px)" }}
            mode={selectedLanguage}
            theme={editorTheme}
            name="editor"
            editorProps={{ $blockScrolling: true }}
          /> */}
          <AceEditor
            style={{ width: "100%", height: "calc(100vh - 200px)" }}
            mode={selectedLanguage}
            theme={editorTheme}
            name="editor"
            editorProps={{ $blockScrolling: true }}
            // value={output} // Set the value of the AceEditor to the code
            readOnly={false} // Allow editing
            showPrintMargin={false}
          />
        </Grid>
        <Grid item xs={5}>
          <AceEditor
            style={{ width: "100%", height: "calc(100vh - 200px)" }}
            mode={selectedLanguage}
            theme={editorTheme}
            name="editor"
            editorProps={{ $blockScrolling: true }}
            value={output} // Set the value of the AceEditor to the code
            readOnly={true} // Allow editing
            showGutter={false} // Disable line numbers
            showPrintMargin={false} // Disable vertical lines
          />
        </Grid>
      </Grid>

      <Link
        href={{
          pathname: "/test",
          query: { data: "hello" }, // the data
        }}
      >
        Some text
      </Link>
    </div>
  );
}

import Head from "next/head";
import { useEffect, useState } from "react";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/mode-php";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-javascript";
import $ from "jquery";
import Footer from "@/Layout/Footer";

import Header from "@/Layout/Header";
export default function Home() {
  const [selectedLanguage, setSelectedLanguage] = useState("c_cpp");
  const [output, setOutput] = useState("");
  const [editorTheme, setEditorTheme] = useState("monokai");

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
        setOutput(response);
      },
    });
  }

  return (
    <div>
      <Header />

      <div className="control-panel">
        Select Language: &nbsp; &nbsp;
        <select
          id="languages"
          className="languages"
          value={selectedLanguage}
          onChange={changeLanguage}
        >
          <option value="python">Python</option>
          <option value="java">Java</option>
          {/* Add more options for other languages as needed */}
        </select>
        <button
          className="m-20 bg-blue-500 text-white py-2 px-10 rounded-md self-center"
          onClick={executeCode}
        >
          Run
        </button>
      </div>
      <AceEditor
        style={{ width: "100%", height: "calc(100vh - 200px)" }}
        mode={selectedLanguage}
        theme={editorTheme}
        name="editor"
        editorProps={{ $blockScrolling: true }}
      />
      <div className="output">{output}</div>
      <Footer />
    </div>
  );
}

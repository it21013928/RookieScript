////////////////////////////////Sahan/////////////////////////////////////////////

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modals from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import FileCopyIcon from "@mui/icons-material/FileCopy"; // Import the copy icon
import CopyToClipboard from "react-copy-to-clipboard";

///////////////////////////////////////////////////////////////////////////////////
import React from "react";
import { useEffect, useState, useRef } from "react";
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

import prettier from "prettier";
import { OpenAI } from "langchain/llms/openai";
import { PromptTemplate } from "langchain/prompts";
import { LLMChain } from "langchain/chains";
import Modal from "react-modal";
import { HiOutlineDocumentDuplicate } from "react-icons/hi2";
import { AiFillCaretRight } from "react-icons/ai";
import { useRouter } from "next/router";

import beautify from "js-beautify";
export default function compiler() {
  const [selectedLanguage, setSelectedLanguage] = useState("python");
  const [output, setOutput] = useState("");
  const [editorTheme, setEditorTheme] = useState("monokai");
  const [isError, setIsError] = useState(false);
  const [currentError, setCurrentError] = useState("");
  const [correctedCode, setCorrectedCode] = useState("");
  const [hint, setHint] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [currentCode, setCurrentCode] = useState("");
  const [isCopied, setIsCopied] = useState(false);
  const recievedCode = useRef("");
  const [isSaved, setIsSaved] = useState(true);
  useEffect(() => {
    const editor = ace.edit("editor");
    editor.setTheme(`ace/theme/${editorTheme}`);
    editor.session.setMode(`ace/mode/${selectedLanguage}`);
  }, [selectedLanguage, editorTheme]);
  var openai;
  const errorList = [
    "AssertionError",
    "AttributeError",
    "EOFError",
    "FloatingPointError",
    "GeneratorExit",
    "ImportError",
    "IndexError",
    "KeyError",
    "KeyboardInterrupt",
    "MemoryError",
    "NameError",
    "NotImplementedError",
    "OSError",
    "OverflowError",
    "ReferenceError",
    "RuntimeError",
    "StopIteration",
    "SyntaxError",
    "IndentationError",
    "TabError",
    "SystemError",
    "SystemExit",
    "TypeError",
    "UnboundLocalError",
    "UnicodeError",
    "UnicodeEncodeError",
    "UnicodeDecodeError",
    "UnicodeTranslateError",
    "ValueError",
    "ZeroDivisionError",
    "error",
  ];

  const editorRef = useRef(null);
  const router = useRouter();
  const data = router.query;
  console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", data.code);

  useEffect(() => {
    if (data.code) {
      setCurrentCode(data.code);
      recievedCode.current = data.code;
      setSelectedLanguage(data.language);
    }
  }, [data]);

  useEffect(() => {
    if (currentCode !== recievedCode.current) {
      setIsSaved(false);
    } else {
      setIsSaved(true);
    }
  }, [currentCode]);
  console.log(currentCode);

  console.log("data", data);
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
  console.log(typeof output);

  function executeCode() {
    //setIsLoading(true);
    setCurrentCode(ace.edit("editor").getSession().getValue());
    $.ajax({
      url: "http://localhost/RookieScriptCompiler/app/compiler.php",
      method: "POST",
      data: {
        language: selectedLanguage,
        code: ace.edit("editor").getSession().getValue(),
      },
      success: function (response) {
        setOutput(output + response);
        console.log(response);

        for (const error of errorList) {
          if (response.includes(error)) {
            setIsError(true);
            const keywordIndex = response.indexOf(error);
            const endIndex = response.indexOf("Error:");
            if (selectedLanguage == "java") {
              if (keywordIndex !== -1) {
                // Extract the substring from the keyword to the end of the message
                const extractedString = response.substring(
                  keywordIndex,
                  endIndex
                );
                setCurrentError(extractedString);
                console.log("Extracted String:", extractedString);
              }
            } else {
              const extractedString = response.substring(keywordIndex);
              console.log("Extracted String:", extractedString);
              setCurrentError(extractedString);
            }
          }
        }
        setCorrectedCode("");
      },
    });
    setIsLoading(false);
  }

  const snedOpenAI = async () => {
    setIsLoading(true);
    openai = new OpenAI({
      //openAIApiKey: "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",
      openAIApiKey: "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",
      temperature: 0.8,
    });
    const template =
      "Imagin you are a IT teacher when I provided a java code with an error you should corrected that code  and and give me the corrected code as a json out put (object) json out put should contain 'correctedCode' , '$marks (out of 10 for the inncorect code)','explain (explain the error and way to fix it that can understand coding beginer)' inccoerct code :{code}   error :{error} language :{language}";
    const prompt = new PromptTemplate({
      template,
      inputVariables: ["code", "error", "language"],
    });

    const chain = new LLMChain({ llm: openai, prompt });
    const result = await chain.call({
      code: ace.edit("editor").getSession().getValue(),
      error: currentError,
      language: selectedLanguage,
    });
    console.log(result.text);
    const data = result.text;
    console.log(data.correctedCode);

    const startIndex = data.indexOf(":") + 3;

    // Find the index of "marks"
    var endIndex = data.indexOf("$", startIndex) - 2;
    console.log("endddddddddddddddd", endIndex);
    if (!endIndex) {
      endIndex = data.indexOf('"marks"', startIndex) - 2;
    }

    // Extract the data between "correctedCode: " and "marks"
    const extractedData = data.substring(startIndex, endIndex).trim();

    const correctedCode = extractedData.slice(0, -2);

    // const codeMatch = data.correctedCode.match(/\{([\s\S]*?)\}/);

    const stringWithoutNewlines = correctedCode.replace(/\\n/g, "");
    const stringWithoutTab = stringWithoutNewlines.replace(/\\t/g, "");
    var finalResault = stringWithoutTab.replace(/\\/g, "");

    const formattedCode = beautify(finalResault, {
      language: "java",
      indent_size: 2, // Set the desired tab width
    });
    setCorrectedCode(formattedCode);
    console.log("BBBBBBBBBBBBBBBBBBBBBBBBB", finalResault);

    const start = data.indexOf("explain") + 10;
    const hint = data.substring(start).trim();
    setHint(hint.slice(0, -1));
    console.log("hint", hint);

    setTimeout(() => {
      window.scrollTo({
        top: window.innerHeight, // Scroll down by the height of the viewport
        behavior: "smooth", // Smooth scrolling
      });
    }, 1000);
    setIsLoading(false);
    // // const match = finalResault.match(/\{([^}]+)\}/);

    // const fixedJsonString = finalResault.replace(
    //   /(['"])?([a-zA-Z0-9_]+)(['"])?:/g,
    //   '"$2": '
    // );
    // // const d1 = JSON.stringify(fixedJsonString);
    // const match = fixedJsonString.match(/\{([^}]+)\}/);
    // console.log("match dataaaaa", match[1]);
    // console.log(
    //   "-------------------------------------------------------\n",
    //   JSON.parse(match[1])
    // );
    // const stringWithoutNewlines = match[1].replace(/\\n/g, "");
    // const stringWithoutTab = stringWithoutNewlines.replace(/\\t/g, "");

    // var finalResault = stringWithoutTab.replace(/\\/g, "");
    // const formattedCode = beautify(finalResault, {
    //   language: "java",
    //   indent_size: 2, // Set the desired tab width
    // });
    // setOutput(formattedCode);
    // console.log(
    //   "---------------------------------------------------------------------\n",
    //   formattedCode
    // );

    // const stringWithoutNewlines = data.replace(/\\n/g, "");
    // const stringWithoutTab = stringWithoutNewlines.replace(/\\t/g, "");

    // var finalResault = stringWithoutTab.replace(/\\/g, "");
    // console.log("finalResault", finalResault);
    // // const out = JSON.parse(finalResault);
    // console.log("AAAAAAAAAAAAAAAAAAAAAAAA", finalResault);

    // console.log("match dataaaaa", match[1]);
    // console.log("match dataaaaa", match[1]);
    // const filteredData = `{${match[1]}}`;
    // console.log("filteredData", filteredData);
  };
  const keyframesStyle = `
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

  const clearLogs = () => {
    setOutput("");
  };
  const loaderStyle = {
    border: "6px solid #f3f3f3",
    borderTop: "6px solid #888888",
    borderRadius: "50%",
    width: "50px",
    height: "50px",
    animation: "spin 2s linear infinite",
  };

  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#fff",
    border: "1px solid #ccc",
    padding: "20px",
    maxWidth: "80%",
    // maxHeight: "80%",
    overflow: "auto",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
    borderRadius: "8px",
    textAlign: "center",
  };

  const closeButtonStyle = {
    position: "absolute",
    top: "10px",
    right: "10px",
    backgroundColor: "transparent",
    border: "none",
    cursor: "pointer",
    fontSize: "1.2rem",
    color: "#888",
  };

  const handleCopyClick = () => {
    if (editorRef.current) {
      // Get the text content from the AceEditor
      const editor = editorRef.current.editor;
      const codeToCopy = editor.getValue();

      // Create a textarea element to temporarily hold the text
      const textarea = document.createElement("textarea");
      textarea.value = codeToCopy;

      // Append the textarea to the document and select its text
      document.body.appendChild(textarea);
      textarea.select();

      // Copy the selected text to the clipboard
      document.execCommand("copy");

      // Remove the textarea from the document
      document.body.removeChild(textarea);
      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);

      // Optionally, you can provide user feedback (e.g., a tooltip) that the copy was successful
    }
  };

  /////////////////////////////////////sahan//////////////////////////////////////////
  //Modal sahan//////////////////
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleSearch = async () => {
      try {
        const response = await fetch(
          `http://localhost:7000/api/codeSnippets/search?keyword=${searchQuery}`
        );
        if (response.ok) {
          const data = await response.json();
          setSearchResults(data);
        } else {
          console.error("Failed to fetch data");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    // Call handleSearch whenever searchQuery changes
    if (searchQuery !== "") {
      handleSearch();
    } else {
      // Clear searchResults if the search query is empty
      setSearchResults([]);
    }
  }, [searchQuery]);

  const handleCopy = () => {
    setCopied(true);
    // You can handle the copy action here if needed
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 600,
    maxHeight: "80vh", // Set a maximum height for the modal
    overflow: "auto", // Enable scrolling when content exceeds the maximum height
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const cardStyle = {
    maxHeight: "200px", // Adjust the maximum height as needed
    overflow: "auto", // Enable scrolling when content exceeds the maximum height
    padding: "16px",
    position: "relative",
  };

  const copyIconStyle = {
    position: "absolute",
    top: "8px", // Adjust the top and right values for icon placement
    right: "8px",
    cursor: "pointer",
  };

  const codeStyle = {
    fontFamily: "monospace", // Use a monospace font
    whiteSpace: "pre", // Preserve whitespace
    tabSize: 4, // Set tab size (adjust as needed)
    lineHeight: "1.2", // Adjust line height as needed
    // Add any other CSS styles you prefer
  };

  return (
    <div>
      <Modal
        isOpen={isLoading}
        // onRequestClose={closeModal}
        contentLabel="My Modal"
        style={{ content: modalStyle }}
        // shouldCloseOnOverlayClick={true}
      >
        <div className="flex flex-col justify-center items-center mt-20">
          <style>{keyframesStyle}</style>
          <div className="loader" style={loaderStyle}></div>
          <p className="text-black dark:text-white font-bold mt-4">
            We are almost there
          </p>
          <p className="text-gray-400">We&apos;re just preparing your code</p>
        </div>
      </Modal>{" "}
      <Grid container spacing={0}>
        <Grid item xs={10}></Grid>
        <Grid item xs={2}>
          <button
            className="mt-4  text-white-800 py-1 px-8 self-center border border-gray-800 text-white"
            style={{ backgroundColor: "green", marginBottom: "1em" }}
            onClick={handleOpen}
          >
            Code Generator
          </button>
        </Grid>

        <Grid item xs={7} style={{ backgroundColor: "#2D2F34", height: "3em" }}>
          <Grid container spacing={0}>
            <Grid item xs={5.0}>
              <p className="mt-3 ml-4 text-white">workspace name</p>
            </Grid>
            <Grid item xs={2.0}>
              {!isSaved ? (
                <>
                  {" "}
                  <button className="mt-3 bg-transparent text-white-800 py-1 px-6  self-center border border-white-800 text-white text-sm">
                    save code
                  </button>
                </>
              ) : (
                <p></p>
              )}
            </Grid>
            <Grid item xs={2}>
              <p className="mt-3 text-white">Select language </p>
            </Grid>
            <Grid item xs={2}>
              {" "}
              <select
                className="mt-3 px-8 py-1  rounded-lg border focus:ring focus:ring-blue-300 focus:outline-none bg-gray-700 text-white text-sm"
                id="languages"
                style={{ fontSize: "1px" }}
                value={selectedLanguage}
                onChange={changeLanguage}
              >
                <option value="php">php</option>
                <option value="java">Java</option>
                {/* Add more options for other languages as needed */}
              </select>{" "}
            </Grid>
            <Grid item xs={1} style={{ borderRight: "2px solid gray" }}>
              <button
                className="mt-3 bg-blue-800 text-white py-1 px-2  self-center"
                style={{ borderRadius: "25px" }}
                onClick={executeCode}
              >
                <AiFillCaretRight />
              </button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={5} style={{ backgroundColor: "#2D2F34", height: "3em" }}>
          <Grid container spacing={0}>
            <Grid item xs={3}>
              <p className="ml-2 mt-3 text-white">Output</p>
            </Grid>{" "}
            <Grid item xs={3}></Grid>
            <Grid item xs={4}>
              {/* <button
                className="mt-4 mr-3 text-white-800 py-1 px-8 self-center border border-gray-800 text-white "
                onClick={executeCode}
                style={{
                  fontSize: "0.7em",
                  backgroundColor: "green",
                  borderRadius: "5px",
                }}
              >
                Evaluate code
              </button> */}
              {isError ? (
                <button
                  className="mt-4  text-white-800 py-1 px-8 self-center border border-gray-800 text-white "
                  onClick={snedOpenAI}
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
                onClick={clearLogs}
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
            style={{
              width: "100%",
              height: "calc(100vh - 200px)",
              fontSize: "18px",
            }}
            mode={selectedLanguage}
            theme={editorTheme}
            name="editor"
            editorProps={{ $blockScrolling: true }}
            value={currentCode} // Set the value of the AceEditor to the code
            readOnly={false} // Allow editing
            showPrintMargin={false}
            onChange={(newCode) => {
              setCurrentCode(newCode);
            }}
          />
        </Grid>
        <Grid item xs={5}>
          <AceEditor
            style={{
              width: "100%",
              height: "calc(100vh - 200px)",
              fontSize: "15px",
            }}
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

        {correctedCode ? (
          <>
            {" "}
            <Grid
              item
              xs={7}
              style={{
                backgroundColor: "#2D2F34",
                height: "3em",
                marginTop: "30px",
              }}
            >
              <Grid container spacing={0}>
                <Grid item xs={6.0}>
                  <p className="mt-3 ml-4 text-white">Correct code</p>
                </Grid>
                <Grid item xs={5.0}></Grid>
                <Grid item xs={0.5}>
                  {isCopied ? (
                    <p
                      className="mt-3 ml-4 text-white"
                      style={{ fontSize: "10px" }}
                    >
                      Copied!
                    </p>
                  ) : (
                    <>
                      {" "}
                      <button
                        className="mt-3 ml-4 text-white"
                        onClick={handleCopyClick}
                      >
                        <HiOutlineDocumentDuplicate />
                      </button>
                    </>
                  )}
                </Grid>
              </Grid>
            </Grid>
            <Grid
              item
              xs={5}
              style={{ marginTop: "30px", backgroundColor: "#AFAFAF" }}
            >
              <Grid container spacing={0}>
                <Grid item xs={6.0}>
                  <p className="mt-3 ml-4 text-white">Hint</p>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={7}>
              <AceEditor
                ref={editorRef}
                style={{
                  width: "100%",
                  height: "calc(100vh - 200px)",
                  fontSize: "18px",
                }}
                mode={selectedLanguage}
                theme={editorTheme}
                name="editor"
                editorProps={{ $blockScrolling: true, fontSize: 56 }}
                value={correctedCode} // Set the value of the AceEditor to the code
                readOnly={false} // Allow editing
                showPrintMargin={false}
              />
            </Grid>
            <Grid
              item
              xs={5}
              style={{
                height: "calc(100vh - 200px)",
                backgroundColor: "#DEE1E6",
                padding: "30px",
              }}
            >
              <i>{hint}</i>
            </Grid>
          </>
        ) : (
          <> </>
        )}
      </Grid>
      {/* <Link
        href={{
          pathname: "/test",
          query: { data: "hello" }, // the data
        }}
      >
        Some text
      </Link> */}
      {open && (
        <Modals
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <TextField
              placeholder="Type what you want here..."
              fullWidth
              variant="outlined"
              InputProps={{
                startAdornment: <SearchIcon sx={{ color: "gray" }} />,
              }}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {/*<button onClick={handleSearch}>Search</button>*/}

            {searchResults.map((result) => (
              <div key={result.id}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  <h2>{result.title}</h2>
                </Typography>

                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  <p>{result.description}</p>
                </Typography>

                <Paper sx={cardStyle}>
                  <CopyToClipboard text={result.code} onCopy={handleCopy}>
                    <FileCopyIcon
                      sx={copyIconStyle}
                      color={copied ? "primary" : "action"}
                    />
                  </CopyToClipboard>

                  <pre style={codeStyle}>
                    <div>{result.code}</div>
                  </pre>
                </Paper>
              </div>
            ))}
          </Box>
        </Modals>
      )}
    </div>
  );
}

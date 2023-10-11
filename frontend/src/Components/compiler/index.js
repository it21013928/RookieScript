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
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import FileCopyIcon from '@mui/icons-material/FileCopy'; // Import the copy icon
import CopyToClipboard from 'react-copy-to-clipboard'; // Import the react-copy-to-clipboard library



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
  //Modal sahan//////////////////
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const [copied, setCopied] = useState(false);

useEffect(() => {

  const handleSearch = async () => {
    try {
      const response = await fetch(`http://localhost:7000/api/codeSnippets/search?keyword=${searchQuery}`);
      if (response.ok) {
        const data = await response.json();
        setSearchResults(data);
      } else {
        console.error('Failed to fetch data');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // Call handleSearch whenever searchQuery changes
    if (searchQuery !== '') {
      handleSearch();
    } else {
      // Clear searchResults if the search query is empty
      setSearchResults([]);
    }
  
}, [searchQuery])
  

  const handleCopy = () => {
    setCopied(true);
    // You can handle the copy action here if needed
  };

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    maxHeight: 990, // Set a maximum height for the modal
    overflow: 'auto', // Enable scrolling when content exceeds the maximum height
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  const cardStyle = {
    maxHeight: '200px', // Adjust the maximum height as needed
    overflow: 'auto', // Enable scrolling when content exceeds the maximum height
    padding: '16px',
    position: 'relative',
  };

  const copyIconStyle = {
    position: 'absolute',
    top: '8px', // Adjust the top and right values for icon placement
    right: '8px',
    cursor: 'pointer',
  };

  const codeStyle = {
    fontFamily: 'monospace', // Use a monospace font
    whiteSpace: 'pre',      // Preserve whitespace
    tabSize: 4,             // Set tab size (adjust as needed)
    lineHeight: '1.2',     // Adjust line height as needed
    // Add any other CSS styles you prefer
  };
  
  return (
    <div>
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


      {open && (
        <Modal
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
          startAdornment: (
            <SearchIcon sx={{ color: 'gray' }} />
          ),
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
                  color={copied ? 'primary' : 'action'}
                />
              </CopyToClipboard>
              
              
              <pre style={codeStyle}>
              <div>{result.code}</div>
      </pre>
      
              
            </Paper>
              
              
            </div>
          ))}

          
          
        </Box>
      </Modal>
      )}
    </div>

    
  );

  
}

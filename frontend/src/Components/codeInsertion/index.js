import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Grid,
} from "@mui/material";
import axios from "axios";
import { useRouter } from "next/router";

const CodeSnippetForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [code, setCode] = useState("");
  const [tags, setTags] = useState("");
  const [tagList, setTagList] = useState([]);

  const handleTagChange = (e) => {
    setTags(e.target.value);
  };

  const handleAddTag = () => {
    if (tags.trim() !== "") {
      setTagList([...tagList, tags.trim()]);
      setTags("");
    }
  };
  //////////////////////////////////////////////////////////////

  const handleSubmit = async () => {
    console.log(tagList);
    try {
      const response = await axios.post(
        "http://localhost:7000/api/codeSnippets/insertCodeSnippet",
        {
          title,
          description,
          code,
          tags: tagList,
        }
      );

      console.log("Code snippet successfully inserted:", response.data);
      // Optionally, you can reset the form fields here
      // setTitle('');
      // setDescription('');
      // setCode('');
      // setTagList([]);
    } catch (error) {
      console.error("Error inserting code snippet:", error);
    }
  };

  const router = useRouter();
  const handleViewPage = () => {
    router.push("/allCodeSnippets");
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" align="center" gutterBottom>
        Add Code Snippet
      </Typography>
      <Box>
        <TextField
          label="Title"
          fullWidth
          variant="outlined"
          margin="normal"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          label="Description"
          fullWidth
          multiline
          rows={4}
          variant="outlined"
          margin="normal"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <TextField
          label="Code"
          fullWidth
          multiline
          rows={6}
          variant="outlined"
          margin="normal"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
        <TextField
          label="Tags (Enter one per line)"
          fullWidth
          multiline
          rows={3}
          variant="outlined"
          margin="normal"
          value={tags}
          onChange={handleTagChange}
        />
        <Button
          variant="contained"
          color="primary"
          style={{ backgroundColor: "blue", color: "white" }}
          onClick={handleAddTag}
        >
          Add Tag
        </Button>
        <ul>
          {tagList.map((tag, index) => (
            <li key={index}>{tag}</li>
          ))}
        </ul>
        <Grid container justifyContent="flex-end">
          <Button
            variant="contained"
            color="primary"
            style={{ backgroundColor: "blue", color: "white" }}
            onClick={handleSubmit}
          >
            Submit
          </Button>
          <Button
            variant="contained"
            color="primary"
            style={{ backgroundColor: "blue", color: "white" }}
            onClick={handleViewPage}
          >
            View All Codes
          </Button>
        </Grid>
      </Box>
    </Container>
  );
};

export default CodeSnippetForm;

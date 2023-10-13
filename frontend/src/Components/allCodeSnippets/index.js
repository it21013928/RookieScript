import React, { useState, useEffect } from 'react';
import { Container, TextField, Button, Typography, Box, Grid, Card, CardContent  } from '@mui/material';
import axios from 'axios';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const ControllCodeSnippets = () => {
  const [title, setTitle] = useState('');
  

  const [rows, setRows] = useState([]);


  useEffect(() => {
    try {
      const fetchData = async () => {
        const response = await axios.get('http://localhost:7000/api/codeSnippets/');
        setRows(response.data);
      };
  
      fetchData();
    } catch (error) {
      console.error('Error getting code snippets:', error);
    }
  },);

  const handleDelete = async (snippetId) => {
    //console.log(tagList)
    try {
      const response = await axios.delete(`http://localhost:7000/api/codeSnippets/${snippetId}`);
  
      console.log(response)
   
    } catch (error) {
      console.error('Error deleting code snippet:', error);
    }
  };
  

  return (
    <Card elevation={8} style={{ display: 'flex', justifyContent: 'center' }}>
        <CardContent>
    <TableContainer component={Paper} style={{ display: 'flex', justifyContent: 'center' }}>
  <Table sx={{ minWidth: 650, maxWidth:900}} aria-label="simple table">
    <TableHead>
      <TableRow>
        <TableCell align="right">Title</TableCell>
        <TableCell align="right">Description</TableCell>
        <TableCell align="right">Tags&nbsp;(g)</TableCell>
        <TableCell align="right">Delete</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {rows.map((row) => (
        <TableRow
          key={row._id}
          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
          <TableCell align="right">{row.title}</TableCell>
          <TableCell align="right">{row.description}</TableCell>
          <TableCell align="right">{row.tags}</TableCell>
          <TableCell align="right">
            <Button
              variant="contained"
              color="secondary"
              style={{ backgroundColor: 'red', color: 'white' }}
              onClick={() => handleDelete(row._id)} // Replace with your actual delete function
            >
              Delete
            </Button>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
</TableContainer>
</CardContent>
</Card>

  );
};

export default ControllCodeSnippets;

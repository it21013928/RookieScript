const CodeSnippet = require("../models/codeSnippetModel");

//Add codes

const addCodes = async (req, res) => {
    try {
        const{title, description, code, tags} = req.body;

        //check if fields are empty
        if (!title || !description || !code ) {
            return res.status(400).json({
              message: "All the fields must be filled",
            });
          }
          
        //Add
        const newCodeSnippet = new  CodeSnippet({
            title, 
            description, 
            code, 
            tags

        }) ; await newCodeSnippet.save();

        res.status(200).json({
            title, 
            description, 
            code, 
            tags
        });

      } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
}
}

const insertCode = (req,res)=>{

    
    
      const codebody = `/ Java program for Merge Sort
      import java.io.*;
       
      class MergeSort {
       
          // Merges two subarrays of arr[].
          // First subarray is arr[l..m]
          // Second subarray is arr[m+1..r]
          void merge(int arr[], int l, int m, int r)
          {
              // Find sizes of two subarrays to be merged
              int n1 = m - l + 1;
              int n2 = r - m;
       
              // Create temp arrays
              int L[] = new int[n1];
              int R[] = new int[n2];
       
              // Copy data to temp arrays
              for (int i = 0; i < n1; ++i)
                  L[i] = arr[l + i];
              for (int j = 0; j < n2; ++j)
                  R[j] = arr[m + 1 + j];
       
              // Merge the temp arrays
       
              // Initial indices of first and second subarrays
              int i = 0, j = 0;
       
              // Initial index of merged subarray array
              int k = l;
              while (i < n1 && j < n2) {
                  if (L[i] <= R[j]) {
                      arr[k] = L[i];
                      i++;
                  }
                  else {
                      arr[k] = R[j];
                      j++;
                  }
                  k++;
              }
       
              // Copy remaining elements of L[] if any
              while (i < n1) {
                  arr[k] = L[i];
                  i++;
                  k++;
              }
       
              // Copy remaining elements of R[] if any
              while (j < n2) {
                  arr[k] = R[j];
                  j++;
                  k++;
              }
          }
       
          // Main function that sorts arr[l..r] using
          // merge()
          void sort(int arr[], int l, int r)
          {
              if (l < r) {
       
                  // Find the middle point
                  int m = l + (r - l) / 2;
       
                  // Sort first and second halves
                  sort(arr, l, m);
                  sort(arr, m + 1, r);
       
                  // Merge the sorted halves
                  merge(arr, l, m, r);
              }
          }
       
          // A utility function to print array of size n
          static void printArray(int arr[])
          {
              int n = arr.length;
              for (int i = 0; i < n; ++i)
                  System.out.print(arr[i] + " ");
              System.out.println();
          }
       
          // Driver code
          public static void main(String args[])
          {
              int arr[] = { 12, 11, 13, 5, 6, 7 };
       
              System.out.println("Given array is");
              printArray(arr);
       
              MergeSort ob = new MergeSort();
              ob.sort(arr, 0, arr.length - 1);
       
              System.out.println("\nSorted array is");
              printArray(arr);
          }
      }
      /* This code is contributed`;
    
      const codeName = "merge sort"
      const codeDescription = "A sample refers to a smaller, manageable version of a larger group. It is a subset containing the characteristics of a larger population. Samples are used in statistical testing when population sizes are too large for the test to include all possible members or observations."
      const codeTags = ["abcd", "mnbc", "jjhfsr"]
    
      const newCodeSnippet = new CodeSnippet({
        title:codeName,
        description: codeDescription,
        code:codebody.trim(),
        tags: codeTags
      });
    
      newCodeSnippet.save().then(r=>{
        return res.status(200).json(r);
        
      }).catch(error=>{
        return res.status(500).json(error);
      })
    
    }


    //Get all code snippet
    const getAllCodeSnippets = async (req, res) => {
        try {
          const allCodeSnippets = await CodeSnippet.find();
          if (!allCodeSnippets) {
            return res.status(404).json({ message: "Code snippets not found" });
          } else {
            res.status(200).json(allCodeSnippets);
          }
        } catch (err) {
          console.error(err);
          res.status(500).json({ message: "Server error" });
        }
      };

      // Define a route for searching by tags
    const getCodeSnippetByTag =  async (req, res) => {
    const { keyword } = req.query;

    console.log("trrfrr",keyword);
  
    try {
      // Use Mongoose or your database library to search for records with matching tags
      const records = await CodeSnippet.find({ tags: keyword }).select('title description code');
  
      if (records.length === 0) {
        return res.status(404).json({ message: 'No matching records found.' });
      }
  
      res.status(200).json(records);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };


module.exports = {
    addCodes,
    insertCode,
    getAllCodeSnippets,
    getCodeSnippetByTag
  };
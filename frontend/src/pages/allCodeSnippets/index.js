import Footer from "@/Layout/Footer";
import Navbar from "@/Layout/Navbar";
import CodeSnippetForm from "@/Components/codeInsertion";
import AllCodeSnippets from "@/Components/allCodeSnippets"

export default function CodeSnippetFormPge() {
    return (
      <>
        <Navbar />
        <AllCodeSnippets />
        <Footer />
      </>
    );
  }
import { Inter } from "next/font/google";
import Footer from "@/Layout/Footer";
import Navbar from "@/Layout/Navbar";
import ViewLessonPage from "@/Components/dashboard/viewLessonPage";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Navbar />
      <ViewLessonPage />
      <Footer />
    </>
  );
}

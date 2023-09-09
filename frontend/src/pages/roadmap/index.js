import { Inter } from "next/font/google";
import Footer from "@/Layout/Footer";
import Navbar from "@/Layout/Navbar";
import RoadmapPage from "@/Components/roadmapPage";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Navbar />
      <RoadmapPage />
      <Footer />
    </>
  );
}

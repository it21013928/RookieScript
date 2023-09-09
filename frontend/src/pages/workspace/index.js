import { Inter } from "next/font/google";
import Footer from "@/Layout/Footer";
import CommonHeader from "@/Layout/CommonHeader";
import CodesComponent from "@/Components/codes";

const inter = Inter({ subsets: ["latin"] });

export default function Workspace() {
  return (
    <>
      {/* <CommonHeader /> */}
      <CodesComponent />
      <Footer />
    </>
  );
}

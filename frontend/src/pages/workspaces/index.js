import { Inter } from "next/font/google";
import Footer from "@/Layout/Footer";
import CommonHeader from "@/Layout/CommonHeader";
import WorkspacesComponent from "@/Components/workspaces";

const inter = Inter({ subsets: ["latin"] });

export default function Workspaces() {
  return (
    <>
      {/* <CommonHeader /> */}
      <div className="text-center">
        <p className="font-bold text-xl mt-2 uppercase">Workspaces</p>
      </div>
      <WorkspacesComponent />
      <Footer />
    </>
  );
}

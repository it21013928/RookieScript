import { Inter } from "next/font/google";
import Footer from "@/Layout/Footer";
import CommonHeader from "@/Layout/CommonHeader";
import WorkspacePage from "@/Components/workspace";

const inter = Inter({ subsets: ["latin"] });

export default function Workspace() {
  return (
    <>
      <CommonHeader />
      <div className="text-center">
        <p className="font-bold text-xl mt-2 uppercase">Workspaces</p>
      </div>
      <WorkspacePage />
      <Footer />
    </>
  );
}

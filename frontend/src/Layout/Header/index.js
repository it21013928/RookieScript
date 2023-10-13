import React, { useState, useEffect } from "react";
import Logo from "../../assets/images/logo/logoSPM.jpg";
import Image from "next/image";
import Link from "next/link";
import Axioss from "@/api/Axioss";

function Header() {
  const [userData, setUserData] = useState({ user: {} });

  useEffect(() => {
    Axioss.get("api/user/getUserProfile")
      .then((response) => {
        console.log(response.data);
        setUserData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <>
      <div className="flex flex-col">
        <nav id="nav" className="py-8 md:border-b-0 border-b" role="navigation">
          <div className="container flex flex-wrap items-center md:flex-no-wrap">
            <div href="index.html">
              <Image src={Logo} alt="logo" width={200} height={100} />
            </div>
            <div className="ml-auto md:hidden">
              <button
                onClick="menuToggle()"
                className="flex items-center rounded"
                type="button"
              >
                <i className="pe-7s-menu text-3xl"></i>
              </button>
            </div>
            <div
              id="menu"
              className="w-full md:w-auto h-0 transition-all ease-out duration-300 md:transition-none md:flex-grow md:flex md:items-center opacity-0 md:opacity-100"
            >
              <ul
                id="ulMenu"
                className="flex flex-col duration-300 ease-out sm:transition-none md:flex-row ml-auto mt-5 md:mt-0"
              >
                <Link href={{ pathname: "/" }}>
                  <li>
                    <div
                      className="lg:px-6 font-medium font-secondary block text-black/70 hover:text-blue-500 p-3 uppercase text-sm"
                      href="index.html"
                      title="Home"
                    >
                      Home
                    </div>
                  </li>
                </Link>

                <Link href={{ pathname: "/roadmap" }}>
                  <li>
                    <div
                      className="lg:px-6 font-medium font-secondary block text-black/70 hover:text-blue-500 p-3 uppercase text-sm"
                      href="roadmapPage.js"
                      title="Service"
                    >
                      Roadmap
                    </div>
                  </li>
                </Link>

                {userData.user._id && (
                  <Link href={{ pathname: "/workspaces" }}>
                    <li>
                      <div
                        className="lg:px-6 font-medium font-secondary block text-black/70 hover:text-blue-500 p-3 uppercase text-sm"
                        href="work.html"
                        title="Work"
                      >
                        Workspaces
                      </div>
                    </li>
                  </Link>
                )}

                <li>
                  <div
                    className="lg:px-6 font-medium font-secondary block text-black/70 hover:text-blue-500 p-3 uppercase text-sm"
                    href="about.html"
                    title="About"
                  >
                    About
                  </div>
                </li>
                <li>
                  <div
                    className="lg:px-6 font-medium font-secondary block text-black/70 hover:text-blue-500 p-3 uppercase text-sm"
                    href="contact.html"
                    title="Contact"
                  >
                    Contact
                  </div>
                </li>

                {userData.user._id ? (
                  <>
                    <Link href={{ pathname: "/myProfile" }}>
                      <li>
                        <div
                          className="lg:px-6 font-medium font-secondary block text-black/70 hover:text-blue-500 p-3 uppercase text-sm"
                          href="logout.html"
                          title="Logout"
                        >
                          Profile
                        </div>
                      </li>
                    </Link>
                    <li>
                      <div
                        className="lg:px-6 font-medium font-secondary block text-black/70 hover:text-blue-500 p-3 uppercase text-sm"
                        href="logout.html"
                        title="Logout"
                      >
                        Logout
                      </div>
                    </li>
                  </>
                ) : (
                  <Link href={{ pathname: "/signIn" }}>
                    <li>
                      <div
                        className="lg:px-6 font-medium font-secondary block text-black/70 hover:text-blue-500 p-3 uppercase text-sm"
                        href="login.html"
                        title="Login"
                      >
                        Login
                      </div>
                    </li>
                  </Link>
                )}
              </ul>
            </div>
          </div>
        </nav>
      </div>{" "}
    </>
  );
}

export default Header;

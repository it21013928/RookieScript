import React from "react";
import Logo from "../../assets/images/logo/logoSPM.jpg";
import Image from "next/image";

function Header() {
  return (
    <>
      <div class="flex flex-col">
        <nav id="nav" class="py-8 md:border-b-0 border-b" role="navigation">
          <div class="container flex flex-wrap items-center md:flex-no-wrap">
            <a href="index.html" class="">
              <Image src={Logo} alt="logo" width={200} height={100} />
            </a>
            <div class="ml-auto md:hidden">
              <button
                onclick="menuToggle()"
                class="flex items-center rounded"
                type="button"
              >
                <i class="pe-7s-menu text-3xl"></i>
              </button>
            </div>
            <div
              id="menu"
              class="w-full md:w-auto h-0 transition-all ease-out duration-300 md:transition-none md:flex-grow md:flex md:items-center opacity-0 md:opacity-100"
            >
              <ul
                id="ulMenu"
                class="flex flex-col duration-300 ease-out sm:transition-none md:flex-row ml-auto mt-5 md:mt-0"
              >
                <li>
                  <a
                    class="lg:px-6 font-medium font-secondary block text-blue-500 p-3 uppercase text-sm"
                    href="index.html"
                    title="Home"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    class="lg:px-6 font-medium font-secondary block text-black/70 hover:text-blue-500 p-3 uppercase text-sm"
                    href="about.html"
                    title="About"
                  >
                    About
                  </a>
                </li>
                <li>
                  <a
                    class="lg:px-6 font-medium font-secondary block text-black/70 hover:text-blue-500 p-3 uppercase text-sm"
                    href="service.html"
                    title="Service"
                  >
                    Roadmap
                  </a>
                </li>
                <li>
                  <a
                    class="lg:px-6 font-medium font-secondary block text-black/70 hover:text-blue-500 p-3 uppercase text-sm"
                    href="work.html"
                    title="Work"
                  >
                    Work
                  </a>
                </li>
                <li>
                  <a
                    class="lg:px-6 font-medium font-secondary block text-black/70 hover:text-blue-500 p-3 uppercase text-sm"
                    href="blog.html"
                    title="Blog"
                  >
                    Blog
                  </a>
                </li>
                <li>
                  <a
                    class="lg:px-6 font-medium font-secondary block text-black/70 hover:text-blue-500 p-3 uppercase text-sm"
                    href="contact.html"
                    title="Contact"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>{" "}
      <section class="section ">
        <div class="v">
          <div class="flex justify-center pt-10 ">
            <div class="w-full filters-group-wrap mb-3">
              <div class="flex justify-center mb-5">
                <ul class="filter-options flex flex-wrap gap-4 justify-center">
                  <li class="active" data-group="all">
                    <a href="javascript:void(0)">All</a>
                  </li>
                  <li data-group="android">
                    <a href="javascript:void(0)">Android</a>
                  </li>
                  <li data-group="mockup">
                    <a href="javascript:void(0)">Mockup</a>
                  </li>
                  <li data-group="personal">
                    <a href="javascript:void(0)">Web</a>
                  </li>
                  <li data-group="design">
                    <a href="javascript:void(0)">Design</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Header;

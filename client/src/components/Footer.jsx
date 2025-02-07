import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-darkBlue text-white py-16">
      <div className="container mx-auto flex flex-col gap-10 px-4 lg:flex-row lg:justify-between">
        <div className="lg:w-[450px]">
          <h2 className="relative mb-3 text-2xl font-extrabold text-gray-900 before:absolute before:top-[30px] before:h-[3px] before:w-[50px] before:bg-blue-400">
            About Us
          </h2>
          <p className="text-gray-800">
            Because your planning is not always perfect, you need to be able to
            study whenever, wherever. Just read your notes one last time on your
            tablet or phone while you're on the go.
          </p>
        </div>
        <div className="flex-1">
          <h2 className="relative mb-3 text-2xl font-extrabold text-gray-900 before:absolute before:top-[30px] before:h-[3px] before:w-[50px] before:bg-blue-400">
            Quick Links
          </h2>
          <ul className="text-gray-800">
            <li className="mb-2 hover:text-blue-400">
              <Link to="/about">About</Link>
            </li>
            <li className="mb-2 hover:text-blue-400">
              <Link to="/faq">FAQ</Link>
            </li>
          </ul>
        </div>
        <div className="flex-1">
          <h2 className="relative mb-3 text-2xl font-extrabold text-gray-900 before:absolute before:top-[30px] before:h-[3px] before:w-[50px] before:bg-blue-400">
            Contact Info
          </h2>
          <ul className="text-gray-800">
            <li className="mb-2 hover:text-blue-400">
              <Link to="tel:+919987990097">+91 99879 90097</Link>
            </li>
            <li className="mb-2 hover:text-blue-400">
              <Link to="tel:+919764935361">+91 97649 35361</Link>
            </li>
            <li className="mb-2 hover:text-blue-400">
              <Link to="mailto:findmynotes2022@gmail.com">findmynotes2022@gmail.com</Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

import React from "react";


const Navbar = () => {
  return (
    <nav className="bg-purple-300 flex justify-between px-9 py-4">
      <div className="logo font-bold text-2xl">
        <span>&lt;</span>
        PassOp
        <span className="text-green-600">/&gt;</span>
      </div>
      <ul>
        <li className="flex gap-15">
          <a href="/">Home</a>
          <a href="/about">About us</a>
          <a href="/contact">Contact</a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;

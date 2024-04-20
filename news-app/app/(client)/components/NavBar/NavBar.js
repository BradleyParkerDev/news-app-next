"use client";
import Image from "next/image";
import { Button } from "../ui/button";
import Link from 'next/link';

const NavBar = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link href="/">
            Home
          </Link>
        </li>
        <li>
          <Link href="/settings">
            Settings
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;

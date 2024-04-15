"use client";
import Image from "next/image";
import { Button } from "../ui/button";
import Link from 'next/link';

const NavBar = () => {
  return (
    <nav>
      <ul>
        <li>
          {/* <Link href="/app/page">
            <a>Home</a>
          </Link> */}
        </li>
        <li>
          {/* <Link href="/settings">
            <a>Settings</a>
          </Link> */}
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;

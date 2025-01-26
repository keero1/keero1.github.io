"use client";

import { useState } from "react";
import Link from "next/link";
import Theme from "@/components/theme/ThemeToggle";

import { GiHamburgerMenu } from "react-icons/gi";

import CommandPalette from "@/components/CommandPalette";

export default function Navbar() {
  const [isPaletteOpen, setPaletteOpen] = useState<boolean>(false);

  const togglePalette = () => setPaletteOpen(!isPaletteOpen);

  return (
    <>
      <nav className="w-full flex items-center justify-between h-24 px-5 text-xl">
        <Link href={"/"} aria-label="Home" className="hover:text-gray-400">
          {"://keero"}
        </Link>

        <div className="flex space-x-4">
          <div className="flex space-x-6 justify-center items-center">
            <Theme />
            <GiHamburgerMenu
              className="hover:scale-110 cursor-pointer select-none"
              onClick={togglePalette}
            />{" "}
          </div>
        </div>
      </nav>
      <CommandPalette isOpen={isPaletteOpen} closePalette={togglePalette} />
    </>
  );
}

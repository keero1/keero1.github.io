"use client";

import ProfileImage from "@/components/ProfileImage";
import { useState, useRef, useEffect } from "react";

import {
  FaDiscord,
  FaFacebook,
  FaGithub,
  FaTwitter,
  FaSteam,
} from "react-icons/fa";

export default function Profile() {
  const [isOpen, setIsOpen] = useState(false);
  const profileImageRef = useRef<HTMLImageElement | null>(null); 
  const boxRef = useRef<HTMLDivElement | null>(null); 

  const toggleBox = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileImageRef.current &&
        !profileImageRef.current.contains(event.target as Node) &&
        boxRef.current &&
        !boxRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <main className="h-full w-full">
      <div className="max-w-7xl px-6 pt-20">
        <div className="flex flex-col justify-center items-center">
          <ProfileImage
            toggleBox={toggleBox}
            ref={profileImageRef} 
          />

          <div className="text-center mt-6">
            <p className="text-white text-xl">Hi, I`&apos;`m Keero</p>
            <p className="text-white text-lg">A stupid sandwhich</p>
          </div>

          {/* Box */}
          <div
            ref={boxRef}
            className={`box absolute w-[150px] h-[150px] rounded-full left-[50%] transform -translate-x-[50%] top-[-75px] transition-all duration-300 ease-in-out opacity-0 z-20 ${
              isOpen ? "opacity-100 open" : ""
            }`}
          >
            {/* Discord */}
            <a
              className="flex justify-center items-center w-[50px] h-[50px] rounded-full text-[26px] shadow-md transition-all duration-300"
              href="https://discord.com/users/458866132779139073"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaDiscord />
            </a>

            {/* Facebook */}
            <a
              className="flex justify-center items-center w-[50px] h-[50px] rounded-full text-[26px] shadow-md transition-all duration-300"
              href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebook />
            </a>

            {/* GitHub */}
            <a
              className="flex justify-center items-center w-[50px] h-[50px] rounded-full text-[26px] shadow-md transition-all duration-300"
              href="https://guthib.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGithub />
            </a>

            {/* Twitter */}
            <a
              className="flex justify-center items-center w-[50px] h-[50px] rounded-full text-[26px] shadow-md transition-all duration-300"
              href="https://www.youtube.com/watch?v=UIp6_0kct_U"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTwitter />
            </a>

            {/* Steam */}
            <a
              className="flex justify-center items-center w-[50px] h-[50px] rounded-full text-[26px] shadow-md transition-all duration-300"
              href="https://steamcommunity.com/id/keero1/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaSteam />
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}

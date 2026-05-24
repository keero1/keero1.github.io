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
          {/* Profile + radial menu stack. Box sits behind the profile image
              so the icons appear to pop out from behind the character. */}
          <div className="relative">
            <ProfileImage toggleBox={toggleBox} ref={profileImageRef} />

            <div
              ref={boxRef}
              className={`box absolute inset-0 rounded-full ${
                isOpen ? "open" : ""
              }`}
              aria-hidden={!isOpen}
            >
              <a
                href="https://discord.com/users/458866132779139073"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Discord"
              >
                <FaDiscord />
              </a>

              <a
                href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
              >
                <FaFacebook />
              </a>

              <a
                href="https://guthib.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
              >
                <FaGithub />
              </a>

              <a
                href="https://www.youtube.com/watch?v=UIp6_0kct_U"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
              >
                <FaTwitter />
              </a>

              <a
                href="https://steamcommunity.com/id/keero1/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Steam"
              >
                <FaSteam />
              </a>
            </div>
          </div>

          <div className="text-center mt-6">
            <p className="text-white text-xl">Hi, I&#39;m Keero</p>
            <p className="text-white text-lg">A stupid sandwhich</p>
          </div>
        </div>
      </div>
    </main>
  );
}

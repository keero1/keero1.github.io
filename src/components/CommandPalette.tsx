import React, { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";

import useToggleTheme from "@/components/hooks/useTheme";

// icons
import { FaArrowUp, FaArrowDown, FaHome } from "react-icons/fa";
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";

interface CommandPaletteProps {
  isOpen: boolean;
  closePalette: () => void;
}

const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  closePalette,
}) => {
  const router = useRouter();
  const { theme, toggleTheme } = useToggleTheme();

  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const commandRefs = useRef<(HTMLLIElement | null)[]>([]);

  const commands = [
    {
      category: "Pages",
      items: [
        {
          label: "Home",
          action: () => router.push("/"),
          icon: <FaHome />,
        },
      ],
    },
    {
      category: "Preference",
      items: [
        {
          label: "Toggle Aru Live2D",
          action: () => toggleTheme(),
          icon:
            theme === "dark" ? <MdOutlineDarkMode /> : <MdOutlineLightMode />,
        },
      ],
    },
  ];

  const allItems = commands.flatMap((commandCategory) => commandCategory.items);

  const filteredItems = allItems.filter((command) =>
    command.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closePalette();
      }

      if (event.key === "ArrowDown") {
        event.preventDefault();
        setSelectedIndex((prevIndex) => {
          const nextIndex = prevIndex === -1 ? 0 : prevIndex + 1;
          return nextIndex < filteredItems.length ? nextIndex : 0;
        });
      }

      if (event.key === "ArrowUp") {
        event.preventDefault();
        setSelectedIndex((prevIndex) => {
          const nextIndex = prevIndex === -1 ? 0 : prevIndex - 1;
          return nextIndex >= 0 ? nextIndex : filteredItems.length - 1;
        });
      }

      if (event.key === "Enter" && selectedIndex !== -1) {
        const selectedCommand = filteredItems[selectedIndex];
        if (!selectedCommand.action) return;

        selectedCommand.action();

        if (selectedCommand.label !== "Toggle Aru Live2D") {
          closePalette();
        }
      }
    },
    [closePalette, filteredItems, selectedIndex]
  );

  const handleClick = (command: { label: string; action: () => void }) => {
    command.action();

    if (command.label !== "Toggle Aru Live2D") {
      closePalette();
    }
  };

  const handleSearchChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchQuery(event.target.value);
    setSelectedIndex(0);
  };

  useEffect(() => {
    if (isOpen) {
      setSelectedIndex(0);
      document.body.classList.add("overflow-y-hidden");
    } else {
      setSelectedIndex(-1);
      document.body.classList.remove("overflow-y-hidden");
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    } else {
      window.removeEventListener("keydown", handleKeyDown);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, handleKeyDown]);

  useEffect(() => {
    if (selectedIndex >= 0 && commandRefs.current[selectedIndex]) {
      commandRefs.current[selectedIndex]?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [selectedIndex]);

  if (!isOpen) return null;

  return (
    <>
      <div
        onClick={closePalette}
        className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-40"
      />
      <div
        className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
      bg-background shadow-lg rounded-lg w-[50vh] max-h-[50vh] z-50 flex flex-col"
      >
        <div className="p-3 space-y-2">
          <p className="text-xs p-2 bg-primary rounded inline-block">
            ://keero
          </p>

          <input
            type="text"
            placeholder="What do you need?"
            className="w-full bg-background rounded focus:outline-none px-2"
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>

        <hr className="w-[95%] mx-auto mb-5" />

        <div className="flex-1 overflow-y-auto px-3">
          <div className="space-y-4">
            {commands.map((commandCategory, categoryIndex) => {
              const filteredCategoryItems = commandCategory.items.filter(
                (command) =>
                  command.label
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase())
              );

              if (filteredCategoryItems.length === 0) return null;

              return (
                <div key={categoryIndex}>
                  <div className="text-content mb-2 text-sm">
                    {commandCategory.category}
                  </div>
                  <ul className="list-none p-0 space-y-2">
                    {filteredCategoryItems.map((command, index) => {
                      const itemIndex =
                        commands
                          .slice(0, categoryIndex)
                          .reduce(
                            (sum, category) => sum + category.items.length,
                            0
                          ) + index;

                      return (
                        <li
                          key={index}
                          ref={(el) => {
                            commandRefs.current[itemIndex] = el;
                          }}
                          className={`p-2 rounded cursor-pointer select-none ${
                            selectedIndex === itemIndex
                              ? "bg-primary"
                              : "hover:bg-primary"
                          } flex items-center`}
                          onClick={() => handleClick(command)}
                        >
                          <span className="mr-2">{command.icon}</span>
                          <span>{command.label}</span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex p-3 text-sm text-content space-x-3 justify-center">
          <p>
            <strong>Enter</strong> to select
          </p>
          <p>
            <FaArrowUp className="inline mr-1" />
            <FaArrowDown className="inline ml-1 mr-1" /> to navigate
          </p>
          <p>
            <strong>Esc</strong> to close
          </p>
        </div>
      </div>
    </>
  );
};

export default CommandPalette;

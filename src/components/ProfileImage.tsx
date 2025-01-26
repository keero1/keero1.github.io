import { useEffect, useState, forwardRef } from "react";
import useToggleTheme from "@/components/hooks/useTheme";
import Image from "next/image";

interface ProfileImageProps {
  toggleBox: () => void;
}

const ProfileImage = forwardRef<HTMLImageElement, ProfileImageProps>(
  ({ toggleBox }, ref) => {
    const { theme, mounted } = useToggleTheme();
    const [imageSource, setImageSource] = useState("/images/aru_default.png");

    useEffect(() => {
      if (mounted) {
        setImageSource(
          theme === "dark" ? "/images/aru_dress.png" : "/images/aru_default.png"
        );
      }
    }, [theme, mounted]);

    if (!mounted) {
      return (
        <Image
          src={"/images/aru_halo.png"}
          alt="placeholder"
          quality={100}
          width={300}
          height={300}
          className="select-none cursor-pointer z-20 rounded-full"
          style={{ objectFit: "contain" }}
        />
      );
    }

    return (
      <Image
        ref={ref}
        src={imageSource}
        alt="character"
        quality={100}
        width={300}
        height={300}
        className="select-none cursor-pointer z-20 rounded-full"
        style={{ objectFit: "contain" }}
        onClick={toggleBox}
      />
    );
  }
);

ProfileImage.displayName = "ProfileImage";

export default ProfileImage;

"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";

interface ErrorPageProps {
  title: string;
  description: string;
  errorDetails: {
    statusCode: number;
    message: string;
  };
}

const ErrorPage: React.FC<ErrorPageProps> = ({
  title,
  description,
  errorDetails,
}) => {
  const router = useRouter();

  const imageLoader = () => {
    return `https://http.cat/${errorDetails.statusCode}.jpg`;
  };

  return (
    <div className="h-full w-full">
      <div className="max-w-7xl px-6">
        <h1 className="text-4xl font-semibold mb-4">An Error Occurred</h1>
        <p className="text-lg mb-8">Here are the details</p>

        <div className="flex py-6 px-6 bg-primary rounded-lg shadow-lg mb-8">
          <Image
            loader={imageLoader}
            src="/images/frieren.jpg"
            alt="Picture of the author"
            width={350}
            height={0}
          />

          <div className="flex flex-col md:ml-8 text-center md:text-left">
            <p className="font-semibold text-xl mb-1">Title</p>
            <p className="text-lg mb-3">{title}</p>
            <p className="font-semibold text-xl mb-1">Description</p>
            <p className="mb-3">{description}</p>
            <p className="font-semibold text-xl mb-1">Details</p>
            <p
              className="mb-3"
              style={{
                wordBreak: "break-word", // This ensures words break within long strings
                overflowWrap: "break-word", // Prevents overflow of long unbreakable words
                whiteSpace: "pre-wrap", // Allows wrapping while keeping whitespace intact
              }}
            >
              {JSON.stringify(errorDetails, null, 2)}
            </p>
          </div>
        </div>

        <div className="mt-4 flex gap-6">
          <button
            onClick={() => router.back()}
            className="px-6 py-3 text-lg font-medium text-content bg-primary rounded-lg hover:bg-secondary hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Go Back
          </button>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 text-lg font-medium text-content bg-primary rounded-lg hover:bg-secondary hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Refresh
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;

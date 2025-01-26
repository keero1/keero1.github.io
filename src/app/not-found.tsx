import ErrorPage from "@/components/ErrorPage";

export default function NotFound() {
  const errorDetails = {
    statusCode: 404,
    message: "This page could not be found",
  };
  return (
    <ErrorPage
      title="404 - Page Not Found"
      description="Are you sure you entered the right URL?"
      errorDetails={errorDetails}
    />
  );
}

export const metadata = {
  title: "Error 404 - johnaldrinarpon.tech",
  description: "Page not found",
};

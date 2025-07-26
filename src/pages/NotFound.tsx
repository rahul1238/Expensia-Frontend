import { Link } from "react-router-dom";
import Button from "../components/ui/Button";
import Heading from "../components/ui/Heading";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center">
      <div className="max-w-md">
        <div className="text-6xl font-bold text-green-500 mb-4">404</div>
        <Heading level={1} className="text-3xl mb-4 dark:text-white">
          Page Not Found
        </Heading>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>
        <Link to="/">
          <Button>
            Return to Home
          </Button>
        </Link>
      </div>
    </div>
  );
}

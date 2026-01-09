import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full text-center">
        <h1 className="text-9xl font-bold text-gray-400">404</h1>
        <p className="text-2xl font-light text-gray-600 mt-4">Page Not Found</p>
        <p className="text-gray-500 mt-2">
          Sorry, the page you are looking for doesn't exist.
        </p>
        <Link
          to="/"
          className="mt-6 inline-block px-6 py-3 text-sm font-medium text-white bg-primary rounded"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
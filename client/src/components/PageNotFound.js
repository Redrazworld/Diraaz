import React from "react";
import { Link } from "react-router-dom";

function PageNotFound() {
  return (
    <div className="h-full background-image w-100 d-flex align-items-center justify-content-center bg-secondary">
      <div className="text-center text-white">
        <h1>Page Not Found</h1>
        <p>The page you are looking for does not exist.</p>
        <Link to="/" className="btn btn-success mt-3">
          Go to Home
        </Link>
      </div>
    </div>
  );
}

export default PageNotFound;

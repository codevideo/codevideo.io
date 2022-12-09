import { Link } from "gatsby";
import * as React from "react";

export function NotFound() {
  return (
    <div className="vh-100 container d-flex flex-column justify-content-center align-items-center">
      <h1>Woops, that's a 404!</h1>
      <p>
        CodeVideo is revolutionizing the way software creators make videos. Get
        back to the homepage to see!
      </p>
      <Link to="/" className="btn btn-primary">
        Return Home
      </Link>
    </div>
  );
}

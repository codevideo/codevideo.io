import { Link } from "gatsby";
import * as React from "react";

export function SignUpButton() {
  return (
    <>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-md-4">
            <Link to="/signup" className="btn btn-primary">
              Get Early Access
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

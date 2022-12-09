import * as React from "react";
import { useEffect, useState } from "react";

export function Footer() {
  return (
    <footer className="fixed-bottom bg-primary text-light text-center text-lg-start">
      <div className="ms-3 my-1">
        © {new Date().getFullYear()} 👨‍💻 with ❤️ by{" "}
        <a className="link-light" href="https://fullstackcraft.com">
          Full Stack Craft
        </a>
        {/* {' '}& Luca Bertelli */}
      </div>
    </footer>
  );
}

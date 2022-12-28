import * as React from "react";

export function Footer() {
  return (
    <footer className="bg-primary text-dark text-center text-lg-start">
      <div className="ms-3 py-1">
        © {new Date().getFullYear()} 👨‍💻 with ❤️ by{" "}
        <a className="link-dark" href="https://fullstackcraft.com">
          Full Stack Craft
        </a>
        {/* {' '}& Luca Bertelli */}
      </div>
    </footer>
  );
}

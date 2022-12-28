import { Link } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";
import * as React from "react";

export interface INavProps {
  siteTitle: string;
}

export function Nav(props: INavProps) {
  const { siteTitle } = props;
  return (
    <nav className="navbar bg-primary">
      <Link className="navbar-brand text-dark ms-3" to="/">
        {"/> "}
        {siteTitle}
      </Link>
      {/* also add a link to github, aligned to the right via flex */}
      <a
        className="navbar-brand text-light ms-auto me-3"
        href="https://github.com/codevideo"
      >
        <StaticImage
          style={{ width: "90px", height: "auto" }}
          src="../../images/GitHubBlack.png"
          alt="Check us out on GitHub!"
        />
      </a>
    </nav>
  );
}

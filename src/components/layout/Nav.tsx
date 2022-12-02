import { Link } from "gatsby"
import * as React from "react"

export interface INavProps {
  siteTitle: string
}

export function Nav(props: INavProps) {
  const { siteTitle } = props
  return (
    <nav className="navbar bg-primary">
      <Link className="navbar-brand text-light" to="/">
        {'/>'}
        {siteTitle}
      </Link>
    </nav>
  )
}

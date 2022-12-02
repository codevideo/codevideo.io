import * as React from "react"
import { useEffect, useState } from "react"

export function Footer() {
  return (
    <footer className="fixed-bottom bg-primary text-light text-center text-lg-start">
      © {new Date().getFullYear()}{" "}
      <a className="link-light" href="https://fullstackcraft.com">
        Full Stack Craft
      </a>
      {' '}& Luca Bertelli
    </footer>
  )
}

"use client"

import Link from "next/link"
import { useState } from "react"
import styles from "./navbar.module.css"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className={styles.navbar}>
      <div className={`container ${styles.navContainer}`}>
        <Link href="/" className={styles.logo}>
          SmartCompare
        </Link>

        <div className={styles.mobileMenuButton} onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <span></span>
          <span></span>
          <span></span>
        </div>

        <ul className={`${styles.navLinks} ${isMenuOpen ? styles.active : ""}`}>
          <li>
            <Link href="/" onClick={() => setIsMenuOpen(false)}>
              Home
            </Link>
          </li>
          <li>
            <Link href="/search" onClick={() => setIsMenuOpen(false)}>
              Search
            </Link>
          </li>
          <li>
            <Link href="/compare" onClick={() => setIsMenuOpen(false)}>
              Compare
            </Link>
          </li>
          <li>
            <Link href="/login" className={styles.loginButton} onClick={() => setIsMenuOpen(false)}>
              Log in
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}

import Link from "next/link"
import styles from "./footer.module.css"

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.footerContainer}`}>
        <div className={styles.footerLogo}>
          <Link href="/">SmartCompare</Link>
          <p>Compare products like never before</p>
        </div>

        <div className={styles.footerLinks}>
          <div className={styles.linkGroup}>
            <h4>Company</h4>
            <ul>
              <li>
                <Link href="/about">About</Link>
              </li>
              <li>
                <Link href="/contact">Contact</Link>
              </li>
              <li>
                <Link href="/careers">Careers</Link>
              </li>
            </ul>
          </div>

          <div className={styles.linkGroup}>
            <h4>Legal</h4>
            <ul>
              <li>
                <Link href="/privacy">Privacy Policy</Link>
              </li>
              <li>
                <Link href="/terms">Terms of Service</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className={styles.footerBottom}>
        <div className="container">
          <p>&copy; {new Date().getFullYear()} SmartCompare. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

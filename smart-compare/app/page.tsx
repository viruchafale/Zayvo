import Image from "next/image"
import Link from "next/link"
import styles from "./page.module.css"

export default function Home() {
  return (
    <div className={styles.landingPage}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className="container">
          <div className={styles.heroContent}>
            <div className={styles.heroText}>
              <h1>Compare Products Like Never Before</h1>
              <p>
                Find the best deals across multiple e-commerce sites. Compare prices, ratings, features, and
                availability all in one place.
              </p>
              <Link href="/search" className="btn btn-primary">
                Start Comparing Now
              </Link>
            </div>
            <div className={styles.heroImage}>
              <Image
                src="/placeholder.svg?height=400&width=400"
                alt="Product comparison illustration"
                width={400}
                height={400}
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className={styles.features}>
        <div className="container">
          <h2 className="text-center">Why Choose SmartCompare?</h2>
          <div className={styles.featureGrid}>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>🔍</div>
              <h3>Comprehensive Search</h3>
              <p>Search across multiple e-commerce platforms with a single click</p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>📊</div>
              <h3>Side-by-Side Comparison</h3>
              <p>Compare product features, prices, and ratings in a clear format</p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>💰</div>
              <h3>Find the Best Deals</h3>
              <p>Easily spot the best prices and offers across different sites</p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>⏱️</div>
              <h3>Save Time</h3>
              <p>No more switching between tabs to compare products</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className={styles.howItWorks}>
        <div className="container">
          <h2 className="text-center">How It Works</h2>
          <div className={styles.stepsContainer}>
            <div className={styles.step}>
              <div className={styles.stepNumber}>1</div>
              <h3>Search for a Product</h3>
              <p>Enter keywords for the product you're looking for</p>
            </div>
            <div className={styles.step}>
              <div className={styles.stepNumber}>2</div>
              <h3>Select Items to Compare</h3>
              <p>Choose multiple products from the search results</p>
            </div>
            <div className={styles.step}>
              <div className={styles.stepNumber}>3</div>
              <h3>View Detailed Comparison</h3>
              <p>See all the details side by side and make an informed decision</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.cta}>
        <div className="container">
          <h2>Ready to Find the Best Products?</h2>
          <p>Start comparing now and make smarter shopping decisions</p>
          <Link href="/search" className="btn btn-primary">
            Get Started
          </Link>
        </div>
      </section>
    </div>
  )
}

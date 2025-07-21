"use client"

import { useEffect, useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import styles from "./compare.module.css"

// Mock product data (same as in search page)
const mockProducts = [
  {
    id: 1,
    name: "iPhone 14 Pro Max",
    image: "/placeholder.svg?height=200&width=200",
    price: 1099.99,
    ratings: 4.8,
    site: "Amazon",
    features: ["A16 Bionic Chip", "48MP Camera", "Dynamic Island", "Always-On Display"],
  },
  {
    id: 2,
    name: "iPhone 14 Pro",
    image: "/placeholder.svg?height=200&width=200",
    price: 999.99,
    ratings: 4.7,
    site: "Best Buy",
    features: ["A16 Bionic Chip", "48MP Camera", "Dynamic Island", "Always-On Display"],
  },
  {
    id: 3,
    name: "iPhone 14",
    image: "/placeholder.svg?height=200&width=200",
    price: 799.99,
    ratings: 4.6,
    site: "Apple",
    features: ["A15 Bionic Chip", "12MP Camera", "Super Retina XDR", "Ceramic Shield"],
  },
  {
    id: 4,
    name: "iPhone 14 Plus",
    image: "/placeholder.svg?height=200&width=200",
    price: 899.99,
    ratings: 4.5,
    site: "Walmart",
    features: ["A15 Bionic Chip", "12MP Camera", "Super Retina XDR", "Ceramic Shield"],
  },
  {
    id: 5,
    name: "iPhone 13 Pro Max",
    image: "/placeholder.svg?height=200&width=200",
    price: 899.99,
    ratings: 4.7,
    site: "Amazon",
    features: ["A15 Bionic Chip", "12MP Camera", "ProMotion", "Ceramic Shield"],
  },
  {
    id: 6,
    name: "iPhone 13",
    image: "/placeholder.svg?height=200&width=200",
    price: 699.99,
    ratings: 4.5,
    site: "Target",
    features: ["A15 Bionic Chip", "12MP Camera", "Super Retina XDR", "Ceramic Shield"],
  },
]

export default function ComparePage() {
  const searchParams = useSearchParams()
  const [productsToCompare, setProductsToCompare] = useState([])
  const router = useRouter()

  useEffect(() => {
    // Get the product IDs from the URL
    const productIdParams = searchParams.getAll("id")

    // Only update state if we have IDs and they're different from what we already have
    if (productIdParams.length > 0) {
      const productIds = productIdParams.map((id) => Number.parseInt(id, 10))

      // Filter products based on the IDs
      const filteredProducts = mockProducts.filter((product) => productIds.includes(product.id))

      // Only update state if the products have changed
      setProductsToCompare(filteredProducts)
    }
    // We use a string representation of the IDs as a dependency to avoid infinite loops
  }, [searchParams.toString()])

  const findLowestPrice = () => {
    if (productsToCompare.length === 0) return null
    return Math.min(...productsToCompare.map((product) => product.price))
  }

  const findHighestRating = () => {
    if (productsToCompare.length === 0) return null
    return Math.max(...productsToCompare.map((product) => product.ratings))
  }

  const lowestPrice = findLowestPrice()
  const highestRating = findHighestRating()

  const handleClearComparison = () => {
    router.push("/search")
  }

  return (
    <div className={styles.comparePage}>
      <div className="container">
        <div className={styles.compareHeader}>
          <h1>Product Comparison</h1>
          <button onClick={handleClearComparison} className="btn btn-secondary">
            Clear Comparison
          </button>
        </div>

        {productsToCompare.length > 0 ? (
          <div className={styles.comparisonTable}>
            <table>
              <thead>
                <tr>
                  <th>Feature</th>
                  {productsToCompare.map((product) => (
                    <th key={product.id}>{product.name}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Image</td>
                  {productsToCompare.map((product) => (
                    <td key={product.id}>
                      <Image src={product.image || "/placeholder.svg"} alt={product.name} width={150} height={150} />
                    </td>
                  ))}
                </tr>
                <tr>
                  <td>Price</td>
                  {productsToCompare.map((product) => (
                    <td key={product.id} className={product.price === lowestPrice ? styles.bestValue : ""}>
                      ${product.price.toFixed(2)}
                      {product.price === lowestPrice && <span className={styles.bestTag}>Best Price</span>}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td>Rating</td>
                  {productsToCompare.map((product) => (
                    <td key={product.id} className={product.ratings === highestRating ? styles.bestValue : ""}>
                      ★ {product.ratings.toFixed(1)}
                      {product.ratings === highestRating && <span className={styles.bestTag}>Highest Rated</span>}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td>Retailer</td>
                  {productsToCompare.map((product) => (
                    <td key={product.id}>{product.site}</td>
                  ))}
                </tr>
                <tr>
                  <td>Features</td>
                  {productsToCompare.map((product) => (
                    <td key={product.id}>
                      <ul className={styles.featuresList}>
                        {product.features.map((feature, index) => (
                          <li key={index}>{feature}</li>
                        ))}
                      </ul>
                    </td>
                  ))}
                </tr>
                <tr>
                  <td>Actions</td>
                  {productsToCompare.map((product) => (
                    <td key={product.id}>
                      <a
                        href="#"
                        className={styles.buyButton}
                        onClick={(e) => {
                          e.preventDefault()
                          alert(`Redirecting to ${product.site} to purchase ${product.name}`)
                        }}
                      >
                        Buy Now
                      </a>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        ) : (
          <div className={styles.emptyState}>
            <p>No products selected for comparison.</p>
            <Link href="/search" className="btn btn-primary">
              Go to Search
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

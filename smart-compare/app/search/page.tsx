"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import styles from "./search.module.css"
import { useRouter } from "next/navigation"

// Mock product data
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

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState([])
  const [selectedProducts, setSelectedProducts] = useState([])
  const router = useRouter()

  const handleSearch = (e) => {
    e.preventDefault()
    // Simulate API call with mock data
    if (searchQuery.trim() !== "") {
      setSearchResults(mockProducts)
    } else {
      setSearchResults([])
    }
  }

  const toggleProductSelection = (productId) => {
    if (selectedProducts.includes(productId)) {
      setSelectedProducts(selectedProducts.filter((id) => id !== productId))
    } else {
      if (selectedProducts.length < 4) {
        setSelectedProducts([...selectedProducts, productId])
      } else {
        alert("You can compare up to 4 products at a time")
      }
    }
  }

  const handleCompare = () => {
    if (selectedProducts.length > 1) {
      const queryString = selectedProducts.map((id) => `id=${id}`).join("&")
      router.push(`/compare?${queryString}`)
    } else {
      alert("Please select at least 2 products to compare")
    }
  }

  return (
    <div className={styles.searchPage}>
      <div className="container">
        <h1>Search Products</h1>

        <form onSubmit={handleSearch} className={styles.searchForm}>
          <input
            type="text"
            placeholder="Search for products (e.g., iPhone 14)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={styles.searchInput}
          />
          <button type="submit" className="btn btn-primary">
            Search
          </button>
        </form>

        {selectedProducts.length > 0 && (
          <div className={styles.compareBar}>
            <p>{selectedProducts.length} products selected</p>
            <button onClick={handleCompare} className="btn btn-primary" disabled={selectedProducts.length < 2}>
              Compare Selected
            </button>
          </div>
        )}

        {searchResults.length > 0 ? (
          <div className={styles.searchResults}>
            {searchResults.map((product) => (
              <div key={product.id} className={styles.productCard}>
                <div className={styles.productImage}>
                  <Image src={product.image || "/placeholder.svg"} alt={product.name} width={200} height={200} />
                </div>
                <div className={styles.productInfo}>
                  <h3>{product.name}</h3>
                  <p className={styles.productSite}>from {product.site}</p>
                  <div className={styles.productPrice}>${product.price.toFixed(2)}</div>
                  <div className={styles.productRating}>★ {product.ratings.toFixed(1)}</div>
                  <div className={styles.productActions}>
                    <button
                      className={`${styles.compareButton} ${
                        selectedProducts.includes(product.id) ? styles.selected : ""
                      }`}
                      onClick={() => toggleProductSelection(product.id)}
                    >
                      {selectedProducts.includes(product.id) ? "Selected" : "Compare"}
                    </button>
                    <Link href={`/product/${product.id}`} className={styles.viewButton}>
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className={styles.emptyState}>
            {searchQuery ? (
              <p>No products found. Try a different search term.</p>
            ) : (
              <p>Search for products to compare prices, features, and more.</p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

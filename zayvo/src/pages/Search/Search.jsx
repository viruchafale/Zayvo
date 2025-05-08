import React from 'react'
import "./Search.css"

const Search = () => {
  return (
    <>
        <div className="searchPage">
            <div className="searchContainer">
                <h1>Search Products</h1>
                <br />
                <form className='searchForm'>
                    <input type="text"
                    placeholder="Search for products (e.g., iPhone 14)"
                    className='searchInput' />
                    <button type='submit' className='btn btn-primary'>
                        Search
                    </button>
                </form>
                <p>Search for products to compare prices, features, and more.</p>
            </div>
        </div>
    </>
  )
}

export default Search
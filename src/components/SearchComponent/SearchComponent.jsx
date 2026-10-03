
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import { searchProducts } from "../../services/searchService";
import { siteConfig } from "../../config/siteConfig";

import "./SearchComponent.css";

const SearchComponent = ({
  placeholder = "Search products...",
  className = "",
  onResultClick,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState(false);

  const searchRef = useRef(null);

  useEffect(() => {
    const query = searchQuery.trim();

    if (!query) {
      setSearchResults([]);
      setIsSearching(false);
      setSearchError(false);
      return;
    }

    const timeoutId = setTimeout(async () => {
      try {
        setIsSearching(true);
        setSearchError(false);

        const results = await searchProducts(query);

        setSearchResults(results);
      } catch (error) {
        console.error("Product search error:", error);

        setSearchResults([]);
        setSearchError(true);
      } finally {
        setIsSearching(false);
      }
    }, 300);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [searchQuery]);

  const handleResultClick = () => {
    setSearchQuery("");
    setSearchResults([]);

    if (onResultClick) {
      onResultClick();
    }
  };

  const handleClear = () => {
    setSearchQuery("");
    setSearchResults([]);
    setSearchError(false);
  };

  return (
    <div
      ref={searchRef}
      className={`search-component ${className}`}
    >
      <div className="search-component__input-wrapper">
        <svg
          className="search-component__icon"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <circle
            cx="11"
            cy="11"
            r="6.5"
            stroke="currentColor"
            strokeWidth="1.8"
          />
          <path
            d="M16 16L21 21"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>

        <input
          type="search"
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
          placeholder={placeholder}
          aria-label="Search products"
          autoComplete="off"
          className="search-component__input"
        />

        {searchQuery && (
          <button
            type="button"
            className="search-component__clear"
            onClick={handleClear}
            aria-label="Clear search"
          >
            ×
          </button>
        )}
      </div>

      {searchQuery.trim() && (
        <div className="search-component__results">
          {isSearching && (
            <div className="search-component__status">
              Searching...
            </div>
          )}

          {!isSearching && !searchError && searchResults.length > 0 && (
            <div className="search-component__results-list">
              {searchResults.map((product) => (
                <Link
                  key={product.id}
                  to={`/products/${product.id}`}
                  className="search-component__result"
                  onClick={handleResultClick}
                >
                  {product.image_url && (
                    <img
                      src={product.image_url}
                      alt={product.flavor || product.name}
                      className="search-component__result-image"
                    />
                  )}

                  <div className="search-component__result-content">
                    <span className="search-component__result-name">
                      {product.name}
                    </span>

                    {product.flavor && (
                      <span className="search-component__result-flavor">
                        {product.flavor}
                      </span>
                    )}

                    {product.price !== undefined &&
                      product.price !== null && (
                        <span className="search-component__result-price">
                          {product.price}{" "}
                          {siteConfig.store.currencySymbol}
                        </span>
                      )}
                  </div>
                </Link>
              ))}
            </div>
          )}

          {!isSearching &&
            !searchError &&
            searchResults.length === 0 && (
              <div className="search-component__status">
                No products found
              </div>
            )}

          {searchError && (
            <div className="search-component__status search-component__status--error">
              Something went wrong. Please try again.
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchComponent;

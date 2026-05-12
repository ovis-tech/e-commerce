import React, { useState, useMemo, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  FiSearch,
  FiShoppingCart,
  FiHeart,
  FiFilter,
  FiGrid,
  FiList,
  FiChevronDown,
  FiChevronUp,
  FiRefreshCw,
  FiShoppingBag,
} from 'react-icons/fi'
import { useApp } from './context/AppContext'

const categories = [
  { name: 'Clothing', subcategories: [] },
  { name: 'Electronics', subcategories: [] },
  { name: 'Home & Kitchen', subcategories: [] },
  { name: 'Beauty & Personal Care', subcategories: [] },
  { name: 'Sports & Outdoors', subcategories: [] },
  { name: 'Books', subcategories: [] },
  {
    name: 'Toys & Games',
    subcategories: [
      'Board Games',
      'Puzzles',
      'Action Figures',
      'Educational Toys',
    ],
  },
]

const brands = [
  { name: 'Nike', count: 24 },
  { name: 'Adidas', count: 18 },
  { name: 'Puma', count: 12 },
  { name: 'Reebok', count: 9 },
  { name: 'Under Armour', count: 7 },
  { name: 'New Balance', count: 6 },
  { name: 'Converse', count: 5 },
  { name: 'Vans', count: 4 },
]

const colorOptions = [
  '#111111',
  '#ffffff',
  '#ef4444',
  '#3b82f6',
  '#22c55e',
  '#eab308',
  '#a855f7',
  '#f97316',
  '#ec4899',
  '#92400e',
]

const allProducts = [
  {
    id: 1,
    name: 'Vestibulum Auctor',
    category: 'CASUAL WEAR',
    brand: 'Nike',
    price: 139,
    oldPrice: null,
    rating: 4.5,
    reviews: 38,
    badge: null,
    img: '/image/product-f-12.webp',
    colors: ['#111111', '#ef4444'],
  },
  {
    id: 2,
    name: 'Praesent Dignissim',
    category: "MEN'S ESSENTIALS",
    brand: 'Adidas',
    price: 105,
    oldPrice: null,
    rating: 4,
    reviews: 24,
    badge: 'NEW IN',
    img: '/image/product-m-10.webp',
    colors: ['#3b82f6'],
  },
  {
    id: 3,
    name: 'Curabitur Blandit',
    category: 'ACCESSORIES',
    brand: 'Puma',
    price: 69,
    oldPrice: 99,
    rating: 5,
    reviews: 61,
    badge: '-30%',
    img: '/image/product-m-12.webp',
    colors: ['#92400e', '#111111'],
  },
  {
    id: 4,
    name: 'Pellentesque Ornare',
    category: 'FOOTWEAR',
    brand: 'Nike',
    price: 155,
    oldPrice: null,
    rating: 4.5,
    reviews: 45,
    badge: null,
    img: '/image/product-f-16.webp',
    colors: ['#ffffff', '#111111'],
  },
  {
    id: 5,
    name: 'Fusce Viverra',
    category: "WOMEN'S STYLE",
    brand: 'Reebok',
    price: 92,
    oldPrice: null,
    rating: 3.5,
    reviews: 19,
    badge: null,
    img: '/image/product-f-18.webp',
    colors: ['#ec4899'],
  },
  {
    id: 6,
    name: 'Maecenas Volutpat',
    category: "MEN'S APPAREL",
    brand: 'Adidas',
    price: 118,
    oldPrice: 148,
    rating: 5,
    reviews: 52,
    badge: '-20%',
    img: '/image/product-m-17.webp',
    colors: ['#22c55e', '#3b82f6'],
  },
  {
    id: 7,
    name: 'Suspendisse Potenti',
    category: 'JEWELRY',
    brand: 'Converse',
    price: 62,
    oldPrice: null,
    rating: 4.5,
    reviews: 33,
    badge: null,
    img: '/image/product-f-14.webp',
    colors: ['#f97316'],
  },
  {
    id: 8,
    name: 'Donec Sagittis',
    category: 'OUTERWEAR',
    brand: 'Vans',
    price: 85,
    oldPrice: null,
    rating: 3.5,
    reviews: 41,
    badge: 'NEW IN',
    img: '/image/product-m-17.webp',
    colors: ['#a855f7'],
  },
  {
    id: 9,
    name: 'Lorem Ipsum Dolor',
    category: 'FOOTWEAR',
    brand: 'Nike',
    price: 210,
    oldPrice: 260,
    rating: 4,
    reviews: 88,
    badge: '-19%',
    img: '/image/product-f-12.webp',
    colors: ['#111111'],
  },
  {
    id: 10,
    name: 'Consectetur Adipiscing',
    category: 'CASUAL WEAR',
    brand: 'Under Armour',
    price: 48,
    oldPrice: null,
    rating: 5,
    reviews: 12,
    badge: 'NEW IN',
    img: '/image/product-m-10.webp',
    colors: ['#eab308'],
  },
  {
    id: 11,
    name: 'Sed Do Eiusmod',
    category: "WOMEN'S STYLE",
    brand: 'New Balance',
    price: 175,
    oldPrice: 220,
    rating: 4.5,
    reviews: 27,
    badge: '-20%',
    img: '/image/product-f-18.webp',
    colors: ['#ec4899', '#3b82f6'],
  },
  {
    id: 12,
    name: 'Tempor Incididunt',
    category: "MEN'S ESSENTIALS",
    brand: 'Puma',
    price: 93,
    oldPrice: null,
    rating: 3.5,
    reviews: 55,
    badge: null,
    img: '/image/product-m-12.webp',
    colors: ['#22c55e'],
  },
]

const StarRating = ({ rating }) => (
  <div className="stars">
    {[1, 2, 3, 4, 5].map((i) => (
      <span
        key={i}
        className={
          i <= Math.floor(rating)
            ? 'star filled'
            : i - 0.5 <= rating
              ? 'star half'
              : 'star'
        }
      >
        ★
      </span>
    ))}
  </div>
)

const Category = () => {
  const { addToCart, toggleWishlist, isWishlisted, toast } = useApp()
  const location = useLocation()

  // ── Filter state ──────────────────────────────────────────────────────────
  const [searchQuery, setSearchQuery] = useState('')
  const [openCats, setOpenCats] = useState({ 'Toys & Games': true })
  const [priceRange, setPriceRange] = useState([0, 500])
  const [selectedBrands, setSelectedBrands] = useState([])
  const [selectedColors, setSelectedColors] = useState([])
  const [sortBy, setSortBy] = useState('featured')
  const [view, setView] = useState('grid')
  const [hoveredProduct, setHoveredProduct] = useState(null)
  const [brandSearch, setBrandSearch] = useState('')
  const [pendingPrice, setPendingPrice] = useState([0, 500])

  // Read search from URL (from Header search box)
  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const q = params.get('search')
    if (q) setSearchQuery(q)
  }, [location.search])

  // ── Filtering + Sorting ───────────────────────────────────────────────────
  const filtered = useMemo(() => {
    let list = allProducts

    // Text search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q),
      )
    }

    // Price
    list = list.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1],
    )

    // Brands
    if (selectedBrands.length > 0) {
      list = list.filter((p) => selectedBrands.includes(p.brand))
    }

    // Colors
    if (selectedColors.length > 0) {
      list = list.filter(
        (p) => p.colors && selectedColors.some((c) => p.colors.includes(c)),
      )
    }

    // Sort
    switch (sortBy) {
      case 'price-asc':
        list = [...list].sort((a, b) => a.price - b.price)
        break
      case 'price-desc':
        list = [...list].sort((a, b) => b.price - a.price)
        break
      case 'rating':
        list = [...list].sort((a, b) => b.rating - a.rating)
        break
      case 'newest':
        list = [...list].sort((a, b) => b.id - a.id)
        break
      default:
        break
    }

    return list
  }, [searchQuery, priceRange, selectedBrands, selectedColors, sortBy])

  const activeFilters = [
    ...selectedBrands,
    ...(priceRange[0] > 0 || priceRange[1] < 500
      ? [`$${priceRange[0]}–$${priceRange[1]}`]
      : []),
    ...selectedColors.map((c) => c),
    ...(searchQuery ? [`"${searchQuery}"`] : []),
  ]

  const resetAll = () => {
    setSearchQuery('')
    setSelectedBrands([])
    setSelectedColors([])
    setPriceRange([0, 500])
    setPendingPrice([0, 500])
    setSortBy('featured')
  }

  return (
    <div className="cat-page">
      <div className="cat-nav">
        <h1>Category</h1>
        <div className="cat-breadcrumb">
          <Link to="/Home" className="cat-home-link">
            Home
          </Link>
          <span> / </span>
          <span>Category</span>
        </div>
      </div>

      <div className="cat-body">
        {/* ── Sidebar ── */}
        <aside className="cat-sidebar">
          {/* Categories */}
          <div className="sidebar-box">
            <h3 className="sidebar-title">Categories</h3>
            {categories.map((cat) => (
              <div key={cat.name}>
                <div
                  className="cat-item"
                  onClick={() =>
                    cat.subcategories.length &&
                    setOpenCats((p) => ({ ...p, [cat.name]: !p[cat.name] }))
                  }
                >
                  <span>{cat.name}</span>
                  {cat.subcategories.length > 0 &&
                    (openCats[cat.name] ? <FiChevronUp /> : <FiChevronDown />)}
                </div>
                {openCats[cat.name] &&
                  cat.subcategories.map((sub) => (
                    <div key={sub} className="cat-subitem">
                      {sub}
                    </div>
                  ))}
              </div>
            ))}
          </div>

          {/* Price Range */}
          <div className="sidebar-box">
            <h3 className="sidebar-title">Price Range</h3>
            <div className="price-labels">
              <span>${pendingPrice[0]}</span>
              <span>${pendingPrice[1]}</span>
            </div>
            <input
              type="range"
              min="0"
              max="500"
              value={pendingPrice[1]}
              onChange={(e) =>
                setPendingPrice([pendingPrice[0], +e.target.value])
              }
              className="price-slider"
            />
            <div className="price-inputs">
              <div className="price-input-wrap">
                <span>$</span>
                <input
                  type="number"
                  value={pendingPrice[0]}
                  onChange={(e) =>
                    setPendingPrice([+e.target.value, pendingPrice[1]])
                  }
                />
              </div>
              <div className="price-input-wrap">
                <span>$</span>
                <input
                  type="number"
                  value={pendingPrice[1]}
                  onChange={(e) =>
                    setPendingPrice([pendingPrice[0], +e.target.value])
                  }
                />
              </div>
            </div>
            <button
              className="apply-btn full"
              onClick={() => setPriceRange([...pendingPrice])}
            >
              Apply Filter
            </button>
          </div>

          {/* Brand */}
          <div className="sidebar-box">
            <h3 className="sidebar-title">Filter by Brand</h3>
            <div className="brand-search">
              <input
                placeholder="Search brands..."
                value={brandSearch}
                onChange={(e) => setBrandSearch(e.target.value)}
              />
              <FiSearch />
            </div>
            {brands
              .filter((b) =>
                b.name.toLowerCase().includes(brandSearch.toLowerCase()),
              )
              .map((b) => (
                <label key={b.name} className="brand-row">
                  <input
                    type="checkbox"
                    checked={selectedBrands.includes(b.name)}
                    onChange={() =>
                      setSelectedBrands((prev) =>
                        prev.includes(b.name)
                          ? prev.filter((x) => x !== b.name)
                          : [...prev, b.name],
                      )
                    }
                  />
                  <span>{b.name}</span>
                  <span className="brand-count">({b.count})</span>
                </label>
              ))}
            <div className="filter-actions">
              <button
                className="clear-btn"
                onClick={() => setSelectedBrands([])}
              >
                Clear All
              </button>
            </div>
          </div>

          {/* Color */}
          <div className="sidebar-box">
            <h3 className="sidebar-title">Filter by Color</h3>
            <div className="color-grid">
              {colorOptions.map((c) => (
                <button
                  key={c}
                  className={`color-dot ${selectedColors.includes(c) ? 'selected' : ''}`}
                  style={{
                    background: c,
                    border: c === '#ffffff' ? '1px solid #ccc' : 'none',
                  }}
                  onClick={() =>
                    setSelectedColors((prev) =>
                      prev.includes(c)
                        ? prev.filter((x) => x !== c)
                        : [...prev, c],
                    )
                  }
                />
              ))}
            </div>
            <div className="filter-actions">
              <button
                className="clear-btn outline-only"
                onClick={() => setSelectedColors([])}
              >
                Clear All
              </button>
            </div>
          </div>
        </aside>

        {/* ── Main ── */}
        <main className="cat-main">
          <div className="cat-header">
            <h2>All Products</h2>
            <div className="cat-header-underline" />
            <p>
              {filtered.length} product{filtered.length !== 1 ? 's' : ''} found
            </p>
          </div>

          {/* Search */}
          <div className="cat-search">
            <FiSearch className="search-icon" />
            <input
              placeholder="Find what you're looking for..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button onClick={() => {}}>Search</button>
          </div>

          {/* Filters bar */}
          <div className="cat-filters-bar">
            <div className="filter-selects">
              <div className="filter-select-group">
                <label>SORT BY</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="featured">Featured</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="rating">Top Rated</option>
                  <option value="newest">Newest</option>
                </select>
              </div>
            </div>
            <div className="view-toggle">
              <button
                className={view === 'grid' ? 'active' : ''}
                onClick={() => setView('grid')}
              >
                <FiGrid /> Grid
              </button>
              <button
                className={view === 'list' ? 'active' : ''}
                onClick={() => setView('list')}
              >
                <FiList /> List
              </button>
            </div>
          </div>

          {/* Active filters */}
          {activeFilters.length > 0 && (
            <div className="active-filters">
              <div className="active-filters-left">
                <FiFilter color="#2563eb" />
                <span>Filtered by:</span>
                {activeFilters.map((f) => (
                  <span key={f} className="filter-tag">
                    {f}
                  </span>
                ))}
              </div>
              <button className="reset-all" onClick={resetAll}>
                <FiRefreshCw /> Reset All
              </button>
            </div>
          )}

          {/* Product grid */}
          {filtered.length === 0 ? (
            <div
              style={{
                textAlign: 'center',
                padding: '60px 20px',
                color: '#777',
              }}
            >
              <div style={{ fontSize: 48, marginBottom: 12 }}>🔍</div>
              <h3>No products match your filters</h3>
              <button
                className="reset-all"
                onClick={resetAll}
                style={{ margin: '16px auto', display: 'flex' }}
              >
                <FiRefreshCw /> Clear filters
              </button>
            </div>
          ) : (
            <div className={`product-grid ${view}`}>
              {filtered.map((p) => (
                <div
                  key={p.id}
                  className="product-card"
                  onMouseEnter={() => setHoveredProduct(p.id)}
                  onMouseLeave={() => setHoveredProduct(null)}
                >
                  <div className="product-img-wrap">
                    <img src={p.img} alt={p.name} />
                    {p.badge && (
                      <span
                        className={`product-badge ${p.badge === 'NEW IN' ? 'badge-new' : 'badge-sale'}`}
                      >
                        {p.badge}
                      </span>
                    )}
                    <button
                      className={`wishlist-btn ${isWishlisted(p.id) ? 'wishlisted' : ''}`}
                      onClick={() => {
                        toggleWishlist(p)
                        toast(
                          isWishlisted(p.id)
                            ? 'Removed from wishlist.'
                            : 'Added to wishlist!',
                          'info',
                        )
                      }}
                    >
                      <FiHeart />
                    </button>
                    {hoveredProduct === p.id && (
                      <button
                        className="quick-add-btn"
                        onClick={() => {
                          addToCart({
                            ...p,
                            _key: `${p.id}_`,
                            title: p.name,
                            image: p.img,
                          })
                          toast(`${p.name} added to cart!`)
                        }}
                      >
                        <FiShoppingBag /> QUICK ADD
                      </button>
                    )}
                  </div>
                  <div className="product-info">
                    <span className="product-category">{p.category}</span>
                    <h4>{p.name}</h4>
                    <StarRating rating={p.rating} />
                    <span className="review-count">({p.reviews})</span>
                    <div className="product-price-row">
                      <span className="product-price">${p.price}.00</span>
                      {p.oldPrice && (
                        <span className="product-old-price">
                          ${p.oldPrice}.00
                        </span>
                      )}
                      <button
                        className="cart-btn"
                        onClick={() => {
                          addToCart({
                            ...p,
                            _key: `${p.id}_`,
                            title: p.name,
                            image: p.img,
                          })
                          toast(`${p.name} added to cart!`)
                        }}
                      >
                        <FiShoppingCart />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

export default Category

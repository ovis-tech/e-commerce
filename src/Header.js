import React from 'react'
import { BsGeoAlt, BsQuestionCircle, BsPerson, BsCart3 } from 'react-icons/bs'
import { Link, useNavigate } from 'react-router-dom'
import { useApp } from './context/AppContext'

const Header = () => {
  const [ActiveDropdown, setActiveDropdown] = React.useState(null)
  const [searchQuery, setSearchQuery] = React.useState('')
  const { cartCount, user, signOut } = useApp()
  const navigate = useNavigate()

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/Category?search=${encodeURIComponent(searchQuery.trim())}`)
    }
  }

  return (
    <div className="header">
      <div className="header-content">
        {/* Logo */}
        <h1 className="logo">Shop Smart</h1>

        {/* Search */}
        <form className="search-box" onSubmit={handleSearch}>
          <input
            className="input"
            type="text"
            placeholder="Search for products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="input-button" type="submit">
            Search
          </button>
        </form>

        {/* Icons */}
        <div className="icons1">
          <Link to="/location" className="location-icon">
            <BsGeoAlt />
            <span>Location</span>
          </Link>
          <Link to="/help" className="help-icon">
            <BsQuestionCircle />
            <span>Help</span>
          </Link>
        </div>

        <div className="icons2">
          {user ? (
            <div
              className="account-icon"
              style={{
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
              onClick={() =>
                setActiveDropdown(ActiveDropdown === 'user' ? null : 'user')
              }
            >
              <BsPerson />
              <span
                style={{
                  fontSize: 12,
                  maxWidth: 80,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                {user.fullName.split(' ')[0]}
              </span>
              {ActiveDropdown === 'user' && (
                <div
                  style={{
                    position: 'absolute',
                    top: '100%',
                    right: 0,
                    background: '#fff',
                    border: '1px solid #e5e7eb',
                    borderRadius: 10,
                    boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
                    zIndex: 999,
                    minWidth: 160,
                    padding: '8px 0',
                  }}
                >
                  <Link
                    to="/account"
                    style={{
                      display: 'block',
                      padding: '10px 20px',
                      color: '#333',
                      textDecoration: 'none',
                      fontSize: 14,
                    }}
                  >
                    My Account
                  </Link>
                  <div
                    style={{
                      padding: '10px 20px',
                      color: '#ef4444',
                      fontSize: 14,
                      cursor: 'pointer',
                    }}
                    onClick={signOut}
                  >
                    Sign Out
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Link to="/account" className="account-icon">
              <BsPerson />
              <span>Account</span>
            </Link>
          )}

          {/* Cart with badge */}
          <Link
            to="/Cart"
            className="cart-icon"
            style={{ position: 'relative' }}
          >
            <BsCart3 />
            {cartCount > 0 && (
              <span
                style={{
                  position: 'absolute',
                  top: -4,
                  right: -4,
                  background: '#ef4444',
                  color: '#fff',
                  borderRadius: '50%',
                  width: 18,
                  height: 18,
                  fontSize: 10,
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {cartCount > 99 ? '99+' : cartCount}
              </span>
            )}
            <span>Cart</span>
          </Link>
        </div>
      </div>

      {/* Navigation */}
      <nav className="nav-bar">
        <ul>
          <li>
            <Link to="/Home">Home</Link>
          </li>
          <li>
            <Link to="/About">About</Link>
          </li>
          <li>
            <Link to="/Category">Category</Link>
          </li>
          <li>
            <Link to="/Product-details">Product Details</Link>
          </li>
          <li>
            <Link to="/Cart">Cart</Link>
          </li>
          <li>
            <Link to="/Checkout">Checkout</Link>
          </li>

          {/* DROPDOWN */}
          <li
            className="dropdown"
            onMouseEnter={() => setActiveDropdown('dropdown')}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <span>Dropdown ▾</span>
            {ActiveDropdown === 'dropdown' && (
              <ul className="dropdown-menu">
                <li>
                  <Link to="/electronics">Electronics</Link>
                </li>
                <li>
                  <Link to="/clothes">Clothes</Link>
                </li>
                <li>
                  <Link to="/shoes">Shoes</Link>
                </li>
              </ul>
            )}
          </li>

          {/* MEGAMENU 1 */}
          <li
            className="dropdown"
            onMouseEnter={() => setActiveDropdown('megamenu1')}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <span>Megamenu1 ▾</span>
            {ActiveDropdown === 'megamenu1' && (
              <ul className="dropdown-menu">
                <li>
                  <Link to="/electronics">Electronics</Link>
                </li>
                <li>
                  <Link to="/clothes">Clothes</Link>
                </li>
                <li>
                  <Link to="/shoes">Shoes</Link>
                </li>
              </ul>
            )}
          </li>

          {/* MEGAMENU 2 */}
          <li
            className="dropdown"
            onMouseEnter={() => setActiveDropdown('megamenu2')}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <span>Megamenu2 ▾</span>
            {ActiveDropdown === 'megamenu2' && (
              <ul className="dropdown-menu">
                <li>
                  <Link to="/electronics">Electronics</Link>
                </li>
                <li>
                  <Link to="/clothes">Clothes</Link>
                </li>
                <li>
                  <Link to="/shoes">Shoes</Link>
                </li>
              </ul>
            )}
          </li>

          <li>
            <Link to="/Contact">Contact</Link>
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default Header

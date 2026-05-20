import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FiShoppingBag, FiTrash2, FiArrowLeft } from 'react-icons/fi'
import { MdPayment, MdSecurity, MdAccountBalance } from 'react-icons/md'
import { SiPaypal } from 'react-icons/si'
import { useApp } from './context/AppContext'

const TAX_RATE = 0.1
const DELIVERY_OPTIONS = [
  { label: 'Standard - $4.99', value: 4.99 },
  { label: 'Express - $12.99', value: 12.99 },
  { label: 'Free (Orders $300+)', value: 0 },
]

const Cart = () => {
  const { cart, removeFromCart, updateQty, clearCart, cartSubtotal, toast } =
    useApp()
  const navigate = useNavigate()
  const [promo, setPromo] = React.useState('')
  const [savings, setSavings] = React.useState(0)
  const [delivery, setDelivery] = React.useState(0)

  const tax = cartSubtotal * TAX_RATE
  const grandTotal =
    cartSubtotal + tax + DELIVERY_OPTIONS[delivery].value - savings

  const applyPromo = () => {
    if (promo.toLowerCase() === 'save10') {
      setSavings(10)
      toast('Promo code applied! $10 off.')
    } else {
      toast('Invalid promo code.', 'error')
    }
  }

  return (
    <div className="cart-page">
      {/* Nav */}
      <div className="cart-nav">
        <h1>Cart</h1>
        <div className="cart-breadcrumb">
          <Link to="/Home" className="cart-home-link">
            Home
          </Link>
          <span> / </span>
          <span>Cart</span>
        </div>
      </div>

      {/* Header */}
      <div className="cart-header">
        <h2>Shopping Cart</h2>
        <div className="cart-header-underline" />
        <p>Review your items before proceeding to checkout.</p>
      </div>

      {cart.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '80px 20px' }}>
          <div style={{ fontSize: 64, marginBottom: 16 }}>🛒</div>
          <h2 style={{ color: '#333', marginBottom: 12 }}>
            Your cart is empty
          </h2>
          <p style={{ color: '#777', marginBottom: 24 }}>
            Add some products to get started.
          </p>
          <Link
            to="/Category"
            style={{
              background: '#2563eb',
              color: '#fff',
              padding: '14px 32px',
              borderRadius: 999,
              textDecoration: 'none',
              fontWeight: 700,
            }}
          >
            Browse Products
          </Link>
        </div>
      ) : (
        <div className="cart-body">
          {/* Cart items */}
          <div className="cart-items">
            {cart.map((item) => (
              <div key={item._key} className="cart-card">
                <div className="cart-card-img">
                  <img
                    src={item.img || item.image}
                    alt={item.name || item.title}
                  />
                </div>
                <div className="cart-card-info">
                  <h4>{item.name || item.title}</h4>
                  <div className="cart-tags">
                    {item.color && (
                      <span className="cart-tag">Color: {item.color}</span>
                    )}
                    {item.size && (
                      <span className="cart-tag">Size: {item.size}</span>
                    )}
                  </div>
                  <div className="cart-card-bottom">
                    <div className="cart-price-wrap">
                      <span className="cart-price">
                        ${Number(item.price).toFixed(2)}
                      </span>
                      {item.oldPrice && (
                        <span className="cart-old-price">
                          ${Number(item.oldPrice).toFixed(2)}
                        </span>
                      )}
                    </div>
                    <div className="cart-qty">
                      <button onClick={() => updateQty(item._key, -1)}>
                        −
                      </button>
                      <span>{item.qty}</span>
                      <button onClick={() => updateQty(item._key, 1)}>+</button>
                    </div>
                    <span className="cart-total">
                      ${(item.price * item.qty).toFixed(2)}
                    </span>
                  </div>
                </div>
                <button
                  className="cart-remove"
                  onClick={() => {
                    removeFromCart(item._key)
                    toast('Item removed from cart.', 'info')
                  }}
                >
                  ×
                </button>
              </div>
            ))}

            {/* Actions */}
            <div className="cart-actions">
              <Link to="/Category" className="continue-shopping">
                <FiArrowLeft /> Continue Shopping
              </Link>
              <button
                className="empty-cart-btn"
                onClick={() => {
                  clearCart()
                  toast('Cart cleared.', 'info')
                }}
              >
                <FiTrash2 /> Empty Cart
              </button>
            </div>
          </div>

          {/* Order overview */}
          <div className="order-overview">
            <div className="overview-header">
              <FiShoppingBag size={22} />
              <span>Order Overview</span>
            </div>

            <div className="overview-body">
              {/* Promo */}
              <div className="promo-section">
                <p className="promo-label">Have a promo code?</p>
                <div className="promo-input-wrap">
                  <input
                    placeholder="Enter code (try SAVE10)"
                    value={promo}
                    onChange={(e) => setPromo(e.target.value)}
                  />
                  <button onClick={applyPromo}>Apply</button>
                </div>
              </div>

              <div className="overview-divider" />

              <div className="overview-row">
                <span>Subtotal ({cart.length} items)</span>
                <strong>${cartSubtotal.toFixed(2)}</strong>
              </div>

              {/* Delivery */}
              <div className="overview-delivery">
                <span>Delivery</span>
                {DELIVERY_OPTIONS.map((opt, i) => (
                  <label key={i} className="delivery-option">
                    <input
                      type="radio"
                      name="delivery"
                      checked={delivery === i}
                      onChange={() => setDelivery(i)}
                    />
                    {opt.label}
                  </label>
                ))}
              </div>

              <div className="overview-row">
                <span>Estimated Tax</span>
                <strong>${tax.toFixed(2)}</strong>
              </div>

              {savings > 0 && (
                <div className="overview-row">
                  <span>Savings</span>
                  <strong style={{ color: '#22c55e' }}>
                    -${savings.toFixed(2)}
                  </strong>
                </div>
              )}

              <div className="overview-divider blue" />

              <div className="overview-row grand">
                <strong>Grand Total</strong>
                <span className="grand-total">${grandTotal.toFixed(2)}</span>
              </div>

              <button
                className="purchase-btn"
                onClick={() => navigate('/Checkout')}
              >
                Proceed to Checkout <FiShoppingBag />
              </button>

              <div className="payment-methods">
                <p>SECURE PAYMENT METHODS</p>
                <div className="payment-icons">
                  <MdPayment size={28} />
                  <SiPaypal size={28} />
                  <MdSecurity size={28} />
                  <MdAccountBalance size={28} />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Cart

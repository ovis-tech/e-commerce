import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  FiUser,
  FiTruck,
  FiCreditCard,
  FiCheckCircle,
  FiShoppingBag,
  FiMapPin,
  FiLock,
  FiShield,
} from 'react-icons/fi'
import { SiPaypal, SiApplepay } from 'react-icons/si'
import { MdPayment } from 'react-icons/md'
import { useApp } from './context/AppContext'

const steps = [
  { id: 'details', label: 'Details', icon: <FiUser /> },
  { id: 'shipping', label: 'Shipping', icon: <FiTruck /> },
  { id: 'payment', label: 'Payment', icon: <FiCreditCard /> },
  { id: 'confirm', label: 'Confirm', icon: <FiCheckCircle /> },
]

const DELIVERY = 9.99
const TAX_RATE = 0.1
const COUNTRIES = [
  'United States',
  'United Kingdom',
  'Canada',
  'Australia',
  'Nigeria',
  'Germany',
  'France',
]

const Checkout = () => {
  const { cart, cartSubtotal, clearCart, toast } = useApp()
  const navigate = useNavigate()

  const [payMethod, setPayMethod] = useState('card')
  const [discount, setDiscount] = useState('')
  const [discountApplied, setDiscountApplied] = useState(0)
  const [rememberAddr, setRememberAddr] = useState(false)
  const [useAsBilling, setUseAsBilling] = useState(true)
  const [agreed, setAgreed] = useState(false)
  const [errors, setErrors] = useState({})
  const [orderPlaced, setOrderPlaced] = useState(false)

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    mobile: '',
    street: '',
    unit: '',
    city: '',
    state: '',
    zip: '',
    country: '',
    cardNumber: '',
    expiry: '',
    cvv: '',
    cardholder: '',
  })

  const tax = cartSubtotal * TAX_RATE
  const total = cartSubtotal + DELIVERY + tax - discountApplied

  const set = (field) => (e) =>
    setForm((f) => ({ ...f, [field]: e.target.value }))

  const formatCard = (val) =>
    val
      .replace(/\D/g, '')
      .slice(0, 16)
      .replace(/(.{4})/g, '$1 ')
      .trim()
  const formatExpiry = (val) => {
    const v = val.replace(/\D/g, '').slice(0, 4)
    return v.length >= 2 ? v.slice(0, 2) + '/' + v.slice(2) : v
  }

  const applyDiscount = () => {
    if (discount.toLowerCase() === 'save10') {
      setDiscountApplied(10)
      toast('Promo applied! $10 off.')
    } else {
      toast('Invalid promo code.', 'error')
    }
  }

  const validate = () => {
    const e = {}
    if (!form.firstName) e.firstName = true
    if (!form.lastName) e.lastName = true
    if (!form.email || !/\S+@\S+\.\S+/.test(form.email)) e.email = true
    if (!form.mobile) e.mobile = true
    if (!form.street) e.street = true
    if (!form.city) e.city = true
    if (!form.state) e.state = true
    if (!form.zip) e.zip = true
    if (!form.country) e.country = true
    if (payMethod === 'card') {
      if (!form.cardNumber || form.cardNumber.replace(/\s/g, '').length < 16)
        e.cardNumber = true
      if (!form.expiry || form.expiry.length < 5) e.expiry = true
      if (!form.cvv || form.cvv.length < 3) e.cvv = true
      if (!form.cardholder) e.cardholder = true
    }
    if (!agreed) e.agreed = true
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = () => {
    if (cart.length === 0) {
      toast('Your cart is empty.', 'error')
      return
    }
    if (validate()) {
      clearCart()
      setOrderPlaced(true)
    }
  }

  const inp = (field, placeholder, type = 'text', extra = {}) => (
    <input
      className={`co-input ${errors[field] ? 'error' : ''}`}
      type={type}
      placeholder={placeholder}
      value={form[field]}
      onChange={set(field)}
      {...extra}
    />
  )

  // ── Order success screen ──────────────────────────────────────────────────
  if (orderPlaced) {
    return (
      <div
        style={{
          minHeight: '80vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#f5f7fa',
        }}
      >
        <div
          style={{
            background: '#fff',
            borderRadius: 20,
            padding: 48,
            textAlign: 'center',
            maxWidth: 480,
            boxShadow: '0 8px 40px rgba(0,0,0,0.1)',
          }}
        >
          <div style={{ fontSize: 64, marginBottom: 16 }}>🎉</div>
          <h2 style={{ color: '#111', marginBottom: 12 }}>
            Order Placed Successfully!
          </h2>
          <p style={{ color: '#777', marginBottom: 8 }}>
            Thank you, <strong>{form.firstName}</strong>! Your order has been
            confirmed.
          </p>
          <p style={{ color: '#777', marginBottom: 24 }}>
            A confirmation will be sent to <strong>{form.email}</strong>.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
            <button
              onClick={() => navigate('/Home')}
              style={{
                background: '#2563eb',
                color: '#fff',
                border: 'none',
                borderRadius: 10,
                padding: '14px 28px',
                fontWeight: 700,
                fontSize: 15,
                cursor: 'pointer',
              }}
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="co-page">
      <div className="co-nav">
        <h1>Checkout</h1>
        <div className="co-breadcrumb">
          <Link to="/Home" className="co-home-link">
            Home
          </Link>
          <span> / </span>
          <span>Checkout</span>
        </div>
      </div>

      {/* Progress steps */}
      <div className="co-steps">
        {steps.map((s, i) => (
          <React.Fragment key={s.id}>
            <div className={`co-step ${i === 0 ? 'active' : ''}`}>
              <div className="co-step-icon">{s.icon}</div>
              <span>{s.label}</span>
            </div>
            {i < steps.length - 1 && <div className="co-step-line" />}
          </React.Fragment>
        ))}
      </div>

      <div className="co-body">
        {/* LEFT: cart summary */}
        <aside className="co-sidebar">
          <div className="co-cart-box">
            <div className="co-cart-header">
              <FiShoppingBag size={20} />
              <span>Your Cart</span>
              <span className="co-cart-count">{cart.length}</span>
            </div>

            {cart.length === 0 ? (
              <div
                style={{ padding: '24px', color: '#888', textAlign: 'center' }}
              >
                Your cart is empty.{' '}
                <Link to="/Category" style={{ color: '#2563eb' }}>
                  Shop now
                </Link>
              </div>
            ) : (
              <div className="co-cart-items">
                {cart.map((item) => (
                  <div key={item._key} className="co-cart-item">
                    <div className="co-item-img-wrap">
                      <img
                        src={item.img || item.image}
                        alt={item.name || item.title}
                      />
                      <span className="co-item-qty">{item.qty}</span>
                    </div>
                    <div className="co-item-info">
                      <strong>{item.name || item.title}</strong>
                      <span>
                        {item.color && `Color: ${item.color}`}
                        {item.size && ` | Size: ${item.size}`}
                      </span>
                    </div>
                    <span className="co-item-price">
                      ${(item.price * item.qty).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* Discount */}
            <div className="co-discount">
              <input
                className="co-input"
                placeholder="Discount Code (try SAVE10)"
                value={discount}
                onChange={(e) => setDiscount(e.target.value)}
              />
              <button className="co-redeem-btn" onClick={applyDiscount}>
                Redeem
              </button>
            </div>

            {/* Totals */}
            <div className="co-totals">
              <div className="co-total-row">
                <span>Subtotal</span>
                <span>${cartSubtotal.toFixed(2)}</span>
              </div>
              <div className="co-total-row">
                <span>Delivery</span>
                <span>${DELIVERY.toFixed(2)}</span>
              </div>
              <div className="co-total-row">
                <span>Estimated Tax</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              {discountApplied > 0 && (
                <div className="co-total-row green">
                  <span>Discount</span>
                  <span>-${discountApplied.toFixed(2)}</span>
                </div>
              )}
              <div className="co-total-row grand">
                <strong>Order Total</strong>
                <strong>${total.toFixed(2)}</strong>
              </div>
            </div>

            <div className="co-protected">
              <FiShield color="#22c55e" size={16} />
              <span>Protected Payment</span>
            </div>
            <div className="co-pay-icons">
              <MdPayment size={24} />
              <FiCreditCard size={24} />
              <SiPaypal size={20} />
              <SiApplepay size={28} />
            </div>
          </div>
        </aside>

        {/* RIGHT: form */}
        <main className="co-main">
          {/* Personal Details */}
          <div className="co-section">
            <h3 className="co-section-title">
              <FiUser className="co-section-icon" /> Personal Details
            </h3>
            <div className="co-grid-2">
              <div className="co-field">
                <label>GIVEN NAME</label>
                {inp('firstName', 'Enter Given Name')}
                {errors.firstName && <span className="co-err">Required</span>}
              </div>
              <div className="co-field">
                <label>FAMILY NAME</label>
                {inp('lastName', 'Enter Family Name')}
                {errors.lastName && <span className="co-err">Required</span>}
              </div>
              <div className="co-field">
                <label>EMAIL ADDRESS</label>
                {inp('email', 'Enter Email', 'email')}
                {errors.email && (
                  <span className="co-err">Valid email required</span>
                )}
              </div>
              <div className="co-field">
                <label>MOBILE NUMBER</label>
                {inp('mobile', 'Enter Mobile', 'tel')}
                {errors.mobile && <span className="co-err">Required</span>}
              </div>
            </div>
          </div>

          {/* Delivery Address */}
          <div className="co-section">
            <h3 className="co-section-title">
              <FiMapPin className="co-section-icon" /> Delivery Address
            </h3>
            <div className="co-grid-3-1">
              <div className="co-field" style={{ gridColumn: 'span 2' }}>
                <label>STREET ADDRESS</label>
                {inp('street', 'Enter Street Address')}
                {errors.street && <span className="co-err">Required</span>}
              </div>
              <div className="co-field">
                <label>UNIT / SUITE</label>
                {inp('unit', 'Apt, Unit, etc.')}
              </div>
            </div>
            <div className="co-grid-3">
              <div className="co-field">
                <label>CITY</label>
                {inp('city', 'City')}
                {errors.city && <span className="co-err">Required</span>}
              </div>
              <div className="co-field">
                <label>STATE / PROVINCE</label>
                {inp('state', 'State')}
                {errors.state && <span className="co-err">Required</span>}
              </div>
              <div className="co-field">
                <label>POSTAL CODE</label>
                {inp('zip', 'ZIP')}
                {errors.zip && <span className="co-err">Required</span>}
              </div>
            </div>
            <div className="co-field">
              <label>COUNTRY / REGION</label>
              <select
                className={`co-input ${errors.country ? 'error' : ''}`}
                value={form.country}
                onChange={set('country')}
              >
                <option value="">Choose Country</option>
                {COUNTRIES.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
              {errors.country && <span className="co-err">Required</span>}
            </div>
            <div className="co-checkboxes">
              <label className="co-checkbox-label">
                <input
                  type="checkbox"
                  checked={rememberAddr}
                  onChange={(e) => setRememberAddr(e.target.checked)}
                />
                Remember this address
              </label>
              <label className="co-checkbox-label">
                <input
                  type="checkbox"
                  checked={useAsBilling}
                  onChange={(e) => setUseAsBilling(e.target.checked)}
                />
                Use as billing address
              </label>
            </div>
          </div>

          {/* Payment */}
          <div className="co-section">
            <h3 className="co-section-title">
              <FiCreditCard className="co-section-icon" /> Payment Info
            </h3>
            <div className="co-pay-methods">
              {[
                { id: 'card', label: 'Card', icon: <FiCreditCard /> },
                { id: 'paypal', label: 'PayPal', icon: <SiPaypal /> },
                { id: 'apple', label: 'Apple Pay', icon: <SiApplepay /> },
              ].map((m) => (
                <button
                  key={m.id}
                  className={`co-pay-method ${payMethod === m.id ? 'active' : ''}`}
                  onClick={() => setPayMethod(m.id)}
                >
                  {m.icon} {m.label}
                </button>
              ))}
            </div>

            {payMethod === 'card' && (
              <div className="co-card-fields">
                <div className="co-field">
                  <label>CARD NUMBER</label>
                  <div className="co-card-input-wrap">
                    <input
                      className={`co-input ${errors.cardNumber ? 'error' : ''}`}
                      placeholder="0000 0000 0000 0000"
                      value={form.cardNumber}
                      onChange={(e) =>
                        setForm((f) => ({
                          ...f,
                          cardNumber: formatCard(e.target.value),
                        }))
                      }
                    />
                    <div className="co-card-icons">
                      <MdPayment />
                      <FiCreditCard />
                    </div>
                  </div>
                  {errors.cardNumber && (
                    <span className="co-err">Valid card number required</span>
                  )}
                </div>
                <div className="co-grid-3">
                  <div className="co-field">
                    <label>EXPIRY DATE</label>
                    <input
                      className={`co-input ${errors.expiry ? 'error' : ''}`}
                      placeholder="MM/YY"
                      value={form.expiry}
                      onChange={(e) =>
                        setForm((f) => ({
                          ...f,
                          expiry: formatExpiry(e.target.value),
                        }))
                      }
                    />
                    {errors.expiry && <span className="co-err">Required</span>}
                  </div>
                  <div className="co-field">
                    <label>CVV</label>
                    <input
                      className={`co-input ${errors.cvv ? 'error' : ''}`}
                      placeholder="···"
                      maxLength={4}
                      value={form.cvv}
                      onChange={(e) =>
                        setForm((f) => ({
                          ...f,
                          cvv: e.target.value.replace(/\D/g, ''),
                        }))
                      }
                    />
                    {errors.cvv && <span className="co-err">Required</span>}
                  </div>
                  <div className="co-field">
                    <label>CARDHOLDER</label>
                    {inp('cardholder', 'Full Name')}
                    {errors.cardholder && (
                      <span className="co-err">Required</span>
                    )}
                  </div>
                </div>
              </div>
            )}
            {payMethod === 'paypal' && (
              <div className="co-alt-pay">
                <SiPaypal size={40} color="#003087" />
                <p>
                  You will be redirected to PayPal to complete your purchase.
                </p>
              </div>
            )}
            {payMethod === 'apple' && (
              <div className="co-alt-pay">
                <SiApplepay size={48} color="#000" />
                <p>
                  You will be redirected to Apple Pay to complete your purchase.
                </p>
              </div>
            )}
          </div>

          {/* Confirm */}
          <div className="co-section">
            <h3 className="co-section-title">
              <FiCheckCircle className="co-section-icon" /> Confirm & Submit
            </h3>
            <label
              className={`co-checkbox-label ${errors.agreed ? 'error-label' : ''}`}
            >
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
              />
              I accept the{' '}
              <Link to="/terms" className="co-link">
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link to="/privacy" className="co-link">
                Privacy Policy
              </Link>
            </label>
            {errors.agreed && (
              <span className="co-err">You must accept the terms</span>
            )}

            <button className="co-submit-btn" onClick={handleSubmit}>
              <FiLock /> Complete Purchase
              <span className="co-submit-total">${total.toFixed(2)}</span>
            </button>
          </div>
        </main>
      </div>
    </div>
  )
}

export default Checkout

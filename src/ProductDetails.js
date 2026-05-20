import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  FiShoppingCart,
  FiHeart,
  FiTruck,
  FiRefreshCw,
  FiShield,
  FiHeadphones,
  FiZap,
  FiThumbsUp,
  FiCornerUpLeft,
} from 'react-icons/fi'
import { BiBluetooth, BiDiamond } from 'react-icons/bi'
import { TbWaveSine, TbBattery2 } from 'react-icons/tb'
import { FaBoxOpen } from 'react-icons/fa'
import { useApp } from './context/AppContext'

const images = [
  '/image/jbl1.avif',
  '/image/jbl2.jpg',
  '/image/jbl3.png',
  '/image/jbl4.png',
  '/image/jbl5.webp',
]

const colors = [
  { name: 'Obsidian', hex: '#1e2a3a' },
  { name: 'Cream', hex: '#f5f0e8' },
  { name: 'Royal Blue', hex: '#2563eb' },
  { name: 'Forest', hex: '#2d6a4f' },
]

const features = [
  {
    icon: <TbWaveSine />,
    title: 'Premium Sound',
    desc: 'Enjoy deep bass and crystal-clear highs with JBLs signature sound technology.',
  },
  {
    icon: <TbBattery2 />,
    title: 'Extended Battery',
    desc: 'Up to 35 hours of playtime on a single charge, keeping the music going all day and night.',
  },
  {
    icon: <BiBluetooth />,
    title: 'Seamless Pairing',
    desc: 'Connect effortlessly to your devices with JBLs advanced Bluetooth technology.',
  },
  {
    icon: <BiDiamond />,
    title: 'Ergonomic Design',
    desc: 'Designed for comfort and durability, ensuring a secure fit during use.',
  },
]

const included = [
  'Premium Audio Device',
  'Protective Travel Case',
  'USB-C Charging Cable',
  '3.5mm AUX Connector',
  'Setup Manual',
  'Warranty Certificate',
]

const specs = {
  'Audio Performance': [
    ['Frequency Range', '15Hz - 25kHz'],
    ['Driver Size', '50mm Dynamic'],
    ['Sensitivity', '98dB SPL'],
    ['Impedance', '24 Ohm'],
    ['THD', '< 0.5%'],
  ],
  'Wireless & Power': [
    ['Protocol', 'Bluetooth 5.3'],
    ['Range', 'Up to 30ft (10m)'],
    ['Battery', '800mAh Li-ion'],
    ['Playtime', '35+ hours'],
    ['Charge Time', '2.5 hours'],
  ],
  'Build & Dimensions': [
    ['Weight', '285g'],
    ['Dimensions', '190 x 165 x 82mm'],
    ['Cushion Material', 'Memory Foam'],
    ['Frame', 'Adjustable Steel'],
  ],
  'Smart Features': [
    ['Noise Cancelling', 'Hybrid ANC'],
    ['Voice Assistant', 'Siri & Google'],
    ['Microphone', 'Dual Array'],
    ['Water Resistance', 'IPX5'],
  ],
}

const reviews = [
  {
    name: 'Marcus Bennett',
    avatar: '/image/person-m-8.webp',
    rating: 5,
    date: 'April 12, 2024',
    title: 'Exceptional clarity and comfortable wear',
    body: 'The best headphones I have ever owned. The sound quality is phenomenal, with rich bass and clear mids and highs.',
    helpful: 14,
  },
  {
    name: 'Olivia Torres',
    avatar: '/image/person-m-12.webp',
    rating: 3.5,
    date: 'March 5, 2024',
    title: 'Solid performance with minor quirks',
    body: 'Overall, I am satisfied with these headphones. The sound quality is good, especially for the price point.',
    helpful: 9,
  },
  {
    name: 'Jason Kimura',
    avatar: '/image/person-m-13.webp',
    rating: 5,
    date: 'January 18, 2024',
    title: 'Ideal companion for remote professionals',
    body: 'As someone who works from home, these headphones have been a game-changer for focus and calls.',
    helpful: 21,
  },
]

const ratingBars = [
  { star: 5, count: 97 },
  { star: 4, count: 31 },
  { star: 3, count: 9 },
  { star: 2, count: 4 },
  { star: 1, count: 2 },
]

const Stars = ({ rating, size = 16 }) => (
  <span style={{ display: 'inline-flex', gap: 2 }}>
    {[1, 2, 3, 4, 5].map((i) => (
      <span
        key={i}
        style={{
          fontSize: size,
          color:
            i <= rating ? '#f59e0b' : i - 0.5 <= rating ? '#f59e0b' : '#ddd',
          opacity: i - 0.5 <= rating && i > rating ? 0.5 : 1,
        }}
      >
        ★
      </span>
    ))}
  </span>
)

const PRODUCT = {
  id: 'jbl-charge-5',
  title: 'JBL CHARGE 5 Bluetooth Speaker',
  price: 189.99,
  oldPrice: 239.99,
  image: '/image/jbl1.avif',
}

const ProductDetails = () => {
  const { addToCart, toggleWishlist, isWishlisted, toast } = useApp()
  const [activeImg, setActiveImg] = useState(0)
  const [selectedColor, setSelectedColor] = useState(0)
  const [qty, setQty] = useState(1)
  const [tab, setTab] = useState('description')

  const wishlisted = isWishlisted(PRODUCT.id)

  const handleAddToCart = () => {
    addToCart({
      ...PRODUCT,
      id: PRODUCT.id,
      name: PRODUCT.title,
      img: images[activeImg],
      color: colors[selectedColor].name,
      qty,
      _key: `${PRODUCT.id}_${colors[selectedColor].name}`,
    })
    toast(`${PRODUCT.title} added to cart!`)
  }

  return (
    <div className="pd-page">
      <div className="pd-nav">
        <h1>Product Details</h1>
        <div className="pd-breadcrumb">
          <Link to="/Home" className="pd-home-link">
            Home
          </Link>
          <span> / </span>
          <span>Product Details</span>
        </div>
      </div>

      <div className="pd-top">
        {/* Thumbnails */}
        <div className="pd-thumbs">
          {images.map((img, i) => (
            <div
              key={i}
              className={`pd-thumb ${activeImg === i ? 'active' : ''}`}
              onClick={() => setActiveImg(i)}
            >
              <img src={img} alt={`view ${i + 1}`} />
            </div>
          ))}
        </div>

        {/* Main image */}
        <div className="pd-main-img">
          <span className="pd-badge-sale">-21%</span>
          <img src={images[activeImg]} alt="product" />
        </div>

        {/* Info */}
        <div className="pd-info">
          <span className="pd-category-tag">SOUND EQUIPMENT</span>
          <h2>JBL CHARGE 5 - Portable Bluetooth Speaker - Black</h2>

          <div className="pd-rating-row">
            <Stars rating={4.6} size={18} />
            <span className="pd-rating-num">4.6</span>
            <a href="#feedback" className="pd-rating-link">
              (143 ratings)
            </a>
          </div>

          <div className="pd-price-box">
            <span className="pd-price">$189.99</span>
            <span className="pd-old-price">$239.99</span>
            <span className="pd-save-badge">Save $50.00</span>
          </div>

          <p className="pd-desc">
            Experience crystal-clear sound with the JBL CHARGE 5. Perfect for
            outdoor adventures or indoor gatherings, delivering powerful audio
            with deep bass and clear highs.
          </p>

          <div className="pd-stock">
            <span className="pd-in-stock">✓ In Stock</span>
            <span className="pd-stock-note">Only 18 remaining</span>
          </div>

          <div className="pd-color-section">
            <p className="pd-color-label">Select Color:</p>
            <div className="pd-colors">
              {colors.map((c, i) => (
                <button
                  key={i}
                  className={`pd-color-btn ${selectedColor === i ? 'selected' : ''}`}
                  style={{ background: c.hex }}
                  onClick={() => setSelectedColor(i)}
                >
                  {selectedColor === i && <span>✓</span>}
                </button>
              ))}
            </div>
            <p className="pd-color-name">{colors[selectedColor].name}</p>
          </div>

          <div className="pd-actions">
            <div className="pd-qty">
              <button onClick={() => setQty((q) => Math.max(1, q - 1))}>
                −
              </button>
              <span>{qty}</span>
              <button onClick={() => setQty((q) => q + 1)}>+</button>
            </div>
            <button className="pd-add-btn" onClick={handleAddToCart}>
              <FiShoppingCart /> Add to Cart
            </button>
            <button
              className={`pd-wish-btn ${wishlisted ? 'active' : ''}`}
              onClick={() => {
                toggleWishlist(PRODUCT)
                toast(
                  wishlisted ? 'Removed from wishlist.' : 'Added to wishlist!',
                  'info',
                )
              }}
            >
              <FiHeart />
            </button>
          </div>

          <button className="pd-instant-btn" onClick={handleAddToCart}>
            <FiZap /> Purchase Instantly
          </button>

          <div className="pd-perks">
            <div className="pd-perk">
              <FiTruck /> Free shipping $75+
            </div>
            <div className="pd-perk">
              <FiRefreshCw /> 45-day returns
            </div>
            <div className="pd-perk">
              <FiShield /> 3-year warranty
            </div>
            <div className="pd-perk">
              <FiHeadphones /> 24/7 support
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="pd-tabs-section">
        <div className="pd-tabs">
          {['description', 'specifications', 'feedback'].map((t) => (
            <button
              key={t}
              className={`pd-tab ${tab === t ? 'active' : ''}`}
              onClick={() => setTab(t)}
            >
              {t === 'feedback'
                ? 'Feedback (143)'
                : t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>

        {tab === 'description' && (
          <div className="pd-tab-content pd-desc-tab">
            <div className="pd-desc-left">
              <h3>About This Product</h3>
              <p>
                The JBL CHARGE 5 is a powerful portable Bluetooth speaker
                designed for both outdoor adventures and indoor gatherings. With
                its rugged build and crystal-clear sound, it delivers deep bass
                and clear highs. Up to 35 hours of playtime and IPX5 waterproof
                rating.
              </p>
              <h4>Feature Highlights</h4>
              <div className="pd-features-grid">
                {features.map((f, i) => (
                  <div key={i} className="pd-feature-card">
                    <span className="pd-feature-icon">{f.icon}</span>
                    <div>
                      <strong>{f.title}</strong>
                      <p>{f.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="pd-included-box">
              <h4>
                <FaBoxOpen /> What's Included
              </h4>
              {included.map((item, i) => (
                <div key={i} className="pd-included-item">
                  <span className="pd-check">✓</span> {item}
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === 'specifications' && (
          <div className="pd-tab-content pd-specs-tab">
            {Object.entries(specs).map(([group, rows]) => (
              <div key={group} className="pd-spec-group">
                <h4>{group}</h4>
                {rows.map(([label, value]) => (
                  <div key={label} className="pd-spec-row">
                    <strong>{label}</strong>
                    <span>{value}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}

        {tab === 'feedback' && (
          <div className="pd-tab-content" id="feedback">
            <div className="pd-feedback-top">
              <div className="pd-rating-summary">
                <span className="pd-big-rating">4.6</span>
                <Stars rating={4.6} size={28} />
                <p>Based on 143 ratings</p>
                <button className="pd-review-btn">Write a Review</button>
              </div>
              <div className="pd-rating-bars">
                {ratingBars.map(({ star, count }) => (
                  <div key={star} className="pd-bar-row">
                    <span>{star} ★</span>
                    <div className="pd-bar-track">
                      <div
                        className="pd-bar-fill"
                        style={{ width: `${(count / 97) * 100}%` }}
                      />
                    </div>
                    <span>{count}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="pd-reviews">
              {reviews.map((r, i) => (
                <div key={i} className="pd-review-card">
                  <div className="pd-review-header">
                    <img src={r.avatar} alt={r.name} className="pd-avatar" />
                    <div>
                      <strong>{r.name}</strong>
                      <div className="pd-review-meta">
                        <Stars rating={r.rating} size={14} />
                        <span>{r.date}</span>
                      </div>
                    </div>
                  </div>
                  <h5>{r.title}</h5>
                  <p>{r.body}</p>
                  <div className="pd-review-actions">
                    <button>
                      <FiThumbsUp /> Helpful ({r.helpful})
                    </button>
                    <button>
                      <FiCornerUpLeft /> Reply
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ProductDetails

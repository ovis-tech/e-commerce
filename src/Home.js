import React, { useState, memo } from 'react'
import { useNavigate } from 'react-router-dom'
import Countdown from './Countdown'
import {
  BsGrid,
  BsTruck,
  BsShieldCheck,
  BsChatDots,
  BsArrowReturnLeft,
  BsArrowRight,
  BsStarFill,
  BsStarHalf,
  BsStar,
  BsHeart,
  BsEye,
  BsShuffle,
  BsBag,
  BsTrophy,
  BsDiamond,
  BsClock,
} from 'react-icons/bs'
import { useApp } from './context/AppContext'

// ─── Sub-components ───────────────────────────────────────────────────────────

const ProductCard = memo(({ id, tags, image, title, price, price2 }) => {
  const { addToCart, toast } = useApp()
  return (
    <div className="card">
      <div className="product-tags">
        <p>{tags}</p>
      </div>
      <div className="product-image">
        <img src={image} alt={title} />
      </div>
      <div className="product-info">
        <h3>{title}</h3>
        <p>
          ${price} <span>${price2}</span>
        </p>
        <button
          onClick={() => {
            addToCart({
              id: id || title,
              title,
              image,
              price: parseFloat(price),
              _key: `${id || title}_`,
            })
            toast(`${title} added to cart!`)
          }}
          style={{
            marginTop: 8,
            background: '#0559b7',
            color: '#fff',
            border: 'none',
            borderRadius: 6,
            padding: '8px 16px',
            fontWeight: 600,
            cursor: 'pointer',
            width: '100%',
          }}
        >
          Add to Cart
        </button>
      </div>
    </div>
  )
})

const Option = memo(({ image, title, item, browser }) => {
  const navigate = useNavigate()
  return (
    <div
      className="option-card"
      style={{
        backgroundImage: `linear-gradient(to top, rgba(0,0,0,0.7), rgba(0,0,0,0.3), transparent), url(${image})`,
      }}
    >
      <div className="content">
        <h3>{title}</h3>
        <p>{item}</p>
        <button className="option-button" onClick={() => navigate('/Category')}>
          {browser} <BsArrowRight />
        </button>
      </div>
    </div>
  )
})

const BestProductCard = memo(({ product }) => {
  const { addToCart, toggleWishlist, isWishlisted, toast } = useApp()
  const {
    tags,
    image,
    title,
    rate,
    rateNumber,
    price,
    price2,
    category,
    colors = [],
    button,
    id,
  } = product
  const [selectedColor, setSelectedColor] = React.useState(colors[0] || null)
  const wishlisted = isWishlisted(id || title)

  return (
    <div className="best-card">
      <div className="left">
        <div
          className="bg-layer"
          style={{ backgroundImage: `url(${image})` }}
        />
        <p>{tags}</p>
        <img src={image} alt={title} />
        <div className="product-icons">
          <div
            className="product-icons-cover"
            onClick={() => {
              toggleWishlist({
                id: id || title,
                title,
                image,
                price: parseFloat(price),
              })
              toast(
                wishlisted ? 'Removed from wishlist.' : 'Added to wishlist!',
                'info',
              )
            }}
          >
            <BsHeart style={{ color: wishlisted ? '#ef4444' : 'black' }} />
          </div>
          <div className="product-icons-cover">
            <BsEye />
          </div>
          <div className="product-icons-cover">
            <BsShuffle />
          </div>
        </div>
      </div>
      <div className="right">
        <p>{category}</p>
        <h3>{title}</h3>
        <h1>
          ${price} <span>${price2}</span>
        </h1>
        <div className="rating">
          {Array.from({ length: 5 }, (_, i) => {
            const v = i + 1
            return v <= rate ? (
              <BsStarFill key={i} />
            ) : v - 0.5 <= rate ? (
              <BsStarHalf key={i} />
            ) : (
              <BsStar key={i} />
            )
          })}
          <span>({rateNumber})</span>
        </div>
        <div className="color-options">
          {colors.map((c) => (
            <div
              key={c}
              className={`color-option ${selectedColor === c ? 'active' : ''}`}
              style={{ backgroundColor: c }}
              onClick={() => setSelectedColor(c)}
            />
          ))}
        </div>
        <button
          className="add-to-cart-button"
          onClick={() => {
            addToCart({
              id: id || title,
              title,
              image,
              price: parseFloat(price),
              color: selectedColor,
              _key: `${id || title}_${selectedColor}`,
            })
            toast(`${title} added to cart!`)
          }}
        >
          {button} <BsArrowRight />
        </button>
      </div>
    </div>
  )
})

const DealsCard = memo(({ id, badge, image, title, oldPrice, newPrice }) => {
  const { addToCart, toast } = useApp()
  const fmt = (p) =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(p)
  return (
    <div className="deals-card">
      <div style={{ position: 'relative' }}>
        {badge && <div className="save-badge">{badge}</div>}
        <div
          className="deals-image"
          style={{ backgroundImage: `url(${image})` }}
        />
      </div>
      
      <h3>{title}</h3>
      <div className="deals-price">
        {oldPrice && <span className="old-price">{fmt(oldPrice)}</span>}
        <span className="new-price">{fmt(newPrice)}</span>
      </div>
      <button
        className="cart-btnn"
        onClick={() => {
          addToCart({
            id: id || title,
            title,
            image,
            price: parseFloat(newPrice),
            oldPrice: parseFloat(oldPrice),
            _key: `deal_${id || title}`,
          })
          toast(`${title} added to cart!`)
        }}
      >
        <BsBag /> Add to Cart <BsArrowRight />
      </button>
    </div>
  )
})

// ─── Static data ──────────────────────────────────────────────────────────────

const productGroups = {
  popular: [
    {
      id: 'p1',
      image: '/image/product-1.webp',
      title: 'Artisan Leather Bag',
      price: 92,
    },
    {
      id: 'p2',
      image: '/image/product-3.webp',
      title: 'Crystal Drop Earrings',
      price: 44.5,
    },
    {
      id: 'p3',
      image: '/image/product-5.webp',
      title: 'Linen Blend Shirt',
      price: 49,
    },
  ],
  top: [
    {
      id: 'p4',
      image: '/image/product-2.webp',
      title: 'Gold Watch',
      price: 120,
    },
    {
      id: 'p5',
      image: '/image/product-6.webp',
      title: 'Luxury Bag',
      price: 150,
    },
    {
      id: 'p6',
      image: '/image/product-8.webp',
      title: 'Classic Heels',
      price: 80,
    },
  ],
  curated: [
    { id: 'p7', image: '/image/product-7.webp', title: 'Sneakers', price: 65 },
    {
      id: 'p8',
      image: '/image/product-4.webp',
      title: 'Denim Jacket',
      price: 95,
    },
    { id: 'p9', image: '/image/product-9.webp', title: 'Cap', price: 25 },
  ],
}

const bestSellers = [
  {
    id: 'bs1',
    tags: 'Exclusive',
    image: '/image/product-3.webp',
    title: 'Glasses',
    price: '189.00',
    price2: '249.00',
    rate: 4.5,
    rateNumber: 31,
    colors: ['#0f05c6a8', '#059a0f', '#f00'],
    category: 'Curated Selection',
    button: 'Add to Cart',
  },
  {
    id: 'bs2',
    tags: '30% Off',
    image: '/image/product-6.webp',
    title: 'Leather Bag',
    price: '189.00',
    price2: '249.00',
    rate: 5,
    rateNumber: 42,
    colors: ['#000', '#a67e06', 'rgb(142,8,176)'],
    category: 'Top Rated',
    button: 'Add to Cart',
  },
  {
    id: 'bs3',
    tags: 'Exclusive',
    image: '/image/product-9.webp',
    title: 'Handbag',
    price: '189.00',
    price2: '249.00',
    rate: 4.5,
    rateNumber: 31,
    colors: ['#c71010', '#15bfe5', 'rgb(19,197,31)'],
    category: 'Curated Selection',
    button: 'Add to Cart',
  },
  {
    id: 'bs4',
    tags: 'Exclusive',
    image: '/image/product-12.webp',
    title: 'Sneakers',
    price: '189.00',
    price2: '249.00',
    rate: 4.5,
    rateNumber: 31,
    colors: ['#6a6767', '#6e0c8f', 'rgba(205,179,13,0.82)'],
    category: 'Curated Selection',
    button: 'Add to Cart',
  },
]

// ─── Home ─────────────────────────────────────────────────────────────────────

const Home = () => {
  const { addToCart, toast } = useApp()
  const navigate = useNavigate()
  const [active, setActive] = useState('popular')
  const [fade, setFade] = useState(false)

  const handleChange = (type) => {
    setFade(true)
    setTimeout(() => {
      setActive(type)
      setFade(false)
    }, 200)
  }

  const currentProducts = productGroups[active]

  return (
    <div className="home">
      {/* HERO */}
      <div className="hero-content">
        <div className="premium-collection">
          <p>Premium Collection</p>
        </div>
        <h1>Elevate Your Everyday Style</h1>
        <p>
          Discover our exclusive collection of premium products designed to
          elevate your everyday style.
          <br />
          From timeless classics to modern essentials, our curated selection
          offers the perfect blend of quality and sophistication.
          <br />
          Shop now and experience the difference of premium craftsmanship.
        </p>
        <div className="hero-buttons">
          <button
            className="explore-button"
            onClick={() => navigate('/Category')}
          >
            Explore Collection
          </button>
          <button
            className="view-categories-button"
            onClick={() => navigate('/Category')}
          >
            <BsGrid /> View Categories
          </button>
        </div>
      </div>

      {/* PRODUCT CARDS */}
      <div className="products-section">
        <ProductCard
          id="hero1"
          tags="Top Rated"
          image="/image/product-4.webp"
          title="Signature Audio Device"
          price="249"
          price2="299"
        />
        <ProductCard
          id="hero2"
          tags="Most Popular"
          image="/image/product-11.webp"
          title="Elite Smart Accessory"
          price="179"
          price2="229"
        />
        <ProductCard
          id="hero3"
          tags="New Arrival"
          image="/image/product-8.webp"
          title="Modern Lifestyle Gear"
          price="129"
          price2="179"
        />
      </div>

      {/* PERKS */}
      <div className="perk-strip">
        <div className="perk1">
          <BsTruck className="perk-icon" />
          <span>Complimentary Delivery</span>
        </div>
        <div className="perk2">
          <BsShieldCheck className="perk-icon" />
          <span>Certified Quality</span>
        </div>
        <div className="perk3">
          <BsChatDots className="perk-icon" />
          <span>Always-On Assistance</span>
        </div>
        <div className="perk4">
          <BsArrowReturnLeft className="perk-icon" />
          <span>Hassle-Free Returns</span>
        </div>
      </div>

      {/* BANNER */}
      <section className="promo">
        <div className="banner-content">
          <div className="label">
            <h1>FRESH ARRIVALS</h1>
          </div>
          <h2>Autumn Essentials</h2>
          <p>
            Embrace the season with our curated collection of autumn essentials.
          </p>
          <button
            className="browse-button"
            onClick={() => navigate('/Category')}
          >
            Browse Collection <BsArrowRight />
          </button>
        </div>
      </section>

      {/* OPTIONS */}
      <section className="options">
        <Option
          image="/image/product-m-14.webp"
          title="Gentlemen's Attire"
          item="318 items"
          browser="Browse"
        />
        <Option
          image="/image/product-f-18.webp"
          title="Casual Collection"
          item="163 items"
          browser="Browse"
        />
        <Option
          image="/image/product-f-6.webp"
          title="Skincare & Glow"
          item="94 items"
          browser="Browse"
        />
        <Option
          image="/image/product-m-17.webp"
          title="Bags & Extras"
          item="217 items"
          browser="Browse"
        />
      </section>

      {/* BEST SELLERS */}
      <section className="bestsellers">
        <h1 className="Best-header">Best Sellers</h1>
        <p>
          Explore our best sellers, the most sought-after products that have
          captured the hearts of our customers.
        </p>
      </section>
      <section className="productss-section">
        {bestSellers.map((product) => (
          <BestProductCard key={product.id} product={product} />
        ))}
      </section>

      {/* PRODUCT GROUPS */}
      <section className="product-groups">
        <div className="buttons">
          <button
            className={active === 'popular' ? 'active' : ''}
            onClick={() => handleChange('popular')}
          >
            <BsStar /> Popular Picks
          </button>
          <button
            className={active === 'top' ? 'active' : ''}
            onClick={() => handleChange('top')}
          >
            <BsTrophy /> Top Rated
          </button>
          <button
            className={active === 'curated' ? 'active' : ''}
            onClick={() => handleChange('curated')}
          >
            <BsDiamond /> Curated Selection
          </button>
        </div>
        <div
          className={`cards-group-container ${fade ? 'fade-out' : 'fade-in'}`}
        >
          {currentProducts.map((product) => (
            <div key={product.id} className="card-group">
              <div
                className="card-group-img"
                style={{ backgroundImage: `url(${product.image})` }}
              >
                <div className="group-icons">
                  <div
                    className="iconss-container"
                    onClick={() => {
                      addToCart({
                        ...product,
                        title: product.title,
                        img: product.image,
                        _key: `group_${product.id}`,
                      })
                      toast(`${product.title} added to cart!`)
                    }}
                  >
                    <BsBag />
                  </div>
                </div>
              </div>
              <div className="card-group-content">
                <h3>{product.title}</h3>
                <div className="rating">
                  ⭐⭐⭐⭐⭐ <span>(121)</span>
                </div>
                <div className="price">${product.price}</div>
                <button
                  onClick={() => {
                    addToCart({
                      ...product,
                      title: product.title,
                      img: product.image,
                      _key: `group_${product.id}`,
                    })
                    toast(`${product.title} added to cart!`)
                  }}
                  style={{
                    marginTop: 8,
                    background: '#0559b7',
                    color: '#fff',
                    border: 'none',
                    borderRadius: 6,
                    padding: '8px 14px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    width: '100%',
                    fontSize: 13,
                  }}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* DEALS */}
      <section className="deals">
        <div className="deals-content">
          <div className="deals-banner">
            <div className="circle top-right" />
            <div className="circle bottom-left" />
            <div className="deals-label">
              <BsStarFill />
              <p>Mega Clearance – Up to 60% Off</p>
            </div>
            <h1>
              Unbeatable Deals <br /> Await You
            </h1>
            <p>
              Dive into our exclusive deals and discover unbeatable prices on
              your favorite products.
            </p>
            <div className="countdown">
              <h2>
                <BsClock /> OFFER EXPIRES IN:
              </h2>
              <div className="countdown-wrapper">
                <Countdown />
              </div>
            </div>
            <div className="deals-button-container">
              <button
                className="deals-button1"
                onClick={() => navigate('/Category')}
              >
                Grab the Deal <BsArrowRight />
              </button>
              <button
                className="deals-button2"
                onClick={() => navigate('/Category')}
              >
                Browse Collection
              </button>
            </div>
          </div>

          <div className="deals-cards">
            <DealsCard
              id="deal1"
              badge="Save 50%"
              image="/image/product-3.webp"
              title="Wireless Earbuds"
              oldPrice="99.00"
              newPrice="49.00"
            />
            <DealsCard
              id="deal2"
              badge="Save 50%"
              image="/image/product-9.webp"
              title="Advanced Activity Band"
              oldPrice="99.00"
              newPrice="49.00"
            />
            <DealsCard
              id="deal3"
              badge="Save 50%"
              image="/image/product-4.webp"
              title="Ergonomic Daypack Pro"
              oldPrice="99.00"
              newPrice="49.00"
            />
            <DealsCard
              id="deal4"
              badge="Save 50%"
              image="/image/product-8.webp"
              title="Handcrafted Ceramic Set"
              oldPrice="99.00"
              newPrice="49.00"
            />
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home

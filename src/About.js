import React from 'react'
import { Link } from 'react-router-dom'
import {
  FiInfo,
  FiTarget,
  FiUsers,
  FiBarChart2,
  FiSmile,
  FiFileText,
  FiHeadphones,
} from 'react-icons/fi'

const stats = [
  {
    icon: <FiSmile />,
    number: 232,
    bold: 'Happy Clients',
    text: 'satisfied customers who have experienced our exceptional service and products.',
  },
  {
    icon: <FiFileText />,
    number: 521,
    bold: 'Projects',
    text: 'a wide range of successful projects that have been completed to the satisfaction of our clients.',
  },
  {
    icon: <FiHeadphones />,
    number: 1453,
    bold: 'Hours Of Support',
    text: 'dedicated support team that is available to assist our customers with any inquiries or issues they may have.',
  },
  {
    icon: <FiUsers />,
    number: 32,
    bold: 'Hard Workers',
    text: 'dedicated professionals who are passionate about their work and committed to delivering excellence.',
  },
]

const testimonials = [
  {
    quote:
      'Implementing innovative strategies has revolutionized our approach to market challenges and competitive positioning.',
    name: 'Rachel Bennett',
    role: 'Strategy Director',
    img: '/image/person-f-7.webp',
    featured: false,
  },
  {
    quote:
      'Exceptional service delivery and innovative solutions have transformed our business operations, leading to remarkable growth and enhanced customer satisfaction across all touchpoints.',
    name: 'Daniel Morgan',
    role: 'Chief Innovation Officer',
    img: '/image/person-m-7.webp',
    featured: true,
  },
  {
    quote:
      'Strategic partnership has enabled seamless digital transformation and operational excellence.',
    name: 'Emma Thompson',
    role: 'Digital Lead',
    img: '/image/person-f-8.webp',
    featured: false,
  },
  {
    quote:
      'Professional expertise and dedication have significantly improved our project delivery timelines and quality metrics.',
    name: 'Christopher Lee',
    role: 'Technical Director',
    img: '/image/person-m-8.webp',
    featured: false,
  },
  {
    quote:
      'Collaborative approach and industry expertise have revolutionized our product development cycle, resulting in faster time-to-market and increased customer engagement levels.',
    name: 'Sarah Wilson',
    role: 'Product Manager',
    img: '/image/person-f-9.webp',
    featured: true,
  },
  {
    quote:
      "Innovative approach to user experience design has significantly enhanced our platform's engagement metrics and customer retention rates.",
    name: 'Nathan Brooks',
    role: 'UX Director',
    img: '/image/person-m-13.webp',
    featured: false,
  },
]

const About = () => {
  const features = [
    {
      icon: <FiTarget />,
      title: 'TARGET',
      text: 'We are committed to achieving our goals and delivering exceptional value to our customers.',
    },
    {
      icon: <FiUsers />,
      title: 'MISSION',
      text: 'Our mission is to provide a seamless and enjoyable online shopping experience for our customers.',
    },
    {
      icon: <FiBarChart2 />,
      title: 'VISION',
      text: 'Our vision is to be the leading e-commerce platform, connecting people with the products they love and empowering them to shop smarter.',
    },
  ]

  return (
    <div className="about-page">
      {/* ── Top nav bar ── */}
      <div className="about-nav">
        <h1>About</h1>
        <div className="about-breadcrumb">
          <Link to="/Home" className="home-link">
            Home
          </Link>
          <span> / </span>
          <span>About</span>
        </div>
      </div>

      {/* ── Hero ── */}
      <div className="about-hero">
        <button className="discover-btn">
          <FiInfo />
          DISCOVER MORE
        </button>
        <h2>The Story of Our Company</h2>
        <p>
          we are a team of passionate individuals dedicated to providing the
          best online shopping experience.
        </p>
      </div>

      {/* ── Video + Features ── */}
      <section className="about-section">
        <div className="about-section-inner">
          {/* Left: video + two paragraphs */}
          <div className="about-left">
            <div className="about-video">
              <img src="\image\about-wide-5.webp" alt="Team meeting" />
              <button className="play-btn" aria-label="Play video">
                ▶
              </button>
            </div>
            <div className="about-desc">
              <p>
                The story of our company begins with a simple idea: to make
                online shopping easy and enjoyable for everyone.
              </p>
              <p>
                From humble beginnings as a small startup, we have grown into a
                leading e-commerce platform with millions of customers
                worldwide.
              </p>
            </div>
          </div>

          {/* Right: feature list */}
          <div className="about-right">
            {features.map((f, i) => (
              <div key={i} className="feature-item">
                <div className="feature-icon">{f.icon}</div>
                <div className="feature-text">
                  <h3>{f.title}</h3>
                  <p>{f.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <div className="about-stats">
        {stats.map((s, i) => (
          <div key={i} className="stat-item">
            <div className="stat-top">
              <span className="stat-icon">{s.icon}</span>
              <span className="stat-number">{s.number}</span>
            </div>
            <p className="stat-label">
              <strong>{s.bold}</strong> {s.text}
            </p>
          </div>
        ))}
      </div>

      {/* ── Testimonials ── */}
      <section className="testimonials-section">
        <div className="testimonials-grid">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className={`testimonial-card ${t.featured ? 'featured' : ''}`}
            >
              <span className="quote-icon">"</span>
              <p className="testimonial-quote">{t.quote}</p>
              <div className="testimonial-author">
                <img src={t.img} alt={t.name} className="author-avatar" />
                <div>
                  <strong>{t.name}</strong>
                  <span>{t.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default About

import {
  BsFacebook,
  BsInstagram,
  BsTwitterX,
  BsTiktok,
  BsPinterest,
  BsYoutube,
} from 'react-icons/bs'
import { MdLocationOn, MdPhone, MdEmail, MdAccessTime } from 'react-icons/md'
import { FaApple, FaGooglePlay } from 'react-icons/fa'

const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-grid">
        <div className="footer-brand">
          <h2>Shop Smart</h2>
          <p>
            Your one-stop destination for all your shopping needs. We offer a
            wide range of products at unbeatable prices, with fast shipping and
            exceptional customer service. Shop with confidence and discover the
            smart way to shop!
          </p>
          <p className="connect-label">Connect With Us</p>
          <div className="social-row">
            {[
              BsFacebook,
              BsInstagram,
              BsTwitterX,
              BsTiktok,
              BsPinterest,
              BsYoutube,
            ].map((Icon, i) => (
              <a key={i} href="#!" className="social-btn">
                <Icon />
              </a>
            ))}
          </div>
        </div>

        <div className="footer-col">
          <h4>Shop</h4>
          <ul>
            {[
              'New Arrivals',
              'Bestsellers',
              "Women's Clothing",
              "Men's Clothing",
              'Accessories',
              'Sale',
            ].map((item) => (
              <li key={item}>
                <a href="https://example.com">
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer-col">
          <h4>Support</h4>
          <ul>
            {[
              'Help Center',
              'Order Status',
              'Shipping Info',
              'Returns & Exchanges',
              'Size Guide',
              'Contact Us',
            ].map((item) => (
              <li key={item}>
                <a href="#!">{item}</a>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer-col">
          <h4>Contact Information</h4>
          <div className="contact-list">
            <div className="contact-item">
              <MdLocationOn />
              <span>lagos, Nigeria</span>
            </div>
            <div className="contact-item">
              <MdPhone />
              <span>+234 1 234 5678</span>
            </div>
            <div className="contact-item">
              <MdEmail />
              <span>hello@example.com</span>
            </div>
            <div className="contact-item">
              <MdAccessTime />
              <span>
                Monday–Friday: 9am–6pm
                <br />
                Saturday: 10am–4pm
                <br />
                Sunday: Closed
              </span>
            </div>
          </div>
          <div className="app-btns">
            <button className="app-btn">
              <FaApple /> App Store
            </button>
            <button className="app-btn">
              <FaGooglePlay /> Google Play
            </button>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div>
          <p>
            © Copyright <strong>Shop Smart</strong>. All Rights Reserved.
          </p>
          <p>
            Designed by <strong>OvisTec</strong>
          </p>
        </div>
        <div className="footer-bottom-right">
          <div className="pay-icons">{/* add payment SVG icons here */}</div>
          <div className="footer-legal">
            <a href="#!">Terms</a>
            <a href="#!">Privacy</a>
            <a href="#!">Cookies</a>
          </div>
          <button
            className="scroll-top-btn"
            onClick={scrollToTop}
            aria-label="Scroll to top"
          >
            ↑
          </button>
        </div>
      </div>
    </footer>
  )
}

export default Footer

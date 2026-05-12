import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom'
import { AppProvider } from './context/AppContext'

import Header from './Header'
import Account from './Account'
import Home from './Home'
import About from './About'
import Category from './Category'
import ProductDetails from './ProductDetails'
import Cart from './Cart'
import Checkout from './Checkout'
import Footer from './Footer'

function App() {
  return (
    <AppProvider>
      <Router>
        <div className="App">
          <Header />
          <Routes>
            {/* Default redirect */}
            <Route path="/" element={<Navigate to="/Home" replace />} />

            <Route path="/Home" element={<Home />} />
            <Route path="/About" element={<About />} />
            <Route path="/Category" element={<Category />} />
            <Route path="/Product-details" element={<ProductDetails />} />
            {/* Fix: was /Cart in nav but /cart in Header link — normalise to /Cart */}
            <Route path="/Cart" element={<Cart />} />
            <Route path="/cart" element={<Navigate to="/Cart" replace />} />
            <Route path="/Checkout" element={<Checkout />} />
            <Route path="/account" element={<Account />} />
            <Route
              path="/help"
              element={
                <h1 style={{ padding: '80px', textAlign: 'center' }}>
                  Help Page
                </h1>
              }
            />
            <Route
              path="/Contact"
              element={
                <h1 style={{ padding: '80px', textAlign: 'center' }}>
                  Contact Page
                </h1>
              }
            />
            <Route
              path="/location"
              element={
                <h1 style={{ padding: '80px', textAlign: 'center' }}>
                  Location Page
                </h1>
              }
            />
            {/* Dropdown routes */}
            <Route path="/electronics" element={<Category />} />
            <Route path="/clothes" element={<Category />} />
            <Route path="/shoes" element={<Category />} />
            {/* Catch-all */}
            <Route path="*" element={<Navigate to="/Home" replace />} />
          </Routes>
          {/* Footer is now INSIDE Router so Link works */}
          <Footer />
        </div>
      </Router>
    </AppProvider>
  )
}

export default App

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from 'react'

// ─── Helpers ──────────────────────────────────────────────────────────────────
const load = (key, fallback) => {
  try {
    const v = localStorage.getItem(key)
    return v ? JSON.parse(v) : fallback
  } catch {
    return fallback
  }
}
const save = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {}
}

// ─── Context ──────────────────────────────────────────────────────────────────
const AppContext = createContext(null)
export const useApp = () => useContext(AppContext)

export const AppProvider = ({ children }) => {
  // ── Cart ──────────────────────────────────────────────────────────────────
  const [cart, setCart] = useState(() => load('ss_cart', []))
  useEffect(() => save('ss_cart', cart), [cart])

  const addToCart = useCallback((product) => {
    setCart((prev) => {
      const key = `${product.id}_${product.color || ''}_${product.size || ''}`
      const existing = prev.find((i) => i._key === key)
      if (existing) {
        return prev.map((i) =>
          i._key === key ? { ...i, qty: i.qty + (product.qty || 1) } : i,
        )
      }
      return [...prev, { ...product, qty: product.qty || 1, _key: key }]
    })
  }, [])

  const removeFromCart = useCallback((key) => {
    setCart((prev) => prev.filter((i) => i._key !== key))
  }, [])

  const updateQty = useCallback((key, delta) => {
    setCart((prev) =>
      prev.map((i) =>
        i._key === key ? { ...i, qty: Math.max(1, i.qty + delta) } : i,
      ),
    )
  }, [])

  const clearCart = useCallback(() => setCart([]), [])

  const cartCount = cart.reduce((s, i) => s + i.qty, 0)
  const cartSubtotal = cart.reduce((s, i) => s + i.price * i.qty, 0)

  // ── Wishlist ───────────────────────────────────────────────────────────────
  const [wishlist, setWishlist] = useState(() => load('ss_wishlist', []))
  useEffect(() => save('ss_wishlist', wishlist), [wishlist])

  const toggleWishlist = useCallback((product) => {
    setWishlist((prev) =>
      prev.find((i) => i.id === product.id)
        ? prev.filter((i) => i.id !== product.id)
        : [...prev, product],
    )
  }, [])

  const isWishlisted = useCallback(
    (id) => wishlist.some((i) => i.id === id),
    [wishlist],
  )

  // ── Auth ──────────────────────────────────────────────────────────────────
  const [user, setUser] = useState(() => load('ss_user', null))
  useEffect(() => save('ss_user', user), [user])

  const [authError, setAuthError] = useState('')

  // Registered users stored in localStorage
  const getUsers = () => load('ss_users', [])
  const saveUsers = (users) => save('ss_users', users)

  const signUp = useCallback((form) => {
    const users = getUsers()
    if (users.find((u) => u.email === form.email)) {
      setAuthError('An account with this email already exists.')
      return false
    }
    const newUser = {
      id: Date.now(),
      fullName: form.fullName,
      email: form.email,
      phone: form.phone,
      password: form.password,
    }
    saveUsers([...users, newUser])
    const { password: _, ...safeUser } = newUser
    setUser(safeUser)
    setAuthError('')
    return true
  }, [])

  const signIn = useCallback((email, password) => {
    const users = getUsers()
    const found = users.find(
      (u) => u.email === email && u.password === password,
    )
    if (!found) {
      setAuthError('Invalid email or password.')
      return false
    }
    const { password: _, ...safeUser } = found
    setUser(safeUser)
    setAuthError('')
    return true
  }, [])

  const signOut = useCallback(() => {
    setUser(null)
  }, [])

  // ── Notifications (toast) ─────────────────────────────────────────────────
  const [toasts, setToasts] = useState([])
  const toast = useCallback((message, type = 'success') => {
    const id = Date.now()
    setToasts((prev) => [...prev, { id, message, type }])
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 3000)
  }, [])

  return (
    <AppContext.Provider
      value={{
        // cart
        cart,
        addToCart,
        removeFromCart,
        updateQty,
        clearCart,
        cartCount,
        cartSubtotal,
        // wishlist
        wishlist,
        toggleWishlist,
        isWishlisted,
        // auth
        user,
        signUp,
        signIn,
        signOut,
        authError,
        setAuthError,
        // toasts
        toasts,
        toast,
      }}
    >
      {children}
      {/* Toast UI */}
      <div
        style={{
          position: 'fixed',
          bottom: 24,
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 9999,
          display: 'flex',
          flexDirection: 'column',
          gap: 8,
          alignItems: 'center',
          pointerEvents: 'none',
        }}
      >
        {toasts.map((t) => (
          <div
            key={t.id}
            style={{
              background:
                t.type === 'error'
                  ? '#ef4444'
                  : t.type === 'info'
                    ? '#0559b7'
                    : '#22c55e',
              color: '#fff',
              padding: '12px 28px',
              borderRadius: 10,
              fontSize: 14,
              fontWeight: 600,
              boxShadow: '0 4px 20px rgba(0,0,0,0.18)',
              animation: 'fadeInUp 0.3s ease',
            }}
          >
            {t.message}
          </div>
        ))}
      </div>
      <style>{`@keyframes fadeInUp { from { opacity:0; transform:translateY(12px);} to { opacity:1; transform:translateY(0); } }`}</style>
    </AppContext.Provider>
  )
}

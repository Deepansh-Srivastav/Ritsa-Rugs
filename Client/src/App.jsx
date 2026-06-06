
import './App.css'
import React, { useEffect, useState } from 'react'
import { Navbar } from './components'
import Home from './components/pages/Home'
import Shop from './components/pages/Shop'
import ProductDetail from './components/pages/ProductDetail'
import Collections from './components/pages/Collections'
import About from './components/pages/About'
import Contact from './components/pages/Contact'
import Cart from './components/pages/Cart'
import Account from './components/pages/Account'
import products from './assets/products'

function parseHash() {
  const hash = (window.location.hash || '#/').replace('#','')
  return hash || '/'
}

function App(){
  const [route, setRoute] = useState(parseHash())
  const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem('rr_cart') || '[]'))

  useEffect(() => {
    const onHash = () => setRoute(parseHash())
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  useEffect(()=>{localStorage.setItem('rr_cart', JSON.stringify(cart))},[cart])

  const addToCart = (product) => {
    setCart((prev)=>{
      const found = prev.find((p)=>p.id===product.id)
      if(found) return prev.map((p)=>p.id===product.id?{...p,qty:p.qty+1}:p)
      return [...prev,{id:product.id,name:product.name,price:product.price,qty:1}]
    })
  }

  const removeFromCart = (id) => setCart((prev)=>prev.filter(p=>p.id!==id))
  const clearCart = ()=>setCart([])

  // route handling
  let content = null
  if(route === '/' || route === '') content = <Home />
  else if(route.startsWith('/product/')){
    const id = route.split('/')[2]
    content = <ProductDetail id={id} onAdd={addToCart} />
  } else if(route === '/shop') content = <Shop onAdd={addToCart} />
  else if(route === '/collections') content = <Collections />
  else if(route === '/about') content = <About />
  else if(route === '/contact') content = <Contact />
  else if(route === '/cart') content = <Cart items={cart} onRemove={removeFromCart} onClear={clearCart} />
  else if(route === '/account') content = <Account />
  else content = <Home />

  return (
    <>
      <Navbar cartCount={cart.reduce((s,i)=>s+i.qty,0)} />
      <main id="main" className="app-main">
        {content}
      </main>
    </>
  )
}

export default App;
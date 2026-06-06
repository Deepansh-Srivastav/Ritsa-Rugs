import React from 'react'
import '../../styles/navbar.css'

export default function ProductCard({ product, onAdd }) {
  return (
    <article className="product-card" style={{borderRadius:8,overflow:'hidden',boxShadow:'var(--rr-shadow)',background:'var(--rr-bg)'}}>
      <a href={`#/product/${product.id}`} style={{display:'block'}}>
        <img src={product.image} alt={product.name} style={{width:'100%',height:180,objectFit:'cover'}} />
      </a>
      <div style={{padding:12}}>
        <h3 style={{margin:'0 0 8px',color:'var(--rr-text)'}}>{product.name}</h3>
        <p style={{margin:0,color:'var(--rr-muted)'}}>${product.price.toFixed(2)}</p>
        <div style={{display:'flex',justifyContent:'space-between',marginTop:12}}>
          <a href={`#/product/${product.id}`} className="rr-icon">View</a>
          <button onClick={() => onAdd(product)} style={{background:'var(--rr-accent)',border:'none',color:'#fff',padding:'8px 12px',borderRadius:6,cursor:'pointer'}}>Add to cart</button>
        </div>
      </div>
    </article>
  )
}

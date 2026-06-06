import React from 'react'
import products from '../../assets/products'

export default function ProductDetail({ id, onAdd }) {
  const product = products.find((p) => p.id === id)
  if (!product) return <p>Product not found</p>

  return (
    <article>
      <h2>{product.name}</h2>
      <div style={{display:'grid',gridTemplateColumns:'1fr 320px',gap:20}}>
        <img src={product.image} alt={product.name} style={{width:'100%',height:360,objectFit:'cover',borderRadius:8}} />
        <div style={{background:'var(--rr-bg)',padding:16,borderRadius:8,boxShadow:'var(--rr-shadow)'}}>
          <p style={{color:'var(--rr-muted)'}}>{product.description}</p>
          <p style={{fontWeight:700,fontSize:18}}>${product.price.toFixed(2)}</p>
          <button onClick={() => onAdd(product)} style={{background:'var(--rr-accent)',border:'none',color:'#fff',padding:'10px 14px',borderRadius:8,cursor:'pointer'}}>Add to cart</button>
        </div>
      </div>
    </article>
  )
}

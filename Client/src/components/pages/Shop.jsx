import React from 'react'
import products from '../../assets/products'
import '../ui/ProductCard'
import ProductCard from '../ui/ProductCard'

export default function Shop({ onAdd }) {
  return (
    <section>
      <h2>Shop All Rugs</h2>
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))',gap:16,marginTop:16}}>
        {products.map((p) => (
          <ProductCard key={p.id} product={p} onAdd={onAdd} />
        ))}
      </div>
    </section>
  )
}

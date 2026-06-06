import React from 'react'

export default function Cart({ items, onRemove, onClear }) {
  const total = items.reduce((s,i)=>s + i.price * i.qty, 0)
  return (
    <section>
      <h2>Your Cart</h2>
      {items.length === 0 ? <p>Your cart is empty.</p> : (
        <div>
          <ul>
            {items.map((it) => (
              <li key={it.id} style={{display:'flex',justifyContent:'space-between',padding:8,background:'var(--rr-bg)',marginBottom:8,borderRadius:6}}>
                <div>
                  <strong>{it.name}</strong>
                  <div style={{color:'var(--rr-muted)'}}>Qty: {it.qty}</div>
                </div>
                <div>
                  <div>${(it.price*it.qty).toFixed(2)}</div>
                  <button onClick={() => onRemove(it.id)} style={{marginTop:8}}>Remove</button>
                </div>
              </li>
            ))}
          </ul>
          <div style={{marginTop:12,fontWeight:700}}>Total: ${total.toFixed(2)}</div>
          <div style={{marginTop:12}}>
            <button onClick={onClear} style={{background:'var(--rr-accent)',color:'#fff',border:'none',padding:10,borderRadius:6}}>Clear Cart</button>
          </div>
        </div>
      )}
    </section>
  )
}

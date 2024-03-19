import React, { useState } from 'react'
import './index.css'

export const HomeButtons = ({totalTax}) => {

  const [cart, setCart] = useState([])

  function clearCart() {
    fetch('http://localhost:80/controllers/orderController.php', {
        method: "DELETE"
    })
    .then((res) => res.json())
    .then((data) => {
        alert('cart cleared');
        //setCart([]);
        //this.totalPlusTax();
    })
    .catch((error) => console.log(error))
}

function updateStock() {
  fetch("http://localhost:80/controllers/orderController.php", {
      method: "UPDATE"
  })
  .then((res) => res.json())
  .then((data) => {
      alert('stock updated');
  })
  .catch((error) => console.log(error))
  location.reload();
}

function placeOrder() {
  fetch('http://localhost:80/controllers/copyController.php', {
      method: "POST",
      body: new URLSearchParams({
          finish_order: true,
          tax: totalTax
      })
  })
  .then((res) => res.json())
  .then((data) => {
      if (data.success) {
          //updateStock();
          clearCart();
          //this.totalPlusTax();
          //this.clear()
          alert('deu certo :)');
      } else {
          alert("Failed to place order: " + data.error);
      }
  })
  .catch((error) => console.log(error));
} 


  return (
    <div className='homeButtonsContainer'>
        <button className='finishOrder' onClick={placeOrder}>Finish</button>
        <button className='cancelOrder' onClick={clearCart}>Cancel</button>
    </div>
  )
}

import React, { useEffect, useState } from 'react'
import { HomeButtons } from '../HomeButtons'

export const CartDetails = () => {

  const [totalTax, setTotalTax] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    totalPlusTax()
  })

  function totalPlusTax() {
       var totalPrice = 0;
       var newTotalTax = 0;
      
      fetch("http://localhost:80/controllers/cartController.php")
      .then((res) => res.json())
      .then((data) => {
          data.forEach((item) => {
              totalPrice += item.amount * item.price;
              newTotalTax += item.amount * (item.price * (item.tax/100));
          })
          setTotalTax(newTotalTax);
          setTotalPrice(totalPrice);
      })
      .catch((error) => console.log(error))
  }


  return (
    <div className='cartDetailsContainer'>
        <br/>
        <p id='taxTxt'>Tax: ${totalTax.toFixed(2)}</p>
        <p id='totalTxt'>Total: ${(totalPrice + totalTax).toFixed(2)}</p>
        <HomeButtons totalTax={totalTax}/>
    </div>
  )
}

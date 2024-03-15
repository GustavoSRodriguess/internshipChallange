import React, { useEffect, useState } from "react"
import TableTemplate from "../../components/TableTemplate"
import FormTemplate from "../../components/FormTemplate";
import "./index.css"

import { CartDetails } from "../../components/CartDetails";

function Home(){

    const [tax, setTax] = useState('')
    const [price, setPrice] = useState('')
    const [cart, setCart] = useState([]);
    const [prodPopulated, setProdPopulated] = useState(false)
    //const [selectedProductCode, setSelectedProductCode] = useState('')

    //dnv, normal ficar com 2, acontece por cuasa do restrict mode
    useEffect(() => {
        showCart();
        //autoComplete();
        if(!prodPopulated){
            setProdPopulated(true);
            popProd()
        }
    }, [prodPopulated]);




    const columns = [
        {key: 'prod_name', title: 'Product'},
        {key: 'price', title: 'Unit Price'},
        {key: 'amount', title: 'Amount'},
        {key: 'total', title: 'Total'},
        //acho q esse aqui eu n salvava na tabe, mas 
        //ta aqui caso eu precise: {key: 'tax', title: 'Tax'}
    ];

    const cartFields = [
       // {name: 'prodTeste', type: 'text', placeHolder: 'TeStE dE Basosfdis'},
        {name: 'priceHome', type: 'number', placeHolder: 'Unit Price'},
        {name: 'amount', type: 'number', placeHolder: 'Amount'},
        {name: 'taxHome', type: 'number', placeHolder: 'Tax (%)'}
    ];
    function popProd(){
        fetch("http://localhost:80/controllers/prodController.php")
        .then((res) => res.json())
        .then((data) => {
            data.forEach((prod) => {
                const option = document.createElement('option');
                option.value = prod.code;
                option.text = prod.name;
                prod_code.appendChild(option);
            })
        })
        .catch((error) => console.log(error));
    }

    function autoComplete() {

        //var price = document.getElementById('price');
        //var tax = document.getElementById('tax');

        fetch("http://localhost:80/controllers/prodController.php")
        .then((res) => res.json())
        .then((data) => {
            const selectedProductCode = document.getElementById('prod_code').value;
            const selectedProduct = data.find(prod => prod.code == selectedProductCode);

            if(selectedProduct){
                setPrice(selectedProduct.price)
                setTax(selectedProduct.category_tax)
                // console.log(price)
                //price.value = selectedProduct.price;
                //tax.value = selectedProduct.category_tax;
                console.log(price)
                console.log(tax)
                price.disabled = true
                tax.disabled = true 


            }else{
                 console.log('eror');
            }         
        })
        .catch((error) => console.log(error))
    }

    function showCart() {
        fetch("http://localhost:80/controllers/cartController.php")
        .then((res) => res.json())
        .then((data) => {
            setCart(data);
        })
        .catch((error) => console.log(error))
    }

    function handleDelete(code){
        fetch(`http://localhost:80/controllers/cartController.php?code=${code}`, {
            method: 'DELETE'
        })
        .then((res) => res.json())
        .then((data) => {
            setCart(cart.filter((cart) => cart.code !== code))
        })
        .catch((error) => console.log(error))
    }

    function saveCart(formData){

        var totalRaw = price * formData.amount
        var total = totalRaw + (tax/100) * totalRaw
        var prod_code = document.getElementById('prod_code').value
        var form = new FormData();
        //deve ter algum outro jeito melhor de fazer isso mas eu n sei
        form.append('prod', prod_code);
        form.append('price', price);
        form.append('amount', formData.amount);
        form.append('total', total); //sinto q ese aqui vai mudar
        form.append('tax', tax);
    
        //try {
           // const isValid = await this.checkValue();
            //console.log(isValid)
           // if(isValid) {
        fetch('http://localhost:80/controllers/cartController.php', {
            method: "POST",
            body: form,
        })
        .then((res) => res.json())
        .then((data) => {
            showCart();
            clear()
        })
        .catch((error) => console.log(error))
               // this.show();
               // this.clear();
              //  this.totalPlusTax();
              //  this.updateStock();
           // } else {
              //  console.log('celta camaleao');
    }
        //} catch(error) {
            //console.log(error);
       // 

    function clear(){
        price = "";
        tax = '';
    }
    return(
        <div className="homeContainer">
            <div className="leftSide">
                <FormTemplate 
                 text='Welcome to the SuiteStore' 
                 fields={cartFields}
                 onSbubmit={saveCart}
                 autoComplete={autoComplete}
                 price={price}
                 tax={tax}
                />
            </div>
            <div className="rightSide">
                <TableTemplate data={cart} columns={columns} handleDelete={handleDelete}/>
                <CartDetails/>
            </div>
        </div>
    )
}

export default Home
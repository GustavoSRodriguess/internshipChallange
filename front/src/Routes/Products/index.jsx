import React, { useEffect, useState } from "react";
import './index.css';
import TableTemplate from "../../components/TableTemplate";
import FormTemplate from "../../components/FormTemplate";

function populateCategories() {
    fetch("http://localhost:80/controllers/categoryController.php")
    .then((res) => res.json())
    .then((data) => {
        data.forEach((category) => {
            const option = document.createElement('option');
            option.value = category.code; 
            option.text = category.name; 
            category_code.appendChild(option);
        });
    })
    .catch((error) => console.log(error));
};

function Products() {

    const [products, setProdcuts] = useState([]);
    const [categoriesPopulted, setCategoriesPopulted] = useState(false)

    //é normal aparecer duplicado as coias por causa do react strict mode,
    // ele roda todo o codigo duas vezes para para procurar erros, em prod,
    //isso nao vao contecer 
    useEffect(() => {
        showProducts()
        if(!categoriesPopulted){
           setCategoriesPopulted(true) 
           populateCategories()
            console.log('chegou aqui')
        }
    }, [categoriesPopulted])

 

    const columns = [
        {key: 'name',  title: 'Product name'},
        {key: 'price', title: 'Price'},
        {key: 'amount', title: 'Amount'},
        {key: 'category_name', title: 'Category'}
    ]

    const productFields = [
        {name: 'name', type: 'text', placeHolder: 'Product name'},
        {name: 'price', type: 'number', placeHolder: 'Unit price'},
        {name: 'amount', type: 'number', placeHolder: 'Amount in stock'},
        //{name: 'category_code', type: 'select', placeHolder: 'Category'}
    ];

    function showProducts(){
        fetch("http://localhost:80/controllers/prodController.php")
        .then((res) => res.json())
        .then((data) => {
            setProdcuts(data)
        })
        .catch((error) => console.log(error));
    }

    function handleDelete(code){
        fetch(`http://localhost:80/controllers/prodController.php?code=${code}`, {
            method: "DELETE",
        })
        .then((res) => res.json())
        .then((data) => {
            alert("tiem deleted");
            setProdcuts(products.filter((product) => product.code !== code))
        })
        .catch((error) => console.log(error))
    }

    function saveProduct(formData){ 
        var category_code = document.getElementById('category_code').value
        var form = new FormData();
        form.append('name', formData.name);
        form.append('price', formData.price);
        form.append('amount', formData.amount);
        form.append('category_code', category_code);
        console.log(category_code)
        console.log(formData.name)
        fetch("http://localhost:80/controllers/prodController.php", {
            method: "POST",
            body: form,
        })
        .then((res) => res.json())
        .then((data) => {
            showProducts();
        })
        .catch((error) => console.log(error))
    }
    
  return (
    <div  className="prodContainer">
        <div className="leftSide">
            <FormTemplate text='Add a product' fields={productFields} onSbubmit={saveProduct}/>
        </div>
        <div className="rightSide">
            <TableTemplate data={products} columns={columns} handleDelete={handleDelete}/>
        </div>

    </div>
  )
}

export default Products

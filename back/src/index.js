document.addEventListener("DOMContentLoaded", function() {
    cart.totalPlusTax();
    //document.getElementById('prod').addEventListener('click', cart.autoComplete);
})
//eu poderia só terusado o localStorage aqui acho q se pah dava melor,
//pelo menos a parte do carrinho 
const cart = new(function(){
    this.tbody = document.getElementById('tbody');
    this.prod = document.getElementById('prod');
    this.tax = document.getElementById('tax');
    this.price = document.getElementById('price');
    this.amount = document.getElementById('amount');

    this.popProd = () => {
        fetch("../controllers/prodController.php")
        .then((res) => res.json())
        .then((data) => {
            data.forEach((prod) => {
                const option = document.createElement('option');
                option.value = prod.code;
                option.text = prod.name;
                this.prod.appendChild(option);
            })
        })
        .catch((error) => console.log(error));
    }

    this.autoComplete = () => {
        fetch("../controllers/prodController.php")
        .then((res) => res.json())
        .then((data) => {
            const selectedProductCode = this.prod.value;
            const selectedProduct = data.find(prod => prod.code == selectedProductCode);

            if(selectedProduct){
                this.price.value = selectedProduct.price;
                this.tax.value = selectedProduct.category_tax;
            }else{
                 console.log('eror');
            }         
        })
        .catch((error) => console.log(error))
    }

    this.checkValue = (callback) => {
        fetch('../controllers/prodController.php')
        .then(res => res.json())
        .then((data) => {
            const insertAmount = this.amount.value;
            const prodSelect = this.prod.value
            const findProd = data.find(prod => prod.code == prodSelect);

            if(findProd && insertAmount <= findProd.amount){
                    console.log('tudo certo')
                    callback(true)
            }else{
                var sub = parseInt(insertAmount) - parseInt(findProd.amount);
                alert(`Too many items, remove ${sub} items` )
                callback(false)
            }
        })
        .catch((error) => {console.log(error); callback(false)})
    }

    this.show = () => {
        fetch("../controllers/cartController.php")
        .then((res) => res.json())
        .then((data) => {
            this.tbody.innerHTML = "";
            data.forEach((item) => {
                //os nome é td place holder, provavel q mude td
                this.tbody.innerHTML += `
                <tr>
                    <td>${item.prod_name}</td>
                    <td>$${item.price}</td>
                    <td>${item.amount} u</td>
                    <td>$${item.total}</td>
                    <td><button href='javascript:;' class='btnDel' onclick='cart.delItem(${item.code})'>Delete</button></td>
                </tr>
                `
            })
        })
    }
    //mds desliguei meu cerebro 
    this.saveOrder = () => {

        var totalRaw = parseFloat(this.price.value) * parseFloat(this.amount.value)
        console.log(totalRaw)
        
        this.total = parseFloat(totalRaw) + (parseFloat(this.tax.value) / 100) * totalRaw;
        
        var form = new FormData();

        form.append('prod', this.prod.value);
        form.append('price', this.price.value);
        form.append('amount', this.amount.value);
        form.append('total', this.total);
        form.append('tax', this.tax.value);

        this.checkValue((isValid) => {
            if(isValid){
                fetch('../controllers/cartController.php', {
                    method: "POST",
                    body: form,
                })
                .then((res) => res.json())
                .then((data) => {
                    this.show();
                    //this.clear();
                    this.totalPlusTax();
                })
                .catch((error) => console.log(error))   
            }else{
                console.log('celta camaleao')
            }
        })
        //console.log(this.checkValue())
    }

    var totalTax = 0;
    var totalPrice = 0;
    var totalBuy = totalPrice + totalTax; 
    document.getElementById('totalTxt').innerText = "Total: $";
    document.getElementById('taxTxt').innerText = "Tax: $";
    this.totalPlusTax = () => {

        fetch("../controllers/cartController.php")
        .then((res) => res.json())
        .then((data) => {
            data.forEach((item) => {
                totalPrice += item.amount * item.price;
                totalTax += item.amount * (item.price * (item.tax/100));
            })
            var totalBuy = totalPrice + totalTax;
            document.getElementById('totalTxt').innerText = "Total: $" + totalBuy.toFixed(2);
            document.getElementById('taxTxt').innerText = "Tax: $" + totalTax.toFixed(2);
        })
        .catch((error) => console.log(error))

    }

    this.delItem = (code) => {
        var form = new FormData();
        form.append('code', code);
        fetch("../controllers/cartController.php", {
            method: "POST",
            body: form
        })
        .then((res) => res.json())
        .then((data) => {
            alert("Item deleted");
            this.show();
            this.totalPlusTax();
        })
        .catch((error) => console.log(error))
    }

    this.placeOrder = () => {
        /* var form = new FormData()
        //form.append('total', totalBuy);
        form.append('tax', totalTax);
        fetch('../controllers/orderController.php', {
            method: "POST",
            body: form
        })
        .then((res) => res.json())
        .then((data) => {
            alert("teste");
            this.updateStock();
            this.clearCart();
            this.show();
            this.totalPlusTax();
        })
        .catch((error) => console.log(error))  */
        fetch('../../controllers/copyController.php', {
            method: "POST",
            body: new URLSearchParams({
                finish_order: true,
                tax: totalTax
            })
        })
        .then((res) => res.json())
        .then((data) => {
            if (data.success) {
                this.updateStock();
                this.clearCart();
                this.totalPlusTax();
                this.clear()
            } else {
                alert("Failed to place order: " + data.error);
            }
        })
        .catch((error) => console.log(error));
    } 

    this.clearCart = () => {
        fetch('../controllers/orderController.php', {
            method: "DELETE"
        })
        .then((res) => res.json())
        .then((data) => {
            alert('cart cleared');
            this.show();
            this.totalPlusTax();
        })
        .catch((error) => console.log(error))
    }

    this.updateStock = () => {
        fetch("../controllers/orderController.php", {
            method: "UPDATE"
        })
        .then((res) => res.json())
        .then((data) => {
            alert('stock updated');
        })
        .catch((error) => console.log(error))
    }

    this.clear = () => {
        this.amount.value = '';
        this.prod.value = '';
        this.tax.value = '';
        this.price.value = '';
        document.getElementById('totalTxt').innerText = "Total: $0.00";
        document.getElementById('taxTxt').innerText = "Tax: $0.00";
    }
})
cart.popProd();
cart.show();

/* //mesmo codigo em 3 arquivos, estou a coringar 
//var arr = new Array() 
//var arr = JSON.parse(localStorage.getItem("localprod"))

document.addEventListener("DOMContentLoaded", function() {
    showData();
    populateprods();
    document.getElementById('prod').addEventListener('change', fillValue);
    console.log(arr);
    //deleteRow0()
    //document.getElementById('btnFinish').addEventListener('click', showDataHistory)
});

var arr = new Array();

function getData(){
    var str = localStorage.getItem('localCart');
    if(str != null){
        arr = JSON.parse(str);
        console.log(str);
        console.log(arr);
    }
}

function addData(){
    getData();
    checkZero();
    checkDuplicate();
   
    var totalRow = 0;
    var prodAmount = document.forms['shopForm']['amount'].value;
    var prodUinitPrice = document.forms['shopForm']['price'].value;
    var totalRow = prodAmount * prodUinitPrice;

    arr.push({
        //codePurchase: Math.floor(Math.random()*999) + 1,
        total: totalRow,
        prodName: document.getElementById('prod').value,
        prodAmount: document.getElementById('amount').value,
        prodUnitPrice: document.getElementById('price').value,
        tax: document.forms['shopForm']['tax'].value,
        date: new Date().toLocaleDateString()
    });
    localStorage.setItem('localCart', JSON.stringify(arr));
    showData();
    deleteRow0();
}

function checkDuplicate(){
    var prod = document.getElementById('prod').value;
    var arr = JSON.parse(localStorage.getItem('localCart')) || [];

    for(i=0;i<arr.length;i++){
        if(prod == arr[i].prodName){
            console.log(prod);
            console.log(arr[i].prodName);
            alert('prod alredy in the cart');
            Exit();
        }
    }
}

function showData(){
    getData();

    var tbl = document.getElementById("prodTable");

    var x = tbl.rows.length;
    while(--x){
        tbl.deleteRow(x);
    }

    var totalSum = 0;
    var totalTax = 0;
    console.log(arr);

    for(i=0;i<arr.length;i++){
        var r = tbl.insertRow();
        var cell1 = r.insertCell();
        var cell2 = r.insertCell();
        var cell3 = r.insertCell();
        var cell4 = r.insertCell();
        var cell5 = r.insertCell();

        var total = arr[i].prodUnitPrice * arr[i].prodAmount;
        var taxPercentage = parseFloat(arr[i].tax);
        var tax = total * (taxPercentage/100);
        totalSum += total;
        totalTax += tax;

        cell1.innerHTML = arr[i].prodName;
        cell2.innerHTML = "$" + arr[i].prodUnitPrice;
        cell3.innerHTML = arr[i].prodAmount;
        cell4.innerHTML = "$" + total;

        var btn = document.createElement('button');
        btn.className = 'btnDel';
        btn.innerHTML = '<i class="fa-regular fa-trash-can"></i>';
        //btn.value = 'Delete'
        btn.setAttribute('data-index', i);
        btn.addEventListener('click', function() {
            deleteRow(this.getAttribute('data-index'));
        });
        //btn.onclick = deleteRow() 
        cell5.appendChild(btn);
    }
    var totalPrice = totalSum + totalTax;
    document.getElementById('totalTxt').innerText = "Total: $" + totalPrice.toFixed(0);
    document.getElementById('taxTxt').innerText = "Tax: $" + totalTax.toFixed(0);
}

function deleteRow(index){
    getData();
    arr.splice(index, 1);
    localStorage.setItem('localCart', JSON.stringify(arr));
    showData();
}

//por enquanto fica na gambiarra isso aqui, depois tento arrumar o bug
function deleteRow0(){
    getData();
    if(arr[0].code){
        arr.splice(0,arr.length - 1);
        localStorage.setItem('localCart', JSON.stringify(arr));
        showData();
    }
}

function populateprods() {
    var prods = getprods();
    var selectElement = document.getElementById("prod");

    selectElement.innerHTML = "";

    var defaultOption = document.createElement("option");
    defaultOption.value = "";
    defaultOption.text = "prod";
    defaultOption.disabled = true;
    defaultOption.selected = true;
    selectElement.appendChild(defaultOption);

    prods.forEach(function(prod) {
        var option = document.createElement("option");
        option.value = prod;
        option.text = prod;
        selectElement.appendChild(option);
    })
}

function getprods() {
    var prods = [];
    var arrProd = JSON.parse(localStorage.getItem("localprod"));
    if (arrProd) {
        arrProd.forEach(function(item) {
            if (!prods.includes(item.prodName)) {
                prods.push(item.prodName);
            }
        });
    }
    return prods;
}

function findTax(catName){
    var categoryData = JSON.parse(localStorage.getItem("localData"));
    console.log(categoryData);
    
    var categoryTax = categoryData.find(item => item.catName === catName);

    if(categoryTax){
        return categoryTax.tax;
    }
}

function fillValue(){
    var opt = document.getElementById('prod').value;
    arr = JSON.parse(localStorage.getItem('localprod'));
    var prodData = arr.find(prod => prod.prodName == opt);

    if(prodData){
        document.getElementById('price').value = prodData.prodUnitPrice;

        var prodCategory = prodData.category;
        
        var tax = findTax(prodCategory);
        document.getElementById('tax').value = tax;
    }
}

//n sei pq usei função de flecha
const checkZero = () => {
    var prodAmount = document.forms['shopForm']['amount'].value;
    if(prodAmount == 0){
        alert('Please enter an amount greater than 0');
        Exit();
    }
}



//HISTORICO, PQ N CRIEIUM NOVO ARQUIVO? BOA PERGUNTA



var city = ' ';

getCoordinates();

function addDataHistory(){
    getDataHistory();
   
    var arr = JSON.parse(localStorage.getItem('localCart'));
    var newArr = JSON.parse(localStorage.getItem('localHistory'));
    var tbl = document.getElementById("prodTable");
    var x = tbl.rows.length;
    var purchaseCode = generatePurchaseCode();

    if (!Array.isArray(newArr)) {
        newArr = [];
    }

    while(--x){
        tbl.deleteRow(x);
    }

    var totalSum = 0;
    var totalTax = 0;
    var totalPay = 0;

    for(var i = 0; i < arr.length; i++){
        var x = parseInt(arr[i].prodUnitPrice, 10);
        var y = parseInt(arr[i].prodAmount, 10);
        var z = parseInt(arr[i].tax, 10);

        var total = x * y;
        var taxPercentage = z;
        var tax = total * (taxPercentage/100);
        totalSum += total;
        totalTax += tax;
        totalPay = totalSum + totalTax;
    }

    newArr.push({
        codePurchase: purchaseCode,
        totalPurchase: totalPay.toFixed(0),
        tax: totalTax.toFixed(0),
        date: new Date().toLocaleDateString(),
        cidade: city,
        cart: arr,
    })
    if(validatePurchase() == true){localStorage.setItem('localHistory', JSON.stringify(newArr));}
}

function validatePurchase() {
    var cart = JSON.parse(localStorage.getItem('localCart')) || [];
    var prods = JSON.parse(localStorage.getItem('localprod')) || [];

    console.log('Cart Items:', cart);
    console.log('Local prods:', prods);

    if (!Array.isArray(cart) || !Array.isArray(prods)) {
        alert("Cart items or prods are not valid arrays.");
        return;
    }

    for (var i = 0; i < cart.length; i++) {
        var cartItem = cart[i];

        console.log('Processing cart item:', cartItem.prodName);

        var cartprodName = cartItem.prodName.trim();
        var prod = prods.find(p => p.prodName === cartprodName);

        if (prod) {
            // Convert prodAmount to number
            var availableQuantity = parseInt(prod.prodAmount, 10);
            var requestedQuantity = parseInt(cartItem.prodAmount, 10);

            if (requestedQuantity > availableQuantity) {
                alert('Insufficient stock for prod:', cartprodName);
                return false;
                //Exit()
            }else{
                prod.prodAmount -= requestedQuantity;
            }
        } else {
            alert("prod not found in localprods:", cartprodName);
        }
    }
    localStorage.setItem('localprod', JSON.stringify(prods));
    console.log('updated localprod ', prods);
    return true
}

function getDataHistory(){
    var str = localStorage.getItem('localHistory');
    if(str != null){
        newArr = JSON.parse(str);
    }
}

//tenho q colocar isso no resto, mas se eu for usar bd depois nem vo me incomodar
function generatePurchaseCode() {
    var purchaseCodeCounter = parseInt(localStorage.getItem('purchaseCodeCounter')) || 0;

    purchaseCodeCounter++;

    localStorage.setItem('purchaseCodeCounter', purchaseCodeCounter);

    return purchaseCodeCounter;
}

//pq? sla só achei q seria legal ter :)
function getCoordinates() {
    var options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
    };

    function success(pos) {
        var crd = pos.coords;
        var lat = crd.latitude.toString();
        var lng = crd.longitude.toString();
        var coordinates = [lat, lng];
        console.log(`Latitude: ${lat}, Longitude: ${lng}`);
        getCity(coordinates);
    }

    function error(err) {
        console.warn(`ERROR(${err.code}): ${err.message}`);
    }

    navigator.geolocation.getCurrentPosition(success, error, options);
}

function getCity(coordinates) {
    var xhr = new XMLHttpRequest();
    var lat = coordinates[0];
    var lng = coordinates[1];
 
    xhr.open('GET', "https://us1.locationiq.com/v1/reverse.php?key=pk.0d6a4ee59d60e0c5a5f09ccb9024a5a1&lat=" +
        lat + "&lon=" + lng + "&format=json", true);
    xhr.send();
    xhr.onreadystatechange = processRequest;

    function processRequest() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var response = JSON.parse(xhr.responseText);
            city = response.address.city;
            console.log(city)
        }
    }
} */
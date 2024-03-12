const history = new (function(){
    
});

const openModalButton = document.querySelectorAll('[data-modal-target]');
const closeModalButton = document.querySelectorAll('[data-close-button]');
const overlay = document.getElementById('overlay');

openModalButton.forEach(button => {
    button.addEventListener('click', () => {
        const modal = document.querySelector(button.dataset.modalTarget);
        const orderId = button.closest('tr').querySelector('td:first-child').innerText;
        console.log(orderId);
        fetch(`../../controllers/historyController.php?orderId=${orderId}`)
        .then(res => res.json())
        .then(data => {
            const modalBody = modal.querySelector('.modal-body');
            modalBody.innerHTML = '';
            data.forEach((item) => {
                modalBody.innerHTML += `
                <div><b>Product name</b>: ${item.name}</div>
                <div><b>Amount</b>: ${item.amount} u</div>
                <div><b>Price</b>:$ ${item.price}</div>
                <div><b>Tax</b>: ${item.tax}%</div>
                </br>
                `;
            });
            openModal(modal) 
        })
        .catch(error => console.log(error));
    });
});

overlay.addEventListener('click', () => {
    const modals = document.querySelectorAll('.modal.active')
    modals.forEach(modal => {
        closeModal(modal);
    })
})

closeModalButton.forEach(button => {
    button.addEventListener('click', () => {
        const modal = button.closest('.modal');
        closeModal(modal) 
    })
})

function openModal(modal){
    if(modal == null) return
    modal.classList.add('active');
    overlay.classList.add('active')
}

function closeModal(modal){
    if(modal == null) return
    modal.classList.remove('active');
    overlay.classList.remove('active')
}

/* document.addEventListener("DOMContentLoaded", function() {
    showDataHistory();
});

function showDataHistory(){
    getDataHistory();

    var tbl = document.getElementById("historyTable");
    var x = tbl.rows.length;
    while(--x){
        tbl.deleteRow(x);
    }

    for(var i = 0; i < newArr.length; i++){
        var r = tbl.insertRow();
        var cell1 = r.insertCell();
        var cell2 = r.insertCell();
        var cell3 = r.insertCell();
        var cell4 = r.insertCell();

        cell1.innerHTML = newArr[i].codePurchase;
        cell2.innerHTML = newArr[i].tax;
        cell3.innerHTML = newArr[i].totalPurchase;

        var btn = document.createElement('button');
        //btn.type = 'button';
        btn.className = 'btnView';
        btn.innerHTML = '<i class="fa-regular fa-eye"></i>'
        //btn.value = 'View';
        btn.setAttribute('data-index', i); 
        btn.addEventListener('click', function() {
            var index = this.getAttribute('data-index');
            showDetails(index); 
        });
        cell4.appendChild(btn);
    }
} 

function getDataHistory(){
    var str = localStorage.getItem('localHistory');
    if(str != null){
        newArr = JSON.parse(str);
    }
} 

function showDetails(index) {
    var existingRow = document.getElementById("detailsRow");
    if (existingRow) {
        existingRow.remove(); 
    }

    var purchaseDetails = newArr[index]; 
    var tbl = document.getElementById("historyTable");
    var newRow = tbl.insertRow(parseInt(index) + 1); 
    newRow.id = "detailsRow";

    // cell purchase 
    var detailsCell = newRow.insertCell(0); 
    detailsCell.colSpan = 1;

    // cell cart 
    var cartCell = newRow.insertCell(1);
    cartCell.colSpan = 2;

    var detailsHTML = "<strong>Code:</strong> " + purchaseDetails.codePurchase + "<br>";
    detailsHTML += "<strong>Total Purchase:</strong> $" + purchaseDetails.totalPurchase + "<br>";
    detailsHTML += "<strong>Tax:</strong> $" + purchaseDetails.tax + "<br>";
    detailsHTML += "<strong>Date:</strong> " + purchaseDetails.date + "<br>";
    detailsHTML += "<strong>City: </strong>" + purchaseDetails.cidade + "<br>";

    detailsCell.innerHTML = detailsHTML;

    // cart details
    var cartHTML = "<strong>Cart:</strong><br>";
    for (var i = 0; i < purchaseDetails.cart.length; i++) {
        cartHTML += "<strong>Product Name:</strong> " + purchaseDetails.cart[i].prodName + "<br>";
        cartHTML += "<strong>Amount:</strong> " + purchaseDetails.cart[i].prodAmount + "<br>";
        cartHTML += "<strong>Total:</strong> $" + purchaseDetails.cart[i].total + "<br><br>";
    }

    cartCell.innerHTML = cartHTML;
} */
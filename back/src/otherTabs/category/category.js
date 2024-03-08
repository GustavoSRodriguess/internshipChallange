/*
 function saveCategory(){
    var catName = document.getElementById('catName').value
    var tax = document.getElementById('tax').value

    var categoryName = localStorage.setItem('catName', catName)
    var taxa = localStorage.setItem('tax', tax)
}
*/

//mds vo ter q comentar literalemtne td nessa merda mas sla meio fds

const app = new (function(){
    this.tbody = document.getElementById('tbody');
    this.category = document.getElementById('name');
    this.tax = document.getElementById('tax');

    this.show = () => {
        fetch("../../controllers/categoryController.php")
        .then((res)=>res.json())
        .then((data)=>{
           this.tbody.innerHTML = " ";
            data.forEach((item) => {
                this.tbody.innerHTML += `
                <tr>
                    <td>${item.code}</td>
                    <td>${item.name}</td>
                    <td>${item.tax}%</td>
                    <td><button href="javascript:;" class='btnDel' onclick="app.delete(${item.code})">Delete</button></td>
                </tr>
            `;
            });
        })
        .catch((error)=> console.log(error));
    };

    this.save = () => {
        var form = new FormData();
        form.append("name", this.category.value);
        form.append("tax", this.tax.value);
 
        fetch("../../controllers/categoryController.php", {
            method: "POST",
            body: form,
        })
        .then((res) => res.json())
        .then((data) => {
            alert("Product saved");
            this.show();
            this.clean();
        })
        .catch((error)=> console.log(error))
    };

    this.delete = (code) => {
        var form = new FormData()
        form.append("code", code);
        fetch("../../controllers/categoryController.php", {
            method: "POST",
            body: form,
        })
        .then((res) => res.json())
        .then((data) => {
            alert("Item deleted");
            this.show();
        })
        .catch((error) => console.log(error));
    }

    this.clean = () => {
        this.category.value = '';
        this.tax.value = '';
    };
})();
app.show();

/* var arr = new Array()

const letters = /^[A-Za-z]*$/

function getData(){
    var str = localStorage.getItem('localData')
    if(str != null){
        arr = JSON.parse(str)
    }
}

function validateEmpty(){
    getData()
    //var cod = document.forms['formCategory']['code'].value 
    var cName = document.forms['formCategory']['catName'].value
    var tx = document.forms['formCategory']['tax'].value

    if((cName == null || cName == '') || (tx == null || tx == '')){
        alert('Please fill in all fields')
        Exit()
    }

    //depois vejo isso
    const catExists = arr.find(catName => JSON.stringify(catName.catName.toUpperCase()) == document.forms['formCategory']['catName'].value.toUpperCase())
    if(catExists){
        alert('Catgory Already exists')
        Exit()
    }
}

//KRL PORRAAAAAAAAAAAAAAAAAAA EU SÓ QUERIA GERR UM NUMERO ALEATORIO E Q FUNCIONASSE

function addData(){
    getData()
    validateEmpty()
    arr.push({
        //code: document.getElementById('code').value,
        code: Math.floor(Math.random()*999) + 1,
        catName: (document.getElementById('catName').value).replace(/</g, "&lt;").replace(/>/g, "&gt;"), //talvez da pra colocar aqui, é ele explode
        tax: document.getElementById('tax').value
    })//mds como n testei com as outras coisas 
    localStorage.setItem('localData', JSON.stringify(arr))
    showData();
}

function clearHTML(){
    var cat = JSON.parse(localStorage.getItem('localData'))
    for(i = 0; i < cat.length; i++){
        var catName = cat[i].catName
        if(catName){
            var aaa
        }
    }
}

function showData(){
    getData()

    var tbl = document.getElementById("tableCategory")

    var x = tbl.rows.length
    while(--x){
        tbl.deleteRow(x)
    }

    for(i=0;i<arr.length;i++){
        var catName = arr[i].catName

        var r = tbl.insertRow()
        var cell1 = r.insertCell()
        var cell2 = r.insertCell()
        var cell3 = r.insertCell()
        var cell4 = r.insertCell()

        cell1.innerHTML = arr[i].code
        cell2.innerHTML = catName //por algum motivo isso da erro, mas eleainda assim nao aparece na tabela, ent isso é uma win?
        cell3.innerHTML = arr[i].tax + "%"

        var btn = document.createElement('input')
        btn.type = 'button'
        btn.className = 'btnDel'
        btn.value = 'Delete'
        btn.setAttribute('data-index', i);
        btn.addEventListener('click', function() {
            deleteRow(this.getAttribute('data-index'));
        });
        //btn.onclick = deleteRow()
        cell4.appendChild(btn)
        
    }
}

function deleteRow(index){
    getData(); 
    arr.splice(index, 1); 
    localStorage.setItem('localData', JSON.stringify(arr)); 
    showData(); 
} */
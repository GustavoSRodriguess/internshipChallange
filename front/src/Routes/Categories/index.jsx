import FormTemplate from "../../components/FormTemplate"
import TableTemplate from "../../components/TableTemplate"
import "./index.css"
import React, {useEffect, useState} from "react"

function Categories(){

    const [categories ,setCategories] = useState([]);

    useEffect(() => {
        showCategories()
    }, [])



    const columns = [
        {key: 'name', title: 'Category Name'},
        {key: 'code', title: 'Code'},
        {key: 'tax', title: 'Tax (%)'},
    ];

    const categoryFields = [
        {name: 'name', type: 'text', placeHolder: 'Category Name'},
        {name: 'tax', type: 'number', placeHolder: 'Tax (%)'}
    ];

    function showCategories(){
        fetch("http://localhost:80/controllers/categoryController.php")
        .then((res) => res.json())
        .then((data) => {
            setCategories(data);
        })
        .catch((error) => console.log(error));
    }

    function saveCategory(formData){
        var form = new FormData();
        form.append("name", formData.name);
        form.append("tax", formData.tax);
 
        fetch("http://localhost:80/controllers/categoryController.php", {
            method: "POST",
            body: form
        })
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            showCategories()
        })
        .catch((error)=> console.log(error))
    }

    const handleDelete = (code) => {
        fetch(`http://localhost:80/controllers/categoryController.php?code=${code}`, {
            method: "DELETE",
        })
        .then((res) => res.json())
        .then((data) => {
            //console.log('category deleted: ', data)
            setCategories(categories.filter((category) => category.code !== code))
        })
        .catch((error) => console.log(error));
    }
    

    return(
        <div className="categoriesContainer">
            <div className="leftSide">
                <FormTemplate text='Add a category' fields={categoryFields} onSbubmit={saveCategory}/>
            </div>
            <div className="rightSide">
                <TableTemplate data={categories} columns={columns} handleDelete={handleDelete}/>
            </div>
        </div>
    )
}
export default Categories


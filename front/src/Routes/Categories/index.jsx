import FormTemplate from "../../components/FormTemplate"
import TableTemplate from "../../components/TableTemplate"
import "./index.css"
import React, {useEffect, useState} from "react"

function Categories(){

    const [categories ,setCategories] = useState([]);



    useEffect(() => {
        showCategories()
        
    })

    function showCategories(){
        fetch("http://localhost:80/controllers/categoryController.php")
        .then((res) => res.json())
        .then((data) => {
            setCategories(data);
        })
        .catch((error) => console.log(error));
    }

    function saveCategory(){
        var form = new FormData();
        form.append("name", this.state.name);
        form.append("tax", this.state.tax);
 
        fetch("http://localhost:80/controllers/categoryController.php", {
            method: "POST",
  
        })
        .then((res) => res.json())
        .then((data) => {

        })
        .catch((error)=> console.log(error))
    }

    return(
        <div className="categoriesContainer">
            <div className="leftSide">
                <FormTemplate onSubmit={(e) => e.preventDefault()}>
                    <input type="text" id="name" name="catName" placeholder="Category Name"/><br/>

                    <input type="number" id="tax" name="tax" placeholder="Tax (%)" step="0.1" min="0"/><br/>

                    <input type="submit" value="Add Category" id="submitBtn"/>
                </FormTemplate>
            </div>
            <div className="rightSide">
                <TableTemplate>
                    <thead>
                        <tr>
                            <th>Code</th>
                            <th>Category</th>
                            <th>Tax (%)</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody id="tbody">
                        {categories.map((category) => (
                            <tr key={category.code}>
                                <td>{category.code}</td>
                                <td>{category.name}</td>
                                <td>{category.tax}</td>
                                <td><button className="btnDel">Delete</button></td>
                            </tr>
                        ))}
                   </tbody>
                </TableTemplate>
            </div>
        </div>
    )
}
export default Categories


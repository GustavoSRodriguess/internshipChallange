import { useState } from "react"
import "./index.css"

function FormTemplate({fields, onSbubmit, text, autoComplete, price, tax}) {

    const [formData, setFormData] = useState({})

    const handleChange = (e) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            [e.target.name]: e.target.value
        }));
    };

    const handleSumit = (e) => {
        e.preventDefault();
        onSbubmit(formData);
        clearForm()
    }

    const clearForm = () => {
        const newFormData = {};
        fields.forEach((field) => {
            if(!field.autoComplete){
                newFormData[field.name] = '';
            }
        })
        setFormData(newFormData);
    }

    return(
        <div className="formContainer">
        <form className="formTemplate" onSubmit={handleSumit}>
            <h2 className="headerForm">{text}</h2>
            {window.location.pathname === '/home' && (
                     <select 
                     name='prod_code'
                     id='prod_code'
                     onChange={autoComplete}
                     >
                        <option value='' disabled selected>Product</option>
                    </select>
            )}

            {fields.map((field) => (
                <div key={field.name} className="buttonDiv">
                    <input
                    type={field.type}
                    name={field.name}
                    placeholder={field.placeHolder}
                    value={field.name === 'priceHome' ? price : field.name === 'taxHome' ? tax : formData[field.name] || ''}
                    onChange={handleChange}
                    id={field.name}
                    readOnly={field.name === 'priceHome' || field.name === 'taxHome'}
                    /><br/>
                </div>
                
            ))}
                {window.location.pathname === '/products' && (
                     <select 
                     name='category_code'
                     id='category_code'
                     >
                        <option value='' disabled selected>Category</option>
                    </select>
            )}
            <div className="submitDiv">
                <button className="submitBtn">Submit</button>
            </div>
            
        </form>
        </div>
    )
}

export default FormTemplate
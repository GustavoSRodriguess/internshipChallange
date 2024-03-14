import { useState } from "react"
import "./index.css"

function FormTemplate({fields, onSbubmit, text}) {

    const [formData, setFormData] = useState({})

    const handleChange = (e) => {
        setFormData({
            ...formData, 
            [e.target.name]: e.target.value
        });
    };

    const handleSumit = (e) => {
        e.preventDefault();
        onSbubmit(formData);
        setFormData({});
    }

    return(
        <div className="formContainer">
        <form className="formTemplate" onSubmit={handleSumit}>
            <h2 className="headerForm">{text}</h2>
            {fields.map((field) => (
                <div key={field.name} className="buttonDiv">
                    <input
                    type={field.type}
                    name={field.name}
                    placeholder={field.placeHolder}
                    value={formData[field.name] || ''}
                    onChange={handleChange}
                    id={field.name}
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
            <input type="submit" value="Submit" id='submitBtn'/>
        </form>
        </div>
    )
}

export default FormTemplate
import "./index.css"

function FormTemplate(props) {
    return(
        <form className="formTemplate">
            {props.children}
        </form>
    )
}

export default FormTemplate
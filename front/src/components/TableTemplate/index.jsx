import './index.css'
import React from 'react'

 function TableTemplate(props) {
    return (
        <table className='tableContainer'>       
                {props.children}
        </table>
    )
}

export default TableTemplate
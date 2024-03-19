import './index.css'
import React from 'react'

 function TableTemplate({data, columns, handleDelete, handleView}) {

    return (
        <table className='tableContainer'>
            <thead>
                <tr>
                    {columns.map((column) => (
                    <th key={column.key}>{column.title}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {data.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                        {columns.map((columns) => (
                            <td key={columns.key}>{row[columns.key]}</td>
                            
                        ))}

                        {window.location.pathname !== '/history' && (
                             <td><button className='btnDel' onClick={() => handleDelete(row.code)}>Delete</button></td>
                        )}

                        {window.location.pathname === '/history' && (
                            <td><button data-modal-target='#modal' onClick={() => handleView(row.code)} className='btnView'>View</button></td>
                        )}
                       
                    </tr>
                ))}
            </tbody>   
        </table>
    )
}

export default TableTemplate
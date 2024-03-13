import { Link } from 'react-router-dom'
import OpcoesHeader from "../OpcoesHeader"
import './index.css'

function Header(){
    return(
        <div className="headerContainer">
            <Link to='/' className='nameStore'>
                <h2 className='firstName'>Suite</h2> 
                <h2 className='secondName'>Store</h2>
            </Link>
            <OpcoesHeader/>
        </div>
    )
}   

export default Header
import { Link, useLocation, useNavigate } from 'react-router-dom'
import OpcoesHeader from "../OpcoesHeader"
import './index.css'

function Header(){

    const naviget = useNavigate()

    const location = useLocation()

    const isLoginOrRegisterRoute = () => {
      return location.pathname === '/' || location.pathname === '/register'
    }

    if(isLoginOrRegisterRoute() == true){
        return null;
    }

    function logOut(){
        localStorage.clear()
        localStorage.setItem("loginStatus", 'logged out');
        naviget('/');

    }

    return(
        <>
        <div className="headerContainer">
            <Link to='/home' className='nameStore' onClick={() => localStorage.clear()}>
                <h2 className='firstName'>Suite</h2> 
                <h2 className='secondName'>Store</h2>
            </Link>
            <OpcoesHeader/>  
            <div className='userLogout'>
             <p  className='logOut' onClick={logOut}>Log Out</p>
            </div>
        </div>

        
        </>
    )
}   

export default Header
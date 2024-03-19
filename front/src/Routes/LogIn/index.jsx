import React, { useEffect, useState } from 'react'
import './index.css'
import FormTemplate from '../../components/FormTemplate'
import { useNavigate } from 'react-router-dom'

export const LogIn = () => {

    const naviget = useNavigate()
    const [email, setEmail] = useState('');
    const [pwd, setPwd] = useState('');
    const [error, setError] = useState('');
    const [msg, setMsg] = useState('');

    useEffect(() => {
        let login = localStorage.getItem("login");
        if(login){
            naviget("/home")
        }
    })

    useEffect(() => {
        setTimeout(function(){
            setMsg('');
        })
    }, [])

    const teste =  <div className='registerDiv'><a target='_blanl' className='iForgor' href='https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley'>Forgot Password</a><a href='/register' className='registerBtn'>Register here</a></div>;
    const msgg = 'balls';

    const loginFields = [
        {name: 'email', type: 'text', placeHolder: 'Enter your email'},
        {name: 'pwd', type: 'password', placeHolder: 'Enter your password'}
    ];

    function submitLogin(formData){
        var form = new FormData()
        form.append('email', formData.email);
        form.append('pwd', formData.pwd);

        fetch('http://localhost:80/controllers/loginController.php', {
            method: 'POST',
            body: form
        })
        .then((res) => res.json())
        .then((data) =>{
            setTimeout(function(){
                console.log(data)
                if(data === 'Senha ou email incorreto' || data === 'Email não cadastrado'){
                    setMsg(data)
                }else{
                    localStorage.setItem("login", true);
                    setMsg('Bem vindo')
                    naviget("/home")
                }

            }, 2000)
        })
        .catch((error) => console.log(error))
    }



  return (
    <div className='loginContanier'>
        <FormTemplate 
        text='LogIn' 
        fields={loginFields} 
        onSbubmit={submitLogin}
        textFooter={teste}
        msg={
            error !== '' ?
            <span>{error}</span> :
            <span>{msg}</span>
            }/>
    </div>
  )
}

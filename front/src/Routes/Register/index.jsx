import React, { useState } from 'react'
import FormTemplate from '../../components/FormTemplate'
import { useNavigate } from 'react-router-dom';

export const Register = () => {

    const [msg, setMsg] = useState('');

    const naviget =  useNavigate();

    const registerFields = [
        {name: 'username', type: 'text', placeHolder: 'Insert your usrname'},
        {name: 'email', type: 'text', placeHolder: 'Insert your email'},
        {name: 'pwd', type: 'password', placeHolder: 'Insert your password'},
    ];

    const teste =  <div className='registerDiv'><a href='/' className='registerBtn'>Login here</a></div>;

    function saveUser(formData){
        var form = new FormData();
        form.append('username', formData.username);
        form.append('email', formData.email);
        form.append('pwd', formData.pwd);

        fetch('http://localhost:80/controllers/registerController.php', {
            method: "POST",
            body: form
        })
        .then((res) => res.json())
        .then((data) => {
            if(data === 'Email alresy in use'){
                setMsg(data)
            }else{
                console.log(data)
                naviget('/')
            }

        })
        .catch((error) => console.log(error))
    }

  return (
    <>
    <div className='registerContainer'>
        <FormTemplate msg={msg} text='Register' fields={registerFields} onSbubmit={saveUser} textFooter={teste}/>
    </div>
    </>
  )
}

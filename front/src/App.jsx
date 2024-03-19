import { useState } from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from './components/Header'
import './App.css'
import Categories from './Routes/Categories';
import  Products  from './Routes/Products';
import Home from './Routes/Home';
import { History } from './Routes/History';
import { LogIn } from './Routes/LogIn';
import { Footer } from './components/Footer';
import { Register } from './Routes/Register';
import { Protected } from './Routes/LogIn/Protected';

function App() {
  return (
    <div className='teste'>
    <BrowserRouter>
    <Header/>
      <Routes>
        <Route path='/' element={<LogIn/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/categories' element={<Protected Component={Categories}/>}/>
        <Route path='/products' element={<Protected Component={Products}/>}/>
        <Route path='/home' element={<Protected Component={Home}/>}/>
        <Route path='/history' element={<Protected Component={History}/>}/>
      </Routes>
    </BrowserRouter>
    </div>
  )
}

export default App
/*           <Route path='/products' element={<Products/>}/>
      <Route path='/categories' element={<Categories/>}/>
      <Route path='/history' element={<History/>}/> */
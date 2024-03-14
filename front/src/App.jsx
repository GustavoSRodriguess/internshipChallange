import { useState } from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from './components/Header'

import './App.css'
import Categories from './Routes/Categories';
import  Products  from './Routes/Products';
import Home from './Routes/Home';

function App() {

  return (
<div className='teste'>
  <BrowserRouter>
  <Header/>  
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/categories' element={<Categories/>}/>
      <Route path='/products' element={<Products/>}/>
      <Route path='/home' element={<Home/>}/>
    </Routes>
  </BrowserRouter>
</div>
  )
}

export default App
/*           <Route path='/products' element={<Products/>}/>
      <Route path='/categories' element={<Categories/>}/>
      <Route path='/history' element={<History/>}/> */
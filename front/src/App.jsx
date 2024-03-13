import { useState } from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Header from './components/Header'
import Home from './components/Home'
import './App.css'
import Categories from './Routes/Categories';

function App() {
  const [count, setCount] = useState(0)

  return (
<div className='teste'>
  <BrowserRouter>
  <Header/>  
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/categories' element={<Categories/>}/>

    </Routes>
  </BrowserRouter>
</div>
  )
}

export default App
/*           <Route path='/products' element={<Products/>}/>
      <Route path='/categories' element={<Categories/>}/>
      <Route path='/history' element={<History/>}/> */
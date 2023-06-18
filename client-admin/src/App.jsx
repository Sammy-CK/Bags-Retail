import { useState } from 'react'
import './App.css'
import {Routes, Route} from 'react-router-dom'
import LogInForm from './components/login/loginform';
import StoreCategoryPage from './components/store/storeCategoryPage';
import StoreIndividualCategoryPage from './components/store/storeIndividualCategoryPage'


function App() {
  return (
      <div>
        <Routes>
    <Route path='/' element={< LogInForm />} />
    <Route path='/store' element={< StoreCategoryPage />} />
    <Route path='/store/category/:categoryID' element={< StoreIndividualCategoryPage />} />


        </Routes>
      </div>
  )
}

export default App

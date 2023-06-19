import { useState } from 'react'
import './App.css'
import {Routes, Route} from 'react-router-dom'
import LogInForm from './components/login/loginform';
import StoreCategoryPage from './components/store/storeCategoryPage';
import StoreIndividualCategoryPage from './components/store/storeIndividualCategoryPage';
import StoreAssignBagShopPage from './components/store/storeAssignBagShopPage';
import StoreAddBagPage from './components/store/storeAddBagPage';
import AllShopsPage from './components/shop/allShopsPage';
import AddShopPage from './components/shop/addShopPage';



function App() {
  return (
      <div>
        <Routes>
    <Route path='/' element={< LogInForm />} />
    <Route path='/store' element={< StoreCategoryPage />} />
    <Route path='/store/category/:categoryID' exact element={< StoreIndividualCategoryPage />} />
    <Route path='/store/category/:categoryID/bags/:bagID' element={< StoreAssignBagShopPage />} />
    <Route path='/store/new' element={< StoreAddBagPage />} />
    <Route path='/shops' element={< AllShopsPage />} />
    <Route path='/shops/new' element={< AddShopPage />} />


        </Routes>
      </div>
  )
}

export default App

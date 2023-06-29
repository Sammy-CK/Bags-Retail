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
import ShopCategoryPage from './components/shop/shopCategoryPage';
import ShopIndividualCategoryPage from './components/shop/shopIndividualCategoryPage'
import AllStaffPage from './components/staff/allStaffPage';
import IndividualStaffPage from './components/staff/individualStaffPage';
import AddStaffPage from './components/staff/addStaffPage';
import AddCategoryPage from './components/category/addCategoryPage';
import SalesPage from './components/sale/salesPage';
import NavBar from './components/navbar/navBar';




function App() {
  return (
      <div className='site-div'>
        <NavBar />
        <Routes>
    <Route path='/' element={< LogInForm />} />
    <Route path='/store' element={< StoreCategoryPage />} />
    <Route path='/store/category/:categoryID' exact element={< StoreIndividualCategoryPage />} />
    <Route path='/store/category/:categoryID/bags/:bagID' element={< StoreAssignBagShopPage />} />
    <Route path='/store/new' element={< StoreAddBagPage />} />
    <Route path='/shops' element={< AllShopsPage />} />
    <Route path='/shops/new' element={< AddShopPage />} />
    <Route path='/shops/:shopID' element={< ShopCategoryPage />} />
    <Route path='/shops/:shopID/categories/:categoryID' exact element={< ShopIndividualCategoryPage />} />
    <Route path='/staffs' element={< AllStaffPage />} />
    <Route path='/staffs/:staffID' element={< IndividualStaffPage />} />
    <Route path='/staffs/new' element={< AddStaffPage />} />
    <Route path='/categories/new' element={< AddCategoryPage />} />
    <Route path='/sales' element={< SalesPage />} />

        </Routes>
      </div>
  )
}

export default App

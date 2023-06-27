import { useState } from 'react'
import './App.css'
import { useSelector } from 'react-redux'
import {Routes, Route, useNavigate} from 'react-router-dom'
import LogInPage from './components/login/logInPage'
import ShopCategoryPage from './components/shop/shopCategoryPage';
import ShopIndividualCategoryPage from './components/shop/shopIndividualCategoryPage'
import ShopSaleConfirm from './components/shop/shopSaleConfrim'

function App() {
  
  let takeShop = useNavigate()
  // let currShop = useSelector((state) => state.staff.staff.shop.id)


  return (
    <div>
      {/* <button onClick={() => takeShop(`/shops/${currShop}`)}>SHOP</button> */}
        <Routes>
    <Route path='/' element={< LogInPage />} />
    <Route path='/shops/:shopID' element={< ShopCategoryPage />} />
    <Route path='/shops/:shopID/categories/:categoryID' exact element={< ShopIndividualCategoryPage />} />
    <Route path='/shops/:shopID/categories/:categoryID/bags/:bagID/confirm' exact element={< ShopSaleConfirm />} />

        </Routes>
    </div>
  )
}

export default App

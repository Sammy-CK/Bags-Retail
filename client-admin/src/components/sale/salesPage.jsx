import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import NavBar from '../navbar/navBar';
import './salesPageStyle.css'

function SalesPage() {
  let token = useSelector((state) => state.staff.staff.jwt);
  let [soldBags, setSoldBags] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedShop, setSelectedShop] = useState('');
  let [currShops, setCurrShops] = useState([]);
  let [finalPriceArray, setFinalPriceArray] = useState([]);

  useEffect(() => {
    // Fetching categories
    fetch("https://bags-o7py.onrender.com/bags", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((resp) => {
      if (resp.ok) {
        return resp.json().then((data) => {
          setSoldBags(data.filter((data) => data.sold === true));
          console.log(data.filter((data) => data.sold === true));
        });
      } else {
        console.log("Thats CAP LIL'NIGGA");
      }
    });


    // Fetching shops
    fetch("https://bags-o7py.onrender.com/shops", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((resp) => {
      if (resp.ok) {
        return resp.json().then((data) => {
          setCurrShops(data.filter((data) => data.id !== 1));
          console.log(data.filter((data) => data.id !== 1));
        });
      } else {
        console.log("Thats CAP LIL'NIGGA");
      }
    });

  }, []);

  const filteredItems = soldBags.filter((item) => {
    const soldDate = new Date(item.sold_at);
    const soldMonth = soldDate.getMonth() + 1; // Months are zero-indexed
    const soldYear = soldDate.getFullYear();
    const shopID = item.shop.id;

    if (selectedMonth && selectedMonth !== `${soldYear}-${soldMonth.toString().padStart(2, '0')}`) {
      return false; // Filter by selected month if it's not empty and doesn't match the sold month
    }
    if (selectedShop && +selectedShop !== shopID) {
      return false; // Filter by selected shop if it's not empty and doesn't match the shop name
    }
    return true;
  });

filteredItems.reduce((acc, obj) => acc + obj.price, 0)


  const sortedItems = filteredItems.reduce((acc, item) => {
    const sold_at = item.sold_at.split("T")[0]; // remove time portion of sold_at string
    if (!acc[sold_at]) {
      acc[sold_at] = [];
    }
    acc[sold_at].push(item);
    return acc; 
  }, {});

  let currShopOptions = currShops.map(shop => {
    return(
      <option value={shop.id}>{shop.name}</option>
    )
  })

  const finalItems = Object.keys(sortedItems).map((sold_at) => {
    return (
      <ul className="category-ul" key={sold_at}>
        <h2 style={{paddingLeft:"40px"}}>{sold_at}</h2>
        <li className="sales-li cover">
          <p>BAG</p>
          <p>PRICE</p>
          <p>SHOP</p>
          <p>IMAGE</p>
        </li>
        {sortedItems[sold_at].map((item) => (
          <li className="sales-li" key={item.id}>
            <p>{item.name}</p>
            <p>{item.price}</p>
            <p>{item.shop.name}</p>
            <img className="sales-img" src={item.image_url} width="100px" height="100px"/>
          </li>
        ))}
      </ul>
    );
  });

  return (
    <div>
      <NavBar/>
      <h3>TOTAL: {filteredItems.reduce((acc, obj) => acc + obj.price, 0)}</h3>
      <form>
        <input type="month" value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)} />
        <select value={selectedShop} onChange={(e) => setSelectedShop(e.target.value)}>
          <option value="">All Shops</option>
          {currShopOptions}
          {/* Add more options for other shops */}
        </select>
      </form>
      {finalItems}
    </div>
  );
}

export default SalesPage;

import { React, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import NavBar from '../navbar/navBar';
import './salesPageStyle.css'

function SalesPage() {
  let token = useSelector((state) => state.staff.staff.jwt);
  let [soldBags, setSoldBags] = useState([]);

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
  }, []);

  const sortedItems = soldBags.reduce((acc, item) => {
    const sold_at = item.sold_at.split("T")[0]; // remove time portion of sold_at string
    if (!acc[sold_at]) {
      acc[sold_at] = [];
    }
    acc[sold_at].push(item);
    return acc; 
  }, {});

  const finalItems = Object.keys(sortedItems).map((sold_at) => {
    return (
      <ul className="category-ul" key={sold_at}>
        <h2 style={{paddingLeft:"40px"}}>{sold_at}</h2>
        <li className="sales-li cover"><p>BAG</p><p>PRICE</p><p>SHOP</p> <p>IMAGE</p> </li>
        {sortedItems[sold_at].map((item) => (
          <li className="sales-li" key={item.id}>
            <p>{item.name}</p>  <p>{item.price}</p> <p>{item.shop.name}</p> <img className="sales-img" src={item.image_url} width="100px" height="100px"/>
          </li>
        ))}
      </ul>
    );
  });

  return <div>
    <NavBar/>
    {finalItems}
    </div>;
}

export default SalesPage;

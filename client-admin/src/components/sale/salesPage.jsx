import { React, useState, useEffect } from 'react';
import { useSelector } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom';

function SalesPage(){

    let token = useSelector((state) => state.staff.staff.jwt)
    let [soldBags, setSoldBags] = useState([])


    useEffect(() => {
        // Fetching categories
        fetch("https://bags-o7py.onrender.com/bags", {
            method: "GET",
			headers: {
				Authorization: `Bearer ${token}`
            		 }
                }).then(resp => {           
            if (resp.ok){
                return resp.json().then(data => {

                    setSoldBags(data.filter(data => (data.sold === true) ))
                    console.log(data.filter(data => (data.sold === true) ))

                })
            }else{
                console.log("Thats CAP LIL'NIGGA")
            }
        })

    }, [])

    const sortedItems = soldBags.reduce((acc, item) => {
        const sold_at = item.sold_at.split('T')[0]; // remove time portion of sold_at string
        if (!acc[sold_at]) {
          acc[sold_at] = [];
        }
        acc[sold_at].push(item);
        return acc;
      }, {});
      
      const finalItems = Object.keys(sortedItems).map(sold_at => {
        return (
          <ul key={sold_at}>
            <h2>{sold_at}</h2>
            {sortedItems[sold_at].map(item => (
              <li key={item.id}>{item.name} - {item.price} - {item.shop.name}</li>
            ))}
          </ul>
        );
      });

    return (
    <div>
        {finalItems}
        </div>
    );

}

export default SalesPage;
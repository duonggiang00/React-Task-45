import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';

const url = "https://dummyjson.com/products";

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(1);
    const [limit, setLimit]= useState(6)
    const handlePage = (data)=>{
        return data==="next" ? page <=Math.ceil(194/limit) && setPage(page+1) : page > 1 && setPage(page-1);
    }
    const handleLimit = (e)=>{
        setLimit(+e.target.value)
    }
    const fetchAPI = async ()=>{
        const res = await fetch(`${url}?limit=${limit}&skip=${(page-1)*limit}`)
        const data = await res.json();
        setProducts(data.products);
    };
    useEffect(()=>{
        fetchAPI();
    },[page,limit])
    


   

  return (
    <div>
        <h1>Danh sach san pham</h1>
            <div className="filter">
                <select name="sort" id="sort">
                    <option value="">default</option>
                    <option value="asc">asc</option>
                    <option value="desc">desc</option>
                </select>
                <select name="limit" id="limit" onChange={handleLimit}>
                    <option value="6">6</option>
                    <option value="12">12</option>
                    <option value="20">20</option>
                </select>
            </div>
			<div>
				{products.map((item) => (
					<div key={item.id}>{item.title}</div>
				))}
			</div>
			<button onClick={() => handlePage("preview")}>preview</button>
			{page}
			<button onClick={() => handlePage("next")}>next</button>
    </div>
  )
}

export default ProductList
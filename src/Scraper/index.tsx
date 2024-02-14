import { useEffect, useState } from "react"
import { withProduct } from "../hooks/withProduct"

import './index.css';

import { Product } from "../types";
import { ProductBlock } from "../ProductBlock";
import { ProductForm } from "../ProductForm";
import { LoginForm } from "../LoginForm";

export const Scraper = () => {
  const [searchType, setSearchType] = useState('product')
  return (
    <div>
      <h5>Search By</h5>
      <div className="btnContainer">
        <a onClick={() => setSearchType('product')} className="btnBlue">Product Name</a>
        <a onClick={()=> setSearchType('login')} className="btnPurple">Order History</a>
      </div>
      {searchType === 'product' ? <ProductForm /> : <LoginForm />}
      
    </div>
  )
}
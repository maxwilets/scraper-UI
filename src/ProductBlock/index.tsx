import { Product } from "../types"

import './index.css';

export const ProductBlock = ({product, styleProp}: {product: Product, styleProp: string}) => (
    <div className={`productBlock bg-${styleProp}`}>
    
      <a href={`https://amazon.com${product.link}`} target="_blank"><h4>{product.title}</h4></a>
      
      <div className="imagePriceBlock">
        <img src={product.imageUrl} alt={product.title} />
        <p><b>{product.price != 'NaN' ? `$${product.price}` : null}</b></p>
      </div>
   
    </div>
)
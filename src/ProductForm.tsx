import { useEffect, useState } from "react";
import { Product } from "./types";
import { withProduct } from "./hooks/withProduct";
import { ProductBlock } from "./ProductBlock";

export const ProductForm = () => {
  const [formInput, setFormInput] = useState('');
  const [scrapeData, setScrapeData] = useState<Product[] | []>([])
  const [dataScraped, setDataScraped] = useState('false')

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setFormInput( event.target.value)
  }

  const handleSubmit = async() => {
    setDataScraped('false');
    const returnData: Product[] = await withProduct(formInput)
    setScrapeData(returnData)
    setDataScraped('true')
  }

  useEffect(() => {
    const newInput = scrapeData.filter((item) => item.title != '')
    setScrapeData(newInput)
  }, [dataScraped])

  return (
    <div>
      <div className='searchForm'>
        
        <input defaultValue='Email' type='email' value={formInput} onChange={ handleInput} />
        <button onClick={handleSubmit}>Search</button>
      </div>
      <div className="productsContainer">
        {scrapeData.length === 0 ?  <h4>The Product You Entered Does Not Exist</h4> : scrapeData.map((item, index) => {
          return index != 0 ? <ProductBlock styleProp={index % 2 === 0? 'light': 'dark'} key={`product-item-${index}`} product={item} />  : null 
        })}
      </div>
    </div>
  )
}
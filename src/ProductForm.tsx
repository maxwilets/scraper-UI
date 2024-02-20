import { useEffect, useState } from "react";
import { Product } from "./types";
import { withProduct } from "./hooks/withProduct";
import { ProductBlock } from "./ProductBlock";

export const ProductForm = () => {
  const [formInput, setFormInput] = useState('');
  const [scrapeData, setScrapeData] = useState<Product[]>([]);
  const [isFetching, setIsFetching] = useState(false);
  const [isRequestValid, setIsRequestValid] = useState<boolean | null>(null);

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setFormInput(event.target.value);
  };

  const handleSubmit = async () => {
    setIsFetching(true);
    setIsRequestValid(null); // Reset the validity state when a new request is initiated
    const returnData: Product[] = await withProduct(formInput);
    setScrapeData(returnData);
    setIsFetching(false);
    setIsRequestValid(returnData.length > 0); // Set the validity state based on the response
  };

  useEffect(() => {
    // Check if scrapeData has changed before filtering and updating it
    if (scrapeData.length > 0) {
      const newInput = scrapeData.filter((item) => item.title !== '');
      setScrapeData(newInput);
    }
  }, [scrapeData]);

  return (
    <div>
      <div className='searchForm'>
  
        <input type='text' value={formInput} onChange={handleInput} />
        <button onClick={handleSubmit}>Search</button>
      </div>
      <div className="productsContainer">
        {isFetching && <h4>Loading...</h4>}
        {!isFetching && isRequestValid === false && (
          <h4>The Product You Entered Does Not Exist</h4>
        )}
        {!isFetching && isRequestValid !== false && scrapeData.map((item, index) => {
          return index !== 0 ? (
            <ProductBlock styleProp={index % 2 === 0 ? 'light' : 'dark'} key={`product-item-${index}`} product={item} />
          ) : null;
        })}
      </div>
    </div>
  );
}

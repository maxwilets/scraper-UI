import { useState } from "react";

import { withLogin } from "./hooks/withLogin";
import { ProductBlock } from "./ProductBlock";
import { Product } from "./types";

export const LoginForm = () => {
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [scrapeData, setScrapeData] = useState<any| undefined>([])
  const [type, setType] = useState('amazon')
  const handleEmailInput = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setEmailInput(event.target.value);
  };

  const handlePasswordInput = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setPasswordInput(event.target.value);
  };

  const handleSubmit = async (): Promise<void> => {
    try {
      const returnData: Product[] | undefined = await withLogin(emailInput, passwordInput, type);
      if (returnData) {
        setScrapeData(returnData);
      } else {
        console.error('No data returned from login');
      }
    } catch (error) {
      console.error('Error occurred during login:', error);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    setType(event.target.value);
  };

  return (
    <div>
      <h2>{type}</h2>
      <div className='searchForm loginForm'>
        <div  className="dropdownBlock">
          <select value={type} onChange={handleInputChange}>
            <option>Amazon</option>
            <option>Capital One</option>
          </select>
        </div>
        <div className="inputBlock">
          <label>Email</label>
          <input type='email' value={emailInput} onChange={ handleEmailInput} />
        </div>
        <div className='inputBlock'>
          <label>Password</label>
          <input type='password' value={passwordInput} onChange={ handlePasswordInput} />
        </div>
        <button onClick={handleSubmit}>Search</button>
        </div>
      <div className="productsContainer">
        {scrapeData.map((item: any, index: number) => {
          return  <ProductBlock styleProp={index % 2 === 0? 'light': 'dark'} key={`product-item-${index}`} product={item} />
        })}
      </div>
    </div>
  )
}
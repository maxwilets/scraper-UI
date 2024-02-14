import { useState } from "react";

import { withLogin } from "./hooks/withLogin";
import { ProductBlock } from "./ProductBlock";

export const LoginForm = () => {
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [scrapeData, setScrapeData] = useState<any| undefined>([])

  const handleEmailInput = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setEmailInput( event.target.value)
  }
  const handlePasswordInput = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setPasswordInput( event.target.value)
  }

  const handleSubmit = async() => {
    const returnData: any[] | undefined = await withLogin(emailInput, passwordInput)
    setScrapeData(returnData)
    setEmailInput('')
    setPasswordInput('')
  }

  return (
    <div>
      <div className='searchForm loginForm'>
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
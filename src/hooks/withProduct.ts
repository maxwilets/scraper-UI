interface Product {
  title: string;
  price: string;
  imageUrl: string;
  link: string;
}

export const withProduct = async (product: string): Promise<Product[]> => {
  try {
    const response = await fetch(`http://localhost:5001/scrape?search_string=${product}`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error: ${error}`);
    throw error;
  }
};
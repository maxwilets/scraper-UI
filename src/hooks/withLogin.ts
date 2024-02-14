  export const withLogin = async (username: string, password: string,) => {
    try {
      const response = await fetch('http://localhost:5001/scrape', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }

      const data: any[] = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
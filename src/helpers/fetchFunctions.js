export const fetchAllCurrencies = async () => {
  const endPoint = 'https://economia.awesomeapi.com.br/json/all';
  try {
    const response = await fetch(endPoint);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

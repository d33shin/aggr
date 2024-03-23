import axios from 'axios'

async function getWonUsdExchangeRate() {
  const response = await axios.get(
    'https://api.exchangerate-api.com/v4/latest/USD'
  )
  const rate = response.data.rates.KRW
  return rate
}

export { getWonUsdExchangeRate }

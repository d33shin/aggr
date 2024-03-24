import axios from 'axios'

export default async () => {
  const response = await axios.get(
    'https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT'
  )
  return response.data.price
}

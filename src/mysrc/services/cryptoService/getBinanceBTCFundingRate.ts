import axios from 'axios'

export default async () => {
  const response = await axios.get(
    'https://fapi.binance.com/fapi/v1/premiumIndex?symbol=BTCUSDT'
  )
  return response.data.lastFundingRate
}

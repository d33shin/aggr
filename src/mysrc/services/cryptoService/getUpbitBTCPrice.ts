import axios from 'axios'

export default async () => {
  const response = await axios.get(
    'https://api.upbit.com/v1/ticker?markets=KRW-BTC'
  )
  return response.data[0].trade_price
}

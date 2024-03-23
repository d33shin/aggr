// services/CryptoService.js
import axios from 'axios'

const getBinanceBTCPrice = async () => {
  const response = await axios.get(
    'https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT'
  )
  return response.data.price
}

const getUpbitBTCPrice = async () => {
  const response = await axios.get(
    'https://api.upbit.com/v1/ticker?markets=KRW-BTC'
  )
  return response.data[0].trade_price
}

export { getBinanceBTCPrice, getUpbitBTCPrice }

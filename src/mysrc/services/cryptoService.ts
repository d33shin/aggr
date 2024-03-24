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

const getBinanceBTCCountdown = async () => {
  const response = await axios.get(
    'https://fapi.binance.com/fapi/v1/premiumIndex?symbol=BTCUSDT'
  )
  const nextFundingTime = new Date(response.data.nextFundingTime).getTime()
  const currentTime = new Date().getTime()
  const difference = nextFundingTime - currentTime

  const hours = Math.floor(difference / 1000 / 60 / 60)
    .toString()
    .padStart(2, '0')
  const minutes = Math.floor((difference / 1000 / 60) % 60)
    .toString()
    .padStart(2, '0')
  const seconds = Math.floor((difference / 1000) % 60)
    .toString()
    .padStart(2, '0')

  return `${hours}:${minutes}:${seconds}`
}

const getBinanceBTCFundingRate = async () => {
  const response = await axios.get(
    'https://fapi.binance.com/fapi/v1/premiumIndex?symbol=BTCUSDT'
  )
  return response.data.lastFundingRate
}

export {
  getBinanceBTCPrice,
  getUpbitBTCPrice,
  getBinanceBTCCountdown,
  getBinanceBTCFundingRate
}

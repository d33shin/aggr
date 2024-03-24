import axios from 'axios'

export default async () => {
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

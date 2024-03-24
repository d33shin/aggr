import axios from 'axios'

type FearAndGreedIndexResponse = {
  name: string
  data: Array<{
    value: string
    value_classification: string
    timestamp: string
    time_until_update: string
  }>
  metadata: {
    error: null | string
  }
}

const fetchFearAndGreedIndex = async (
  limit = 2
): Promise<FearAndGreedIndexResponse> => {
  const response = await axios.get<FearAndGreedIndexResponse>(
    `https://api.alternative.me/fng/?limit=${limit}`
  )
  return response.data
}

const calculateChangePercentage = (
  currentValue: number,
  previousValue: number
): number => {
  const difference = currentValue - previousValue
  const changePercentage = (difference / previousValue) * 100
  return parseFloat(changePercentage.toFixed(2))
}

export default async () => {
  try {
    const data = await fetchFearAndGreedIndex()
    if (data.data.length >= 2) {
      const [latest, previous] = data.data.map(d => parseInt(d.value, 10))
      const changePercentage = calculateChangePercentage(latest, previous)
      const status = data.data[0].value_classification
      return { latest, previous, changePercentage, status }
    } else {
      console.log('충분한 데이터를 받아오지 못했습니다.')
    }
  } catch (error) {
    console.error('공포와 탐욕 지수 정보를 가져오는 데 실패했습니다.', error)
  }
}

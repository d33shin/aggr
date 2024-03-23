<template>
  <div>
    <a
      class="link link-divider"
      href="http://discord.com/invite/XZ6fJTFNx7"
      target="_blank"
    >
      <img class="logo" src="/_img/logos/cointok_logo.png" alt="코인톡 로고" />
      <span class="logo-text">코인톡 바로가기</span></a
    >

    <a class="link" href="https://discord.com/invite/tWE7waTAnP" target="_blank"
      >거래소 할인 최대 50%
    </a>

    <a class="link" href="https://discord.com/invite/3DxttevJCG" target="_blank"
      >거래소 1:1문의</a
    >
    <a class="link link-divider" href="https://coincast.kr" target="_blank"
      >실시간 비트코인 뉴스</a
    >

    <p class="link">김프: {{ kimchiPremium }}</p>
  </div>
</template>

<script lang="ts">
import {
  getBinanceBTCPrice,
  getUpbitBTCPrice
} from '@/mysrc/services/cryptoService'
import { getWonUsdExchangeRate } from '@/mysrc/services/exchangeRateService'

async function calculateKimchiPremium() {
  const [binancePrice, upbitPrice, exchangeRate] = await Promise.all([
    getBinanceBTCPrice(),
    getUpbitBTCPrice(),
    getWonUsdExchangeRate()
  ])
  const binancePriceInKRW = binancePrice * exchangeRate
  const premium = upbitPrice - binancePriceInKRW
  const premiumPercentage = (premium / binancePriceInKRW) * 100
  const roundedPremiumPercentage = premiumPercentage.toFixed(2) + '%'
  return roundedPremiumPercentage
}

export default {
  name: 'PromoComponent',
  data() {
    return {
      kimchiPremium: null,
      intervalId: null
    }
  },
  async created() {
    this.kimchiPremium = await calculateKimchiPremium()
    this.intervalId = setInterval(async () => {
      this.kimchiPremium = await calculateKimchiPremium()
    }, 1000)
  },
  beforeDestroy() {
    clearInterval(this.intervalId)
  },
  methods: {
    goToReferral() {
      this.$router.push('/referral')
    }
  }
}
</script>

<style scoped lang="scss">
div {
  display: flex;
  flex-direction: column;
}

.link {
  margin: 0;
  padding: 10px 0;
  text-decoration: none;
  text-align: center;
}

.link-divider::after {
  content: '';
  display: block;
  border-bottom: 1px solid #fff; /* 밑줄 색상 설정 */
  margin-top: 20px; /* 밑줄과 텍스트 사이의 간격 설정 */
}

.logo {
  border-radius: 100%;
  display: block;
  width: 70px;
  margin: 0 auto;
}
.logo-text {
  display: inline-block;
  font-weight: bold;
  padding-top: 10px;
}
</style>

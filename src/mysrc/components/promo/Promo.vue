<template>
  <div class="main">
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
      >1:1문의</a
    >
    <a class="link link-divider" href="https://coincast.kr" target="_blank"
      >실시간 코인뉴스</a
    >

    <p class="link">
      <strong>김프</strong>
      <br />
      <span
        :class="{ positive: kimchiPremium >= 0, negative: kimchiPremium < 0 }"
      >
        {{ kimchiPremium }}%
      </span>
    </p>

    <p class="link">
      <strong>탐욕지수</strong><br />
      <span>
        {{ fearAndGreedIndex.latest }} ({{
          fearAndGreedIndex.changePercentage
        }}%)
      </span>
      <!-- <br />
      {{ fearAndGreedIndex.status }} -->
    </p>

    <p class="link">
      <strong>펀딩비</strong>
      <br />
      <span :class="{ positive: fundingFee >= 0, negative: fundingFee < 0 }">
        {{ fundingFee * 1 }}%
      </span>
      <br />
      {{ fundingFeeCountdown }}
    </p>
  </div>
</template>

<script lang="ts">
import {
  getBinanceBTCPrice,
  getUpbitBTCPrice,
  getBinanceBTCCountdown,
  getBinanceBTCFundingRate,
  getFearAndGreedIndex
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
  const roundedPremiumPercentage = premiumPercentage.toFixed(2)
  return roundedPremiumPercentage
}

export default {
  name: 'PromoComponent',
  data() {
    return {
      kimchiPremium: null,
      fundingFee: null,
      fundingFeeCountdown: null,
      fearAndGreedIndex: {
        latest: null,
        changePercentage: null,
        status: null
      },
      intervalId: null
    }
  },
  async created() {
    this.kimchiPremium = await calculateKimchiPremium()
    this.fundingFee = await getBinanceBTCFundingRate()
    this.fundingFeeCountdown = await getBinanceBTCCountdown()
    await this.updateFearAndGreedIndex()
    // 1분마다 갱신
    this.intervalId = setInterval(async () => {
      this.kimchiPremium = await calculateKimchiPremium()
      this.fundingFee = await getBinanceBTCFundingRate()
      this.fundingFeeCountdown = await getBinanceBTCCountdown()
    }, 1000)
  },
  beforeDestroy() {
    clearInterval(this.intervalId)
  },
  methods: {
    async updateFearAndGreedIndex() {
      const fearAndGreedData = await getFearAndGreedIndex()
      if (fearAndGreedData) {
        this.fearAndGreedIndex.latest = fearAndGreedData.latest
        this.fearAndGreedIndex.changePercentage =
          fearAndGreedData.changePercentage
        this.fearAndGreedIndex.status = fearAndGreedData.status
      }
    }
  }
}
</script>

<style scoped lang="scss">
.main {
  display: flex;
  flex-direction: column;
  font-size: 1.14rem;
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
.positive {
  color: green;
}

.negative {
  color: red;
}
</style>

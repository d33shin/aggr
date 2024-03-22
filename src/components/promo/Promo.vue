<template>
  <div>
    <a class="discord-link" href="http://discord.com/invite/XZ6fJTFNx7">
      국내 최대<br />
      선물 커뮤니티<br />코인톡 바로가기</a
    >
    <a href="https://discord.com/invite/tWE7waTAnP">거래소 할인 최대 50% </a>

    <a href="https://discord.com/invite/3DxttevJCG">거래소 1:1문의</a>
    <hr />
    <a href="https://coincast.kr">실시간 비트코인 뉴스</a>
  </div>
</template>

<script>
export default {
  name: 'PromoComponent',
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

a {
  padding: 10px 0;
  text-decoration: none;
}
</style>

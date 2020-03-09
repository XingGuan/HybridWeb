<template>
  <div class="home">
    <p class="test">测试 fontSize</p>
  </div>
</template>

<script>
export default {
  name: "Home",
  components: {}
};
</script>
<style lang="scss" scoped>
@import "@css/style.css" .test {
  font-size: px2rem(16);
}
</style>

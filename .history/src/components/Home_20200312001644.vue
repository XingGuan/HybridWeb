<template>
  <div class="home">
    <div class="home-content">
      <my-swiper></my-swiper>
    </div>
  </div>
</template>

<script>
import MySwiper from "@c/swiper/MySwiper.vue";
export default {
  components: {
    MySwiper
  }
};
</script>

<style lang="scss" scoped>
.home {
  width: 100%;
  height: 100%;
  font-size: 32px;
}
</style>

<template>
  <!-- 1.需要一个swiper
       2.需要swiper里面的滑动块swiperSlide
       3.分页器插槽(slot)配置分页器
   -->
  <swiper :options="swiperOptions"> </swiper>
</template>

<script>
import "swiper/dist/css/swiper.css";
import { swiper, swiperSlide } from "vue-awesome-swiper";
export default {
  components: {
    swiper,
    swiperSlide
  },
  data() {
    return {
      swiperOptions: {
        //自动滚动
        autoPlay: true
        //swiper的高度可以随slide高度变化
        autoHeight:true
      }
    };
  }
};
</script>

<style></style>

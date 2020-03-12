<template>
  <!-- 1.需要一个swiper
       2.需要swiper里面的滑动块swiperSlide
       3.分页器插槽(slot)配置分页器
   -->
  <swiper :options="swiperOptions">
    <swiper-slide v-for="(item, index) in swiperImgs" :key="index">
      <img
        class="swiper-slide-img"
        :style="{ height: height }"
        src=""
        alt=""
        srcset=""
      />
    </swiper-slide>
    <template v-slot:pagination>
      <div class="swiper-pagination"></div>
    </template>
  </swiper>
</template>

<script>
import "swiper/dist/css/swiper.css";
import { swiper, swiperSlide } from "vue-awesome-swiper";
export default {
  props: {
    //slide 高度
    height: {
      type: String,
      default: "auto"
    },
    swiperImgs: {
      type: Array,
      required: true,
      default: function() {
        return [];
      }
    }
  },
  components: {
    swiper,
    swiperSlide
  },
  data() {
    return {
      swiperOptions: {
        //自动滚动
        autoPlay: true,
        //swiper的高度可以随slide高度变化
        autoHeight: true
      }
    };
  }
};
</script>

<style></style>

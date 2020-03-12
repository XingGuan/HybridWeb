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
        :src="item"
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
        autoplay: true,
        //swiper的高度可以随slide高度变化
        autoHeight: true,
        //分页器设置效果
        pagination: {
          //分页器对应的html元素
          el: ".swiper-pagination",
          type: "bullets",
          //分页器内的元素去添加一个类名
          bulletClass: "custom-bullet-class"
        }
      }
    };
  }
};
</script>

<style lang="scss" scoped>
@import "@css/style.scss";
.swiper-pagination {
  bottom: px2rem(12);
  .custom-bullet-class {
    box-sizing: border-box;
    border-radius: 100%;
    width: px2rem(6);
    height: px2rem(6);
    border: px2rem(1) solid #fff;
    margin: 0 px2rem(4);
  }
}
</style>

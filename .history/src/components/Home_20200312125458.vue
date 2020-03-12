<template>
  <div class="home">
    <div class="home-content">
      <my-swiper
        :swiperImgs="swiperData.map(item => item.icon)"
        :height="swiperheight"
      ></my-swiper>
    </div>
  </div>
</template>

<script>
import MySwiper from "@c/swiper/MySwiper.vue";
export default {
  components: {
    MySwiper
  },
  data() {
    return {
      swiperData: [],
      swiperheight: "184px"
    };
  },
  created() {
    this.initData();
  },
  methods: {
    //获取数据
    initData() {
      this.$http
        .get("/swiper")
        .then(data => {
          this.swiperData = data.list;
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.home {
  width: 100%;
  height: 100%;
  &-content {
    height: 100%;
  }
}
</style>

<template>
  <div class="home">
    <div class="home-content">
      <!-- swiper -->
      <my-swiper
        :swiperImgs="swiperData.map(item => item.icon)"
        :height="swiperheight"
      ></my-swiper>
      <!-- 520活动组件 -->
      <activity>
        <div class="activity-520">
          <img
            v-for="(item, index) in activityData"
            :key="index"
            :src="item.icon"
            alt=""
          />
        </div>
      </activity>
    </div>
  </div>
</template>

<script>
import MySwiper from "@c/swiper/MySwiper.vue";
import Activity from "@c/currency/Activity.vue";
export default {
  components: {
    MySwiper,
    Activity
  },
  data() {
    return {
      swiperData: [],
      swiperheight: "184px",
      activityData: []
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
      this.$http
        .get("/activitys")
        .then(data => {
          this.activityData = data.list;
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

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
            alt="活动"
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
      // this.$http
      //   .get("/swiper")
      //   .then(data => {
      //     this.swiperData = data.list;
      //   })
      //   .catch(err => {
      //     console.log(err);
      //   });
      // this.$http
      //   .get("/activitys")
      //   .then(data => {
      //     this.activityData = data.list;
      //   })
      //   .catch(err => {
      //     console.log(err);
      //   });
      //axios同时发送多个请求（并行）
      this.$http.all([
        this.$http.get("/swiper"),
        this.$http.get("activitys"),
      ]).then(this.$http.spread((swiperData,activityData)=>{
          this.swiperData=swiperData.list;
          this.activityData=activityData.list;
      }))
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@css/style.scss";
.home {
  width: 100%;
  height: 100%;
  background-color: $bgColor;
  &-content {
    height: 100%;
    .activity-520 {
      background: burlywood;
      margin-top: px2rem(-8);
      border-top-left-radius: px2rem(8);
      border-top-right-radius: px2rem(8);
      img {
        display: inline-block;
        width: 33.33%;
        z-index: 2;
      }
    }
  }
}
</style>

<template>
  <div class="home" @scroll="onScrollChange">
    <navigation-bar :isShowBack="false" :navBarStyle="navBarStyle">
      <!-- 左侧插槽 -->
      <template v-slot:nav-left>
        <img :src="navBarCurrentSlotStyle.leftIcon" alt="">
      </template>
      <!-- 中间插槽 -->
      <template v-slot:nav-center>
        <search :bgColor="navBarCurrentSlotStyle.search.bgColor" 
        :hintColor="navBarCurrentSlotStyle.search.hintColor" 
        :icon="navBarCurrentSlotStyle.search.icon">
        </search>
      </template>
      <!-- 右侧插槽 -->
      <template v-slot:nav-right>
        <img :src="navBarCurrentSlotStyle.rightIcon" alt="">
      </template>
    </navigation-bar>

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
      <!-- 功能选项 -->
      <mode-options></mode-options>
      <!-- 秒杀组件 -->
      <seconds :dataSource="secondData"></seconds>
      <!-- 拼购节 -->
      <activity>
        <div class="activity-pin-gou-jie">
          <img src="@img/haoHuoQiang.gif" alt="">
        </div>
      </activity>
      <!-- 商品列表 -->
      <goods :layoutType="'3'" :isScroll="false"></goods>
    </div>
  </div>
</template>

<script>
import MySwiper from "@c/swiper/MySwiper.vue";
import Activity from "@c/currency/Activity.vue";
import ModeOptions from "@c/currency/ModeOptions.vue";
import Seconds from "@c/seconds/Seconds.vue";
import Goods from "@c/goods/Goods.vue";
import NavigationBar from "@c/currency/NavigationBar.vue";
import Search from "@c/currency/Search.vue";
export default {
  components: {
    MySwiper,
    Activity,
    ModeOptions,
    Seconds,
    Goods,
    NavigationBar,
    Search
  },
  data() {
    return {
      swiperData: [],
      swiperheight: "184px",
      activityData: [],
      secondData:[],
      // navBar 插槽的样式数据，包含页面未开始滑动时插槽的样式(默认样式)，
      // 和页面滑动到锚点之后页面的样式(高亮样式)
      navBarSlotStyle:{
        // 默认样式
        normal:{
          // 左侧插槽
          leftIcon:require('@img/more-white.svg'),
          // 中间插槽
          search:{
            bgColor:'#fff',
            hintColor:'#999',
            icon:require('@img/search.svg')
          },
          //右侧插槽
          rightIcon:require('@img/message-white.svg')
        },
        // 高亮样式
        highlight:{
          // 左侧插槽
          leftIcon:require('@img/more.svg'),
          // 中间插槽
          search:{
            bgColor:'#d7d7d7',
            hintColor:'#fff',
            icon:require('@img/search-white.svg')
          },
          //右侧插槽
          rightIcon:require('@img/message.svg')
        }
      },
      // navBar当前使用的插槽样式
      navBarCurrentSlotStyle:{
      },
      // navBar的定制样式
      navBarStyle:{
        position:'fixed',
        backgroundColor:''
      },
      // 记录页面滚动值
      scrollTopValue:-1,
      // 锚点值
      ANCHOR_SCROLL_TOP:160

    };
  },
  created() {
    this.navBarCurrentSlotStyle=this.navBarSlotStyle.normal;
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
        this.$http.get("/seconds"),
      ]).then(this.$http.spread((swiperData,activityData,secondData)=>{
          this.swiperData=swiperData.list;
          this.activityData=activityData.list;
          this.secondData=secondData.list;
      })).catch(err => {
                console.log(err.response)
          })
    },
    /**
     * 监听页面滚动
     * 1.获取到当前页面的滚动距离
     * 2.计算navBar背景颜色（navBar背景透明度）
     * 当前滚动距离/锚点值=navBar背景透明度 opacity
     * 3.opacity>=1,当前滚动的距离已经等于或者超过锚点值，把当前navBar的样式变为高量的样式
     * 否则opacity<1,当前navBar插槽的样式，为默认样式
     */
    onScrollChange($event){
      // 获取当前页面的滚动距离
      this.scrollTopValue=$event.target.scrollTop;
      // 计算navBar背景颜色（navBar背景透明度）
      let opacity=this.scrollTopValue/this.ANCHOR_SCROLL_TOP;
      // 指定navBar插槽样式
      if(opacity>=1){
        this.navBarCurrentSlotStyle=this.navBarSlotStyle.highlight;
      }else{
        this.navBarCurrentSlotStyle=this.navBarSlotStyle.normal;
      }
      // 根据透明度比例来设置 navBar 的背景色
      this.navBarStyle.backgroundColor='rgba(255,255,255,'+opacity+')'


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
  overflow: hidden;
  overflow-y: auto;
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
    .activity-pin-gou-jie{
      background-color: #fff;
      margin-top: $marginSize;
      img{
        width:100%;
      }
    }
  }
}
</style>

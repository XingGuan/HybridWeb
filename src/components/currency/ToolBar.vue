<template>
  <div class="tool-bar" :class="{'iphonex-bottom': $store.state.isIphoneX}">
    <!-- tab按钮,需要有一个数据源,通过这个数据源去驱动视图 -->
    <div
      class="tool-bar-item"
      @click="onChangeFragment(item, index)"
      v-for="(item, index) in toolBarData"
      :key="index"
    >
      <img
        class="tool-bar-item-img"
        :src="[index === selectItemIndex ? item.hIcon : item.nIcon]"
      />
      <p
        class="tool-bar-item-name"
        :class="{ 'tool-bar-item-name-h': index === selectItemIndex }"
      >
        {{ item.name }}
      </p>
    </div>
  </div>
</template>

<script>
/**
 * ToolBar的功能:
 * 1.永远位于页面的最底部
 * 2.点击toolbar的按钮的时候页面发生对应的切换
 * 3.按钮分为 默认 和 选中两个状态
 * ---------------------------------
 * 能力和约束：
 * 1.不具备的能力(约束)
 * 2.子传父，组件toolbar有点击事件
 * 3.本身具有的功能,当按钮被选中的时候应该切换按钮的状态
 */
export default {
  data() {
    return {
      //tab按钮数据源,vue,react,angular MVVM框架数据驱动视图
      toolBarData: [
        {
          //默认状态下的图片
          nIcon: require("@img/home-n.svg"),
          //高亮状态下的图片
          hIcon: require("@img/home-h.svg"),
          //首页
          name: "首页",
          //组件名称
          componentName: "home"
        },
        {
          //默认状态下的图片
          nIcon: require("@img/shopping-n.svg"),
          //高亮状态下的图片
          hIcon: require("@img/shopping-h.svg"),
          //首页
          name: "购物车",
          //组件名称
          componentName: "shopping"
        },
        {
          //默认状态下的图片
          nIcon: require("@img/my-n.svg"),
          //高亮状态下的图片
          hIcon: require("@img/my-h.svg"),
          //首页
          name: "我的",
          //组件名称
          componentName: "my"
        }
      ],
      //选中的tab按钮
      selectItemIndex: 0
    };
  },
  methods: {
    onChangeFragment(item, index) {
      this.selectItemIndex = index;
      this.$emit("onChangeFragment", item.componentName);
    },
    /**
     * 指定切换的tab页
     */
    pushFragment(index){
      // 调用onChangeFragment 切换对应的tab
      this.onChangeFragment(this.toolBarData[index],index);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@css/style.scss";
.tool-bar {
  width: 100%;
  height: px2rem(46);
  display: flex;
  justify-content: space-around;
  background-color: #fff;
  box-shadow: 0 0 16px 0 rgba(0, 0, 0, 0.2);
  border-top: 1px solid $lineColor;
  &-item {
    text-align: center;
    padding: px2rem(4) px2rem(12);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    &-img {
      width: px2rem(22);
      height: px2rem(22);
    }
    &-name {
      font-size: $infoSize;
      margin-top: px2rem(4);
      &-h {
        color: $mainColor;
      }
    }
  }
}
</style>

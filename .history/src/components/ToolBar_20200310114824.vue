<template>
  <div></div>
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
      ]
    };
  }
};
</script>

<style></style>

<template>
  <!--活动组件只是提供了一个空间,用来存放活动的内容
  你的活动是什么样子我不管-->
  <div class="activity">
    <!-- 插槽展示活动内容 -->
    <slot></slot>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
@import "@css/style.scss" .activity {
  max-height: px2rem(160);
  position: relative;
}
</style>

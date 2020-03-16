<template>
  <div class="my">
    <navigation-bar :pageName="'个人中心'" :isShowBack="false"></navigation-bar>
    <h1>My</h1>
  </div>
</template>

<script>
import NavigationBar from "@c/currency/NavigationBar.vue";
export default {
  components:{
     NavigationBar
  }
};
</script>

<style lang="scss" scoped>
.my {
  width: 100%;
  height: 100%;
  font-size: 32px;
}
</style>

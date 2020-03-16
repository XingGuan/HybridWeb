<template>
  <div class="shopping">
     <navigation-bar :pageName="'购物车'" :isShowBack="false"></navigation-bar>
    <h1>Shopping</h1>
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
.shopping {
  width: 100%;
  height: 100%;
  font-size: 32px;
}
</style>

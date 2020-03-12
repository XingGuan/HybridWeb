<template>
  <tool-bar @onChangeFragment="onChangeFragment"></tool-bar>
</template>

<script>
import toolBar from "@c/ToolBar.vue";
export default {
  components: {
    "tool-bar": toolBar
  },
  methods: {
    // 组件切换
    onChangeFragment(componentName) {
      console.log("1111111", componentName);
    }
  }
};
</script>

<style></style>

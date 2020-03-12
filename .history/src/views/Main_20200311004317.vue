<template>
  <!-- 动态组件 -->
  <component :is="currentComponent"></component>
  <tool-bar @onChangeFragment="onChangeFragment"></tool-bar>
</template>

<script>
import toolBar from "@c/ToolBar.vue";
export default {
  components: {
    "tool-bar": toolBar,
    home: () => import("@c/Home"),
    shopping: () => import("@c/Shopping"),
    my: () => import("@c/My")
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

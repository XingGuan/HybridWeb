<template>
  <tool-bar @onChangeFragment="onChangeFragment"></tool-bar>
</template>

<script>
import toolBar from "@c/ToolBar.vue";
export default {
  components: {
    "tool-bar": toolBar
  },
  methods: {}
};
</script>

<style></style>

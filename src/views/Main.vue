<template>
  <div class="main">
    <keep-alive>
       <!-- 动态组件 -->
      <component :is="currentComponent"></component>
    </keep-alive>
    <tool-bar ref="toolBar" @onChangeFragment="onChangeFragment"></tool-bar>
  </div>
</template>

<script>
import toolBar from "@c/currency/ToolBar.vue";
export default {
  name:'mains',
  components: {
    "tool-bar": toolBar,
    //异步组件引用方式,异步组件:只有在需要去展示这个组件的时候，才会把组件去进行渲染。
    home: () => import("@c/Home"),
    shopping: () => import("@c/Shopping"),
    my: () => import("@c/My")
  },
  data() {
    return {
      currentComponent: "home"
    };
  },
  activated(){
    // 在keepAlive被激活的时候，调用指定加载页面组件的方法
    this.pushFragment();
  },
  methods: {
    // 组件切换
    onChangeFragment(componentName) {
      this.currentComponent = componentName;
    },
    /**
     * 指定加载的页面组件
     */
    pushFragment(){
      // 获取到组件加载的下标
      let componentIndex=this.$route.params.componentIndex;
      //如果没有下标的话，直接让方法return掉
      if(componentIndex===undefined) return;
      // 通过toolbar来切换对应的组件
      this.$refs.toolBar.pushFragment(componentIndex)

    }
  }
};
</script>

<style lang="scss" scoped>
.main {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
</style>

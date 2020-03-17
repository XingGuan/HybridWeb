<template>
<!-- 能力：
    1.默认的展示效果->左边后退按钮的图标、中间页面的名称、右边是空白的内容
    2.可通过插槽来配置具体的展示样式->左、中、右三个插槽，父组件可以通过这三个插槽，来制定对应的位置布局
    3.可以接收从外部指定的一个样式(可以在父组件中指定navigationBar的style)
 -->
  <div class="nav-bar z-index-max" :style="navBarStyle" :class="{'border-line':pageName}">
      <div class="left" @click="$emit('onLeftClick')">
          <!-- 默认状态下 -->
          <img v-if="isShowBack" src="@img/back.svg" alt="">
          <!-- 具名插槽 -->
          <slot name="nav-left"></slot>
      </div>
      <div class="center">
          <!-- 默认状态 -->
          <span class="page-title" v-if="pageName">{{pageName}}</span>
          <!-- 具名插槽 -->
          <slot name="nav-center"></slot>
      </div>
      <div class="right">
          <!-- 具名插槽 -->
          <slot name="nav-right"></slot>
      </div>
  </div>
</template>

<script>
export default {
    props:{
        /**
         * 页面标题名称
         */
        pageName:{
            type:String,
            default:''
        },
        /**
         * 是否展示后退按钮
         */
        isShowBack:{
            type:Boolean,
            default:true
        },
        /**
         * navBar样式
         */
        navBarStyle:{
            type:Object,
            default:function(){
                return {
                    backgroundColor:'#fff'
                }
            }
        }
    }

}
</script>
<style lang="scss" scoped>
@import '@css/style.scss';
.nav-bar{
    width: 100%;
    height: px2rem(44);
    line-height: px2rem(44);
    display: flex;
    justify-content: space-between;
    .left,.right{
        display: flex;
        height: 100%;
        width: px2rem(26);
        padding: 0 $marginSize;
        img{
            width: 100%;
            align-self:center;
        }
    }
    .center{
        height: 100%;
        display: flex;
        flex-grow: 1;
        .page-title{
            font-size: $titleSize;
            align-self: center;
            margin: 0 auto;
        }
    }
}
.border-line{
    border-bottom: 1px solid $lineColor;
}
</style>
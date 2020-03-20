<template>
  <!-- 
      视差效果：让多层背景以不同的速度去进行运动
      1.至少需要拥有两层背景(缓慢移动区，正常移动区)
      2.将背景设置为相对布局(为缓慢移动区设置top来缓冲掉scroll滚动)
      3.监听Parallax组件的滑动，根据滑动来计算缓慢移动区top的值
   -->
   <div class="parallax" @scroll="onScrollChange">
       <!-- 缓慢移动区 -->
       <div class="parallax-slow" :style="{top:slowTop}">
           <slot name="parallax-slow"></slot>
       </div>
       <!-- 正常移动区 -->
       <div class="parallax-content z-index-2">
           <slot></slot>
       </div>
   </div>
</template>

<script>
export default {
    data(){
        return{
            // 速度查(正常移动区移动100px，缓慢移动区100/2=50px)
            SPEED_DIFF:2,
            // 页面滑动值
            parallaxScroll:0,
        }
    },
    computed:{
        /**
         * 返回slow距离顶部的距离
         */
        slowTop(){
            // 当前页面滑动距离/速度差=缓慢移动区应该滑动距离
            // 当前页面的滑动距离-缓慢移动区应该滑动距离=缓慢移动区用来缓冲掉scroll的值
            return (this.parallaxScroll-(this.parallaxScroll/this.SPEED_DIFF))+'px';
        }
    },
    methods:{
        /**
         * 监听组件滑动
         */
        onScrollChange($event){
            this.parallaxScroll=$event.target.scrollTop;
            this.$emit('onScrollChange',this.parallaxScroll);
        }
    }

}
</script>
<style lang="scss" scoped>
@import '@css/style.scss';
.parallax{
    width: 100%;
    height: 100%;
    overflow: hidden;
    overflow-y:auto;
    &-slow{
        width:100%;
        position: relative;
    }
    &-content{
        width:100%;
        position: relative;
    }

}
</style>
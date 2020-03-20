<template>
  <!-- 
      数量控制器：
        只需要去负责对数量的逻辑处理，而不需要去管其他的东西(是在商品中被引用，还是在其他的组件中被引用)

   -->
   <div class="number-manager">
       <span class="number-manager-less" :class="{'number-manager-disabled':number===1}" @click="onLessClick">-</span>
       <span class="number-manager-number">{{number}}</span>
       <span class="number-manager-add" @click="onAddClick">+</span>
   </div>
</template>
<script>
export default {
    /**
     * 父组件指定的默认数量
     */
    props:{
        defaultNumber:{
            type:Number,
            default:1
        }
    },
    data(){
        return{
            // 数量数据源
            number:1
        }
    },
    watch:{
        /**
         * 监听defaultNumber
         */
        defaultNumber(newV){
            this.number=newV;
        },
        /**
         * 监听数量的变化,当数量发生变化时，监听父组件
         */
        number(newV){
            this.$emit('onChangeNumber',newV);
        }
    },
    methods:{
        /**
         * 减号按钮点击事件
         */
        onLessClick(){
            if(this.number===1){
                return;
            }
            this.number-=1;
        },
        /**
         * 加号按钮点击事件
         */
        onAddClick(){
            this.number+=1;
        }
    }
}
</script>
<style lang="scss" scoped>
@import '@css/style.scss';
.number-manager{
    display: flex;
    font-size: $infoSize;
    height: px2rem(20);
    line-height: px2rem(20);
    span{
        width:px2rem(30);
        text-align: center;
        display: inline-block;
        font-weight: 500;
    }
    &-number{
        background-color: $bgColor;
        padding: 0 px2rem(4);    
    }
    &-disabled{
        color:$hintColor;
    }
}

</style>
<template>
  <div class="mode-options">
      <div class="mode-options-item" v-for="(item,index) in dataSource" :key="index">
          <img class="mode-options-item-img" :src="item.icon" alt="" srcset="">
          <p class="mode-options-item-title">{{item.title}}</p>
      </div>
  </div>
</template>

<script>
export default {
    data(){
        return{
            //数据源
            dataSource:[
                {
                    id:'1',
                    icon:require('@img/jingDongChaoShi.png'),
                    title:'京东超市'
                },
                {
                    id:'2',
                    icon:require('@img/haiTunQuanQiu.png'),
                    title:'海屯全球'
                },
                {
                    id:'1',
                    icon:require('@img/jingDongChaoShi.png'),
                    title:'京东超市'
                },
                {
                    id:'1',
                    icon:require('@img/jingDongChaoShi.png'),
                    title:'京东超市'
                },
                {
                    id:'1',
                    icon:require('@img/jingDongChaoShi.png'),
                    title:'京东超市'
                },
                {
                    id:'1',
                    icon:require('@img/jingDongChaoShi.png'),
                    title:'京东超市'
                },
                {
                    id:'1',
                    icon:require('@img/jingDongChaoShi.png'),
                    title:'京东超市'
                },
                {
                    id:'1',
                    icon:require('@img/jingDongChaoShi.png'),
                    title:'京东超市'
                },
                {
                    id:'1',
                    icon:require('@img/jingDongChaoShi.png'),
                    title:'京东超市'
                },
                {
                    id:'1',
                    icon:require('@img/jingDongChaoShi.png'),
                    title:'京东超市'
                }      
            ]
        }
    }

}
</script>

<style lang="scss" scoped>
@import "@css/style.scss";
    .mode-options{
        display: flex;
        flex-wrap: wrap;
        background-color: #fff;
        padding-bottom: px2rem(14);
        &-item{
            width:20%;
            text-align: center;
            margin-top: px2rem(10);

            &-img{
                width: px2rem(40);
                height: px2rem(40);
            }
            &-title{
                font-size:$minInfoSize;
                margin-top: px2rem(6);
            }
        } 
    }

</style>
<template>
  <div class="mode-options">
      <div class="mode-options-item" v-for="(item,index) in dataSource" :key="index">
          <img src="" alt="" srcset="">
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

<style>

</style>
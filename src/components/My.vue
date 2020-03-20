<template>
  <div class="my">
    <navigation-bar :pageName="'个人中心'" :isShowBack="false"></navigation-bar>
    <div class="my-content">
      <!-- 头像区域 -->
      <div class="my-content-header" @click="onLoginClick">
        <img class="my-content-header-avater" src="@img/avater.png" alt="">
        <p class="my-content-header-login">{{$store.state.username?$store.state.username:'登录/注册'}}</p>
      </div>
      <!-- 工具栏区域 -->
      <div class="my-content-tools">
        <div class="my-content-tools-item" v-for="(item,index) in toolsData" :key="index">
          <p class="my-content-tools-item-name">{{item}}</p>
          <img class="my-content-tools-item-arrow" src="@img/right-arrow.svg" alt="">
        </div>
      </div>
      <!-- 存在登录用户，展示退出登录按钮 -->
      <div class="my-content-logout page-commit"
        v-if="$store.state.username" @click="onLogoutClick">
        退出登录
      </div>
    </div>
  </div>
</template>

<script>
import NavigationBar from "@c/currency/NavigationBar.vue";
export default {
  components:{
     NavigationBar
  },
  data(){
    return{
      // 工具栏数据
      toolsData:[
        '全部订单',
        '我的预约',
        '应用推荐',
        '用户福利'
      ]
    }
  },
  methods:{
    onLoginClick(){
      this.$router.push({
        name:'login',
        params:{
          routerType:'push'
        }
      })
    },
    /**
     * 退出登录按钮点击事件
     */
    onLogoutClick(){
      // 判断当前的项目是运行在Android设备还是IOS设备中
      if(window.androidJSBridge){
        // window 下存在android注入的属性(androidJSBridge)，则表示当前项目在android设备中运行
        this.onLogoutToAndroid();
      }else if(window.webkit){
        // window 下存在webkit，表示当前项目在IOS设备中运行
        this.onLogoutToIOS();
      }
    },
    /**
     * 调用android 退出登录的方法
     */
    onLogoutToAndroid(){
      // 调用android退出登录接口
      let result=window.androidJSBridge.logout();
      // 对退出登录返回值处理
      this.onLogoutCallback(result);
    },
    /**
     * 调用IOS退出登录的方法
     */
    onLogoutToIOS(){
      // 将IOS的回调方法
      window.onLogoutCallback=this.onLogoutCallback;
      // 调用IOS退出登录接口
      window.webit.messageHandlers.logout.postMessage({});
    },
    /**
     * 处理退出登录的返回值
     */
    onLogoutCallback(){
      if(result){
        this.$store.commit('clearUsername');
        alert('退出登录成功');
      }else{
        alert('操作失败，请重试!');
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import '@css/style.scss';
.my {
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: column;
  background-color: $bgColor;
  &-content{
    width:100%;
    height: 100%;
    // 头部区域
    &-header{
      margin-top:$marginSize;
      background-color: #ffffff;
      height: px2rem(68);
      display: flex;
      align-items: center;
      border-top:px2rem(1) solid $lineColor ;
      border-bottom: px2rem(1) solid $lineColor;
      padding:$marginSize;
      &-avater{
        width:px2rem(52);
        height: px2rem(52);
      }
      &-login{
        margin-left: $marginSize;
        font-size: $titleSize;
      }



    }
    //工具栏
    &-tools{
      &-item{
        display: flex;
        height: px2rem(46);
        box-sizing: border-box;
        align-items: center;
        padding: $marginSize;
        background-color: #ffffff;
        border-bottom: px2rem(1) solid $lineColor;
        &-name{
          font-size: $infoSize;
          flex-grow: 1;
        }
        &-arrow{
          width:px2rem(16);
        }

      }
    } 
    // 退出登录
    &-logout{
      margin-top: 20%;
    }
  }
}
</style>

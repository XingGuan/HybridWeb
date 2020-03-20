<template>
    <div class="register-page">
        <navigation-bar :pageName="'注册'" @onLeftClick="onBackClick"></navigation-bar>
        <!-- 内容区-->
        <div class="register-page-content">
            <!-- 用户名 -->
            <div class="input-container">
                <input v-model="username" type="text" placeholder="用户名">
            </div>
            <!-- 密码 -->
            <div class="input-container">
                <input v-model="password" type="password" placeholder="密码">
            </div>
            <!-- 确认密码 -->
            <div class="input-container">
                <input v-model="confirmPassword" type="password" placeholder="确认密码">
            </div>
            <div @click="onRegisterClick" class="register-page-content-register page-commit">
                注册
            </div>
        </div>
    </div>
</template>

<script>
import NavigationBar from "@c/currency/NavigationBar"
import md5 from '@js/md5.min.js';
export default {
    name:'register',
    components:{
        NavigationBar
    },
    data(){
        return{
            username:'',
            password:'',
            confirmPassword:'',
            md5Password:'',
        }
    },
    methods:{
        onBackClick(){
            this.$router.go(-1);
        },
        onRegisterClick(){
            // 验证用户输入的合法性质
            if(this.username.length===0){
                alert('请完善用户名');
                return;
            }
            if(this.password.length===0 || this.password!=this.confirmPassword){
                alert('请完善密码');
                return;
            }
            // 与原生交互，保存用户输入的用户名密码
            //对用户输入的密码进行md5进行加密
            this.md5Password=md5(this.password);
            // 判断当前的项目是运行在Android设备还是IOS设备中
            if(window.androidJSBridge){
                // window 下存在android注入的属性(androidJSBridge)，则表示当前项目在android设备中运行
                this.onRegisterToAndroid()    
            }else if(window.webkit){
                // window 下存在webkit，表示当前项目在IOS设备中运行
                this.onRegisterToIOS();
            }

        },
        /**
         * 调用android注册接口
         */
        onRegisterToAndroid(){
            // json字符串,Android只能接收基本类型参数
            let userJson=JSON.stringify({
                'username':this.username,
                'password':this.md5Password
            })
            // 调用android注册方法，接收他的返回值
            let result=window.androidJSBridge.register(userJson);
            // 对返回值进行处理
            this.onRegisterCallback(result);
        },
        /**
         * 调用IOS注册接口
         */
        onRegisterToIOS(){
            // IOS可以直接接收对象类型参数
            let userObj={
                'username':this.username,
                'password':this.md5Password
            }
            /**
             * IOS不能直接返回返回值，所以IOS操作完成之后会回调对应的回调方法
             * 同时原生调用JS的方法只能调用绑定到window对象中的方法
             * 所以我们需要把IOS操作完成之后的回调方法(registerCallback)绑定到window对象下
             */
            window.registerCallback=this.onRegisterClick;
            // 调用IOS注册方法
            window.webkit.messageHandlers.register.postMessage(userObj);

        },
        /**
         * 用来处理Native注册接口的返回值
         */
        onRegisterCallback(result){
            if(result){
                alert('注册成功');
                this.onBackClick();
            }else{
                alert('注册失败,请重试！');
            }
        }
    }


}
</script>
<style lang="scss" scoped>
@import '@css/style.scss';
.register-page{
    position: absolute;
    height: 100%;
    width: 100%;
    background-color: #ffffff;
    &-content{
        width: 100%;
        height: 100%;
        &-register{
            margin-top: 40%;
        }
    }
}
</style>
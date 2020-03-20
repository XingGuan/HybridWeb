import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
/**
 * vuex作用：
 * 1.vuex就是在vue中创建全局变量的一个东西
 * 2.并且我们可以通过一些方法，来改变这些全局变量的值
 */
/**
 * Store:
 * 就是new Vuex.Store({})里面的对象，用到的vuex所有的核心概念都是在Store里面的
 * 在vue组件中，我们可以直接通过this.$store=Store对象
 * this.$store.state="state:{}",
 * State:
 *  vuex中的数据源，所有通过vuex声明的全局变量都会在state里面(this.$store.state="state:{}")
 * getter:
 * 相当于vue中的计算属性，可以用于监听、计算state中数据的变化。
 * mutation：
 *  vuex中去操作数据的方法(vuex中不推荐直接去为state赋值。this.$store.state.xx='xxxx')
 *  推荐我们使用mutation来去修改state的值。因为这样它会是一个有迹可循的操作方式。(只能是同步执行的)
 * action：
 * 帮助mutation进行异步操作
 * module：
 * 将store分为了多个模块，每个模块都是一个module。
 * 
 */
export default new Vuex.Store({
  state: {
    // 购物车数据源
    shoppingDatas:[],
    // 当前的设备是否为IphoneX
    isIphoneX:false,
    // 登录用户的用户名
    username:undefined


  },
  mutations: {
    /**
     * 添加商品到购物车数据源
     */
    addShoppingData(state,goods){
       //判断购物车中是否包含该商品，如果购物车中已经包含了该商品，那么应该让购物车的商品数量去加1
       const isExist=state.shoppingDatas.some(item=>{
        //  该商品已经存在于购物车中
         if(item.id===goods.id){
          item.number+=1;
          return true;
         }
       })
      // 只有当购物车中不包含该商品时，才让商品push到shoppingDatas
      if(!isExist){
        // 为商品新增属性
        // isCheck:表示商品是否选中
        // number:表示商品的数量
        // 通过Vue.set的方法可以把新添加的属性变为响应式的数据
        // 如果直接通过goods.isCheck=false;那么isCheck就不是响应式的数据
        Vue.set(goods,'isCheck',false);
        Vue.set(goods,'number',1);
        state.shoppingDatas.push(goods);
      }
    },
    /**
     * 更改指定的商品数量
     */
    changeShoppingDataNumber:function(state,data){
      /**
       * data:{
       *  index:指定的商品下标
       *  number:商品数量
       * }
       */
      state.shoppingDatas[data.index].number=data.number;
    },
    /**
     * 修改IphoneX
     */
    setIsIphoneX:function(state,isIphoneX){
      state.isIphoneX=isIphoneX
    },
    /**
     * 指定username
     */
    setUsername(state,username){
      state.username=username;
    },
    /**
     * 退出登录，处理username
     */
    clearUsername(state,username){
      state.username=undefined;
    },

  },
  actions: {
  },
  modules: {
  }
})

<template>
    <div class="goods-detail">
        <navigation-bar :isShowBack="false" :navBarStyle="navBarStyle">
            <template v-slot:nav-left>
                <div class="goods-detail-nav-left" @click="onBackClick">
                    <!-- 默认状态下黑色后退按钮 -->
                    <img src="@img/back-2.svg" alt="" :style="{opacity:leftImgOpacity}">
                    <!-- 完全展示之后的白色后退按钮 -->
                    <img src="@img/back-white.svg" alt="" :style="{opacity:navBarSlotOpacity}">
                </div>
            </template>
            <template v-slot:nav-center>
                <p class="goods-detail-nav-title" :style="{opacity:navBarSlotOpacity}">商品详情</p>
            </template>
        </navigation-bar>
        <div class="goods-detail-content">
            <parallax @onScrollChange="onScrollChange">
                <!-- 缓慢移动区 -->
                <template v-slot:parallax-slow>
                    <my-swiper :height="SWIPER_IMAGE_HEIGHT +'px'" 
                    :swiperImgs="goodsData.swiperImgs"
                    :paginationType="'2'">
                    </my-swiper>
                </template>
                <!-- 正常移动区 -->
                <template>
                    <!-- 内容 -->
                    <div class="goods-detail-content-desc">
                        <div class="goods-detail-content-desc-item">
                            <!-- 商品价格 -->
                            <p class="goods-detail-content-desc-item-price">¥{{goodsData.price | priceValue}}</p>
                            <!-- 商品名称 -->
                            <p class="goods-detail-content-desc-item-name">
                                <!-- 直营 -->
                                <direct v-if="goodsData.isDirect"></direct>
                                {{goodsData.name}}
                            </p>
                        </div>
                        <div class="goods-detail-content-desc-item">
                            <!-- 已选商品 -->
                            <p class="goods-detail-content-desc-item-select">已选<span class="single-row-text">{{goodsData.name}}</span></p>
                            <!-- 附加服务 -->
                            <div class="goods-detail-content-desc-item-support">
                                <ul class="goods-detail-content-desc-item-support-list" >
                                    <li class="goods-detail-content-desc-item-support-list-item"
                                        v-for="(item,index) in attachDatas" :key="index"
                                    >
                                        <img src="@img/support.svg" alt="" srcset="">
                                        <span>{{item}}</span>
                                    </li>
                                </ul>
                            </div>
                            <!-- 商品描述 -->
                            <div class="goods-detail-content-desc-detail">
                                <img v-for="(item,index) in goodsData.detailImgs" :key="index" :src="item" alt="">
                            </div>
                        </div>
                    </div>
                </template>
                

            </parallax>
        
        </div>
        <!-- 加入购物车、立即购买 -->
        <div class="goods-detail-buy" :class="{'iphonex-bottom': $store.state.isIphoneX}">
            <div class="goods-detail-buy-add" @click="onAddGoodsClick">
                加入购物车
            </div>
            <div class="goods-detail-buy-now" @click="onBuyClick()">
                立即购买
            </div>
        </div>
    </div>
</template>

<script>
import navigationBar from '@c/currency/NavigationBar';
import MySwiper from '@c/swiper/MySwiper';
import Direct from '@c/goods/Direct';
import Parallax from '@c/parallax/Parallax';
export default {
    name:'goodsDetail',
    components:{
        navigationBar,
        MySwiper,
        Direct,
        Parallax
    },
    data(){
        return{
            // swiper高度
            SWIPER_IMAGE_HEIGHT:364,
            // 锚点值
            ANCHOR_SCROLL_TOP:310,
            // navBarStyle:{
            //     backgroundColor:'',
            //     position:'fixed'
            // },
            goodsData:{},
            // 附加服务
            attachDatas:[
                '可配送海外',
                '京东发货&售后',
                '精准达',
                '211限时达',
                '可自提',
                '不可使用优惠卷',
            ],
            //页面滑动
            scrollValue:0, 
        }
    },
    created(){
        // 当我们直接在浏览器中，刷新页面的时候，vueRouter里面的params数据会被重置
        // 这个时候，我们拿到的goods===undefined
        /**
         * 刷新页面时，网页中url是始终保持不变的
         * 在url中添加上商品的标记，如id，去与后台返回数据形成一个映射
         * 1.在网页的URL中，添加上商品的标记(gooodsId)
         * 2.通过后台提供的接口，根据这个商品的标记来获取到对应的商品数据
         * 3.goodsData=从后台获取到的商品数据
         */
        this.loadGoodsData();
        // this.goodsData=this.$route.params.goods;
    },
    computed:{
        /**
         * 默认状态下左侧后退按钮的透明度
         */
        leftImgOpacity(){
            // 在home中，目的navBar逐渐显示 scroll/锚点值=opacity;
            // 默认状态下后退按钮逐渐隐藏的后退按钮：1-opacity；
            return 1-this.scrollValue/this.ANCHOR_SCROLL_TOP;
        },
        /**
         * navBar 的样式
         */
        navBarStyle(){
            return{
                backgroundColor:'rgba(216,30,6,'+this.navBarSlotOpacity+')',
                position:'fixed',
                top:0,
            }
        },
        /**
         * navBar插槽透明度
         * 默认状态下后退按钮逐渐隐藏的过程中，插槽逐渐显示
         */
        navBarSlotOpacity(){
            return 1-this.leftImgOpacity;
        }
    },
    methods:{
        /**
         * 后退当前页面
         */
        onBackClick(){
            this.$router.go(-1);
        },
        /**
         * 监听页面滑动
         */
        onScrollChange(scrollValue){
            // 获取当前页面的滑动值
            this.scrollValue=scrollValue;
        },
        /**
         * 根据商品id，获取到商品的数据
         */
        loadGoodsData(){
            this.$http.get('/goodsDetail',{
                params:{
                    goodsId:this.$route.query.goodsId
                }
            }).then(data=>{
                this.goodsData=data.goodsData;
            })
        },
        /**
         * 立即购买
         */
        onBuyClick(){
            this.$router.push({
                name:'buy',
                params:{
                    routerType:'push'
                },
                query:{
                    goodsId:this.goodsData.id
                }
            })
        },
        /**
         * 加入购物车
         */
        onAddGoodsClick(){
            // 保存商品到购物车中
            this.$store.commit('addShoppingData',this.goodsData);
            alert('添加成功');
            this.$router.push({
                name:'home',
                params:{
                    routerType:'push',
                    // 自定义标记,在toolbar中定义的tab数据源数据的下标
                    componentIndex:1,
                     //自定义标记，清空虚拟任务栈
                    clearTask:true
                }
            })
        }
    }

}
</script>
<style lang="scss" scoped>
@import '@css/style.scss';
.goods-detail{
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    flex-flow: column;
    &-nav-left{
        width:100%;
        display: flex;
        // 两个图片重合
        position: relative;
        img{
            position: absolute;
            align-self: center;
        }
    }
    &-nav-title{
        width:100%;
        height: 100%;
        font-size:$titleSize;
        font-weight: bold;
        text-align: center;
        color: white;
    }
    &-content{
        height: 100%;
        overflow: hidden;
        &-desc{
            width: 100%;
            background-color:$bgColor;
            box-shadow: 0 0 px2rem(16) 0 rgba(0,0,0,0.2);
            &-item{
                background-color: white;
                padding:$marginSize;
                margin-bottom: $marginSize;
                // 价格
                &-price{
                    font-size: px2rem(20);
                    color: $mainColor;
                    font-weight: 500;
                }
                // 名称
                &-name{
                    margin-top: $marginSize;
                    font-size: $titleSize;
                    font-size: 500;
                    line-height: px2rem(20);
                }
                // 已选商品
                &-select{
                    font-size:$infoSize;
                    color:$hintColor;
                    height: px2rem(44);
                    display: flex;
                    align-items: center;
                    border-bottom: px2rem(1) solid $lineColor;

                    span{
                        color: $textColor;
                        font-size: $titleSize;
                        font-weight: bold;
                        margin-left:px2rem(4);

                    }

                }
                // 附加服务
                &-support{
                    margin-top:$marginSize;
                    &-list{
                        display: flex;
                        flex-wrap:wrap;
                        &-item{
                            display: flex;
                            align-items: center;
                            padding: px2rem(6) 0;
                            margin-right:$marginSize;
                            img{
                                width:px2rem(12) ;
                                margin-right:px2rem(4);
                            }
                            span{
                                font-size:$minInfoSize;
                                color: $hintColor;
                            }
                        }
                    }
                }
            }
            // 描述
            &-detail{
                img{
                    width: 100%;
                }
            }
        }
        
    }
    &-buy{
        background-color:'#fff';
        border-top: px2rem(1) solid $lineColor;
        height: px2rem(46);
        line-height: px2rem(46);
        text-align: right;
        div{
            display: inline-block;
            width: px2rem(100);
            text-align: center;
            font-size:$infoSize;
            color:white;

        }
        &-add{
            background-color: $mainColor;
        }
        &-now{
            background-color:darkgoldenrod ;
        }
    }

}
</style>
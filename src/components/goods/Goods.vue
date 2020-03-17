<template>
<!-- 
    如何在一个组件里展示不同的样式
    1.html表示整个布局的结构，具体的展示样式，将由css决定
    2.每种展示样式对应不同的css，也就是对应不同的类名
        垂直列表 goods-list
        网格布局 goods-grid
        瀑布流布局 goods-waterfall
    3.实现不同的展示形式，本质上就是实现不同的css样式    
    瀑布流布局：
    1.创建商品列表的基本html，让item相对于goods div进行排列
    2.生成不同高度的图片，撑起不同高度的item
    3.计算item的位置来达到从上到下，从左到右排列的目的
 -->
 <!-- 
     商品排序：
     1.排序之后的数据源，用来在html中进行展示(替换掉dataSource)
     2.定义排序规则（可以直接使用GoodsOptions中数据源的id）
     3.定义排序的方法，根据修改对应的规则来修改对应的排序

  -->
  <div class="goods" :class="[layoutClass,{'goods-scroll':isScroll}]" :style="{height:goodsViewHeight}">
      <div class="goods-item" :class="layoutItemClass" ref="goodsItem"
      v-for="(item,index) in sortGoodsData" :key="index" :style="goodsItemStyles[index]">
        <!-- 图片 -->
        <img class="goods-item-img" :src="item.img" :style="imgStyles[index]" alt="">
        <!-- desc->description(描述) -->
        <div class="goods-item-desc">
            <p class="goods-item-desc-name text-line-2" :class="{'goods-item-desc-name-hint':!item.isHave}">
                <!-- 是否为直营 -->
                <direct v-if="item.isDirect"></direct>
                <!-- 是否有库存 -->
                <no-have v-if="!item.isHave"></no-have>
                {{item.name}}
            </p>
            <div class="goods-item-desc-data">
                <p class="goods-item-desc-data-price">¥{{item.price | priceValue}}</p>
                <p class="goods-item-desc-data-volume">销量:{{item.volume}}</p>
            </div>
        </div>
      </div>

  </div>
</template>

<script>
import Direct from '@c/goods/Direct.vue';
import NoHave from '@c/goods/NoHave.vue';
export default {
    components:{
        Direct,
        NoHave
    },
    props:{
        /**
         * 在父元素中指定的展示形式
         * 1.垂直列表
         * 2.网格布局
         * 3.瀑布流布局
         */
        layoutType:{
            type:String,
            default:'1'
        },
         /**
             * 是否允许goods单独滑动，默认允许
             */
        isScroll:{
            type:Boolean,
            default:true
        },
        /**
         * 定义排序规则(依赖数据源GoodsOptions数据源的id)
         * 1.默认
         * 1-2.价格由高到低进行排序
         * 1-3.销量由到低
         * 2.有货优先
         * 3.直营优先
         */
        sort:{
            type:String,
            default:'1',
        }
    },
    data(){
        return{
            // 排序数据源
            sortGoodsData:[],
            // 数据源
            dataSource:[],
            // 最大图片高度
            MAX_IMG_HEIGHT:230,
            //最小图片高度
            MIN_IMG_HEIGHT:178,
            // 图片样式集合
            imgStyles:[],
            // item margin
            ITEM_MARGIN_SIZE:8,
            //item 样式集合
            goodsItemStyles:[],
            // goods组件的高度
            goodsViewHeight:'100%',
            // 不同展示形式下的类名
            // 垂直列表的展示形式(默认)-->goods-list & goods-list-item
            // 网格布局的展示形式-->goods-grid & goods-grid-item
            layoutClass:'goods-list',
            layoutItemClass:'goods-list-item',
        }
    },
    created(){
        this.initData();
    },
    methods:{
        /**
         * 获取数据
         */
        initData(){
            this.$http.get("/goods").then(data=>{
                this.dataSource=data.list;
                //数据排序
                this.setSortGoodsData(); 
                 // 设置布局
                this.initLayout();
            }).catch(err => {
                console.log(err.response)
            });
        },
        /**
         * 商品排序
         */
        setSortGoodsData(){
            switch(this.sort){
                // 默认
                case '1':
                // 深拷贝无引用类型数组
                    this.sortGoodsData=this.dataSource.slice(0);
                    break;
                // 价格由高到低进行排序
                case '1-2':
                    this.getSortGoodsDataFromKey('price');
                    break;
                // 销量由高到低进行排序
                case '1-3':
                    this.getSortGoodsDataFromKey('volume');
                    break;
                // 有货优先
                case '2':
                    this.getSortGoodsDataFromKey('isHave');
                    break;
                // 直营优先
                case '3':
                    this.getSortGoodsDataFromKey('isDirect');
                    break;    
            }
        },
        // 根据传入的key进行排序
        getSortGoodsDataFromKey(key){
            /**
             * sort可以完成数组的数据排序
             * 当参数(函数)返回值为负值，表示goods1排列goods2之前
             * 当参数(函数)返回值为正值，表示goods1排列在goods2之后
             * 接受的值为0的时候，表示排序不变
             */
            console.log('1111',this.sortGoodsData)
            this.sortGoodsData.sort((goods1,goods2)=>{
                // 根据传入的key获取对应的value
                let v1=goods1[key],
                v2=goods2[key];
                // 对value进行对比
                // boolean 类型的值(有货优先和直营优先)
                if(typeof v1==='boolean'){
                    if(v1){
                        return -1;
                    }
                    if(v2){
                        return 1;
                    }
                    return 0;
                }
                // float类型值的处理(价格，销量)
                if(parseFloat(v1)>=parseFloat(v2)){
                    return -1;
                }
                return 1;


            });
        },
        /**
         * 设置布局，为不同的layoutType设置不同的展示形式
         * 1.初始化影响到布局的一些数据
         *  goodsViewHeight(goods组件高度) ->垂直布局、网格布局(100%),瀑布流(实际高度)
         *  goodsItemStyles
         *  imgStyles
         * 2.为不同的layoutType设置不同的展示类
         */
        initLayout(){
            // 初始化数据
            this.goodsViewHeight='100%';
            this.goodsItemStyles=[];
            this.imgStyles=[];
            // 为不同的layoutType设置不同的展示类
            switch(this.layoutType){
                // 垂直布局
                case '1':
                    this.layoutClass='goods-list';
                    this.layoutItemClass='goods-list-item';
                    break;
                //网格布局
                case '2':
                    this.layoutClass='goods-grid';
                    this.layoutItemClass='goods-grid-item';
                    break;
                //瀑布流布局
                case '3':
                    this.layoutClass='goods-waterfall';
                    this.layoutItemClass='goods-waterfall-item';
                    this.initImgStyles();
                    // 调用创建瀑布流的方法(等到dom创建完成之后)
                    this.$nextTick(()=>{
                        this.initWaterfall();
                    })
                    break;    
            }
        },
        /**
         * 返回随机图片的高度
         */
        imgHeight(){
            // 方法利用Math.radom()->0-1随机数*高度区间+最低图片高度
            let result = Math.floor(Math.random()*(this.MAX_IMG_HEIGHT-this.MIN_IMG_HEIGHT)+this.MIN_IMG_HEIGHT);
            return result;
        },
        /**
         * 根据随机图片高度，生成对应的图片样式数据
         */
        initImgStyles(){
            this.dataSource.forEach((item)=>{
                // 随机生成图片高度
                let imgHeight=this.imgHeight()+'px';
                this.imgStyles.push({
                    height:imgHeight
                })
            })
        },
        /**
         * 瀑布流布局
         * 1.获取到所有的item元素
         * 2.遍历item元素，得到每一个item高度，加上一个margin的高度
         * 3.创建两个变量：leftHeightTotal，rightHeightTotal分别表示两侧目前距离顶部的高度。
         * 通过对比两个高度来确定item的放置位置。
         * 如果leftHeightTotal<=rightHeightTotal,那么item就应该放置到左侧。此时item左侧为0，距离顶部为当前的leftHeightTotal，
         * 否则item放置在右侧，此时item距离右侧为0，距离顶部为当前的rightHeightTotal。
         * 4.保存计算出的所有item样式，配置到item上
         * 5.item配置完成后，对比左右两侧最大的高度，最大的高度为goods组件的高度
         * 
         * 
         */
        initWaterfall(){
            // 获取到所有的item元素
           let $goodsItems=this.$refs.goodsItem;
           if(!$goodsItems) return;
            //左右两侧距离顶部的高度
            let leftHeightTotal=0,rightHeightTotal=0;    
            //遍历item元素，得到每一个item高度，加上一个margin的高度    
           $goodsItems.forEach(($el,index)=>{
                //item样式
                let goodsItemStyle={};    
               //遍历item元素，得到每一个item高度，加上一个margin的高度 
               let elHeight=$el.clientHeight+this.ITEM_MARGIN_SIZE;
                //对比左右两侧距离顶部的高度
               if(leftHeightTotal<=rightHeightTotal){
                //item左侧为0，距离顶部为当前的leftHeightTotal
                goodsItemStyle={
                    left:0+'px',
                    top:leftHeightTotal+'px'
                }
                // 更新左侧距顶部的高度
                leftHeightTotal+=elHeight;
               }else{
                // 否则item放置在右侧，此时item距离右侧为0，距离顶部为当前的rightHeightTotal。
                   goodsItemStyle={
                    right:0+'px',
                    top:rightHeightTotal+'px'
                    } 
                    // 更新右侧距顶部的高度
                    rightHeightTotal+=elHeight;
               } 
                // 保存计算出的所有item样式，配置到item上
                this.goodsItemStyles.push(goodsItemStyle);
           })
        // 在不允许Goods单独滑动的时候
            if(!this.isScroll){
                //    对比左右两侧最大的高度，最大的高度为goods组件的高度
                this.goodsViewHeight=(leftHeightTotal>rightHeightTotal?leftHeightTotal:rightHeightTotal)+'px';    

            }
        },


    },
    watch:{
        /**
         * 监听layoutType
         */
        layoutType(){
            this.initLayout();
        },
        /**
         * 监听sort的改变
         */
        sort(){
            this.setSortGoodsData();
        }
    }


}
</script>
<style lang="scss" scoped>
@import '@css/style.scss';
.goods{
    background-color: $bgColor;
    &-scroll{
        overflow:hidden;
        overflow-y:auto;
    }
    &-item{
        background-color: #fff;
        padding:$marginSize;
        box-sizing: border-box;
        &-desc{
            width:100%;
            &-name{
                font-size: $infoSize;
                line-height: px2rem(18);
                &-hint{
                    color: $hintColor;
                }
            }
            &-data{
                width:100%;
                display: flex;
                align-items: center;
                justify-content: space-between;
                margin-top: $marginSize;
                &-price{
                    font-size: $titleSize;
                    color: $mainColor;
                    font-weight: 500;
                }
                &-volume{
                    font-size: $infoSize;
                    color:$hintColor;
                }
            }
        }
    }
}
// 垂直列表
.goods-list{
    &-item{
        display: flex;
        border-bottom: 1px solid $lineColor;
        .goods-item-img{
            width: px2rem(120);
            height: px2rem(120);
        }
        .goods-item-desc{
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            padding: $marginSize;
        }
    }
}
// 网格布局
.goods-grid{
    padding: $marginSize;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    &-item{
        width: 49%;
        border-radius: $radiusSize;
        margin-bottom: $marginSize;
        .goods-item-img{
            width: 100%;
        }
    }
}
// 瀑布流
.goods-waterfall{
    position: relative;
    margin: $marginSize;
    &-item{
        position: absolute;
        width: 49%;
        border-radius: $radiusSize;
        .goods-item-img{
            width: 100%;
        }

    }
}
</style>
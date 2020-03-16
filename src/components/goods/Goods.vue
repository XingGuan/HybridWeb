<template>
<!-- 
    瀑布流布局：
    1.创建商品列表的基本html，让item相对于goods div进行排列
    2.生成不同高度的图片，撑起不同高度的item
    3.计算item的位置来达到从上到下，从左到右排列的目的
 -->
  <div class="goods goods-waterfall" :style="{height:goodsViewHeight}">
      <div class="goods-item goods-waterfall-item" ref="goodsItem"
      v-for="(item,index) in dataSource" :key="index" :style="goodsItemStyles[index]">
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
    data(){
        return{
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
            goodsViewHeight:0
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
                this.initImgStyles();
                // 调用创建瀑布流的方法(等到dom创建完成之后)
                this.$nextTick(()=>{
                    this.initWaterfall();
                })

            }).catch(err => {
                console.log(err.response)
            });
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
        //    对比左右两侧最大的高度，最大的高度为goods组件的高度
            this.goodsViewHeight=(leftHeightTotal>rightHeightTotal?leftHeightTotal:rightHeightTotal)+'px';    

        }

    }

}
</script>
<style lang="scss" scoped>
@import '@css/style.scss';
.goods{
    background-color: $bgColor;
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
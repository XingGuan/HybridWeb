import Vue from 'vue';
/**
 * 金额数据处理
 * @param value调用过滤器时传入的文本
 */
Vue.filter('priceValue',function(value){
    //如果文本不存在返回空字符
    if(!value){
        return '0.00';
    }
    //文本转化为float
    let result=parseFloat(value);
    //如果当前文本为Interger类型的文本，表示当前文本没有小数
    if(Number.isInteger(result)){
        return result;
    }
    //文本包含小数,result.toFixed(2)
    return result.toFixed(2);
});
/**
 * 时间过滤器
 */
Vue.filter('filterTime',function(value){
    if(!value){
        return '';
    }
    // value 不是时：分：秒的时间格式
    if(value.indexOf(":")===-1){
        return value;
    }
    let result='';
    // arr[0] 小时
    // arr[1] 分钟
    // arr[2] 秒数
    const arr=value.split(":");
    //对小时，分钟，秒数补0
    return result=arr[0].padStart(2,0)+':'+arr[1].padStart(2,0)+':'+arr[2].padStart(2,0);
})
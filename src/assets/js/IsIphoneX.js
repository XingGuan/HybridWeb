/**
 * 判断当前设备是否为IphoneX
 * @return boolean true 表示当前设备为iphoneX。false就表示不为iphoneX。
 * 
 */
const isIphoneX=()=>{
    // window对象存在执行逻辑
    if(typeof window !=='undefined' && window){
        // window.navigator.userAgent 如果他包含iphone表示当前的设备在IOS设备中运行
        // iphoneX及以上的设备屏幕垂直像素数大于812
        return /iphone/gi.test(window.navigator.userAgent) && window.screen.height>=812;
    }
    return false;
}
// 计算结果赋值给window对象下的一个属性
window.isIphoneX=isIphoneX();
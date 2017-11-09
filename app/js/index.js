/**
 * Created by z on 2017/10/23.
 */
const greeter = require('./greeter.js');
const deviceObj=require('../js/common/device.js');
// document.querySelector("#root").appendChild(greeter());
var container = $(".containerWrapper");
var main = $(".scrollWrapper");
var hei = document.body.clientHeight;
//    container.height = hei + "px";
//    var obj = $(".jumbotron");
//    for(var i=0;i<obj.length;i++){
//        if(obj[i].className == 'page'){
//            obj[i].style.height = hei + "px";
//        }
//    }
//如果不加时间控制，滚动会过度灵敏，一次翻好几屏
var startTime = 0, //翻屏起始时间
    endTime = 0,
    now = 0;
//检测是否为手机
var isMobile = deviceObj.mobile();

if(isMobile){//如果是手机
    var startx, starty;
//获得角度
    function getAngle(angx, angy) {
        return Math.atan2(angy, angx) * 180 / Math.PI;
    };

//根据起点终点返回方向 1向上 2向下 3向左 4向右 0未滑动
    function getDirection(startx, starty, endx, endy) {
        var angx = endx - startx;
        var angy = endy - starty;
        var result = 0;

//如果滑动距离太短
        if (Math.abs(angx) < 2 && Math.abs(angy) < 2) {
            return result;
        }

        var angle = getAngle(angx, angy);
        if (angle >= -135 && angle <= -45) {
            result = 1;
        } else if (angle > 45 && angle < 135) {
            result = 2;
        } else if ((angle >= 135 && angle <= 180) || (angle >= -180 && angle < -135)) {
            result = 3;
        } else if (angle >= -45 && angle <= 45) {
            result = 4;
        }

        return result;
    }
//手指接触屏幕
    document.addEventListener("touchstart", function(e) {
        startTime = new Date().getTime();
        startx = e.touches[0].pageX;
        starty = e.touches[0].pageY;
    }, false);
//手指离开屏幕
    document.addEventListener("touchend", function(e) {
        startTime = new Date().getTime();
        var endx, endy;
        endx = e.changedTouches[0].pageX;
        endy = e.changedTouches[0].pageY;
        var direction = getDirection(startx, starty, endx, endy);
        switch (direction) {
            case 0:
                //("未滑动！");
                break;
            case 1:
                console.log("向上！")
                if ((endTime - startTime) < -1000&&parseInt(main.css('top')) > -(hei*2)){
                    //向下滚动
                    now = now - hei;
                    toPage(now);
                }
                else{
                    event.preventDefault();
                }

                break;
            case 2:
                //("向下！")
                if ((endTime - startTime) < -1000&& parseInt(main.css('top')) < 0){
                    //向上滚动
                    now = now + hei;
                    toPage(now);
                }
                else{
                    event.preventDefault();
                }
                break;
            case 3:
                //("向左！")
                break;
            case 4:
                //("向右！")
                break;
            default:
        }
        endTime = new Date().getTime();
    }, false);
}
else{ //如果是电脑
    //浏览器兼容
    if ((navigator.userAgent.toLowerCase().indexOf("firefox")!=-1)){
        document.addEventListener("DOMMouseScroll",scrollFun,false);
    }
    else if (document.addEventListener) {
        document.addEventListener("mousewheel",scrollFun,false);
    }
    else if (document.attachEvent) {
        document.attachEvent("onmousewheel",scrollFun);
    }
    else{
        document.onmousewheel = scrollFun;
    }
    //滚动事件处理函数
    function scrollFun(event){
        try{
            startTime = new Date().getTime();
            var delta = event.detail || (-event.wheelDelta);
        }
        catch (e)
        {
            console.log(e.message)
        }
        //mousewheel事件中的 “event.wheelDelta” 属性值：返回的如果是正值说明滚轮是向上滚动
        //DOMMouseScroll事件中的 “event.detail” 属性值：返回的如果是负值说明滚轮是向上滚动
        if ((endTime - startTime) < -1000){
            console.log('top',main.css('top'))
            console.log('hei',hei*2);
            if(delta>0 && parseInt(main.css('top')) > -(hei*2)){
                //向下滚动
                now = now - hei;
                toPage(now);
            }
            if(delta<0 && parseInt(main.css('top')) < 0){
                //向上滚动
                now = now + hei;
                toPage(now);
            }
            endTime = new Date().getTime();
        }
        else{
            event.preventDefault();
        }
    }

}

function toPage(now){
    main.animate({top:(now+'px')},500);     //jquery实现动画效果
    //setTimeout("main.style.top = now + 'px'",1000);     javascript 实现动画效果
}

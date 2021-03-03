/*
时间倒计时插件
TimeDown.js


*/

let time=new Date();
function TimeDown(dom, endDateStr,type=0) {

    //2021-11-25 8:00:45
    let arr=endDateStr.split(':');
    let arr2=[]
    arr.map((item)=>{
        arr2.push(Number(item))
    })
    //console.log(arr2);

    let date=''+time.getFullYear()+'-'+(time.getMonth()+1)+'-'+time.getDay()+' '+(time.getHours()+arr2[0])+':'+(time.getMinutes()+arr2[1])+':'+(time.getSeconds()+arr2[2])


    //结束时间
    var endDate = new Date(date);


    //当前时间
    var nowDate = new Date();

    //相差的总秒数
    var totalSeconds = parseInt((endDate - nowDate) / 1000);
    //天数
    var days = Math.floor(totalSeconds / (60 * 60 * 24));


    console.log(days);
    //取模（余数）
    var modulo = totalSeconds % (60 * 60 * 24);
    //小时数
    var hours = Math.floor(modulo / (60 * 60));
    modulo = modulo % (60 * 60);
    //分钟
    var minutes = Math.floor(modulo / 60);
    //秒
    var seconds = modulo % 60;
    //输出到页面


    if (type === 0){
        document.getElementById(dom).innerHTML =   hours + "小时" + minutes + "分钟" + seconds + "秒";

    }else if (type === 1){
        console.log(1);
        document.getElementById(dom).innerHTML =   '还剩：'+days + "天" + hours + "小时" + minutes + "分钟" + seconds + "秒";

    }
       //延迟一秒执行自己
    setTimeout(function () {
        TimeDown(dom, endDateStr,type);
    }, 1000)
}

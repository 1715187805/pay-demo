<template>
    <div class="Pay">


        <div class="body">
            <h1 class="mod-title">
                <img :src="logo" alt="" class="ico_log ico-3">
            </h1>


            <div class="mod-ct">
                <div class="order"></div>
                <div class="amount">￥{{dt.money}}</div>
                <div>
                    <div>
                        <div style="position: relative;display: inline-block;">
                            <img id="show_qrcode" alt="加载中..." :src="dt.qrcode" width="210" height="210" style="display: block;">
                            <img  id="use" :src='type' style="position: absolute; top: 50%; left: 50%; width: 32px; height: 32px; margin-left: -16px; margin-top: -16px; ">
                        </div>
                    </div>
                </div>
                <div class="time-item">
                    <div class="time-item" id="msg">
                        <h1>付款后自动到账 未到账可联系我们</h1>
                    </div>
                    <strong id="time">
                        <strong></strong>
                        <strong></strong>
                        <strong></strong>
                    </strong>
                </div>

                <div class="tip">
                    <div class="ico-scan"></div>
                    <div class="tip-text">
                        <p>请使用{{txt}}扫一扫</p>
                        <p>扫描二维码完成支付</p>
                    </div>
                </div>

                <div class="detail" id="orderDetail">
                    <div id="desc" v-show="show">
                        <div class="title">
                            <p>账号</p>
                            <p>金额</p>
                            <p>云端单号</p>
                            <p>创建时间</p>
                            <p>过期时间</p>
                        </div>
                        <div  class="content">
                            <p>{{msg.pay_id}}</p>
                            <p>￥{{msg.money}}</p>
                            <p>{{msg.order_id}}</p>
                            <p>{{msg.serverTime}}</p>
                            <p>{{msg.endTime}}</p>
                        </div>

                    </div>

                    <div class="ico-arrow" @click="click">
                        <i class="ico" ></i>
                    </div>

                </div>

                <div class="tip-text"></div>


            </div>
            <div class="foot">
                <div class="inner">
                    <p>手机用户可保存上方二维码到手机中</p>
                    <p>在{{txt}}扫一扫中选择“相册”即可</p>
                </div>
            </div>

        </div>
        <div class="copyRight"></div>



    </div>
</template>

<script>

    function TimeDown(dom, endDateStr,type=0) {

        //结束时间
        var endDate = new Date(endDateStr);
        //console.log('结束',endDate);

        //当前时间
        var nowDate = new Date();

        //相差的总秒数
        var totalSeconds = parseInt((endDate - nowDate) / 1000);


        //天数
        var days = Math.floor(totalSeconds / (60 * 60 * 24));

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
            //document.getElementById(dom).innerHTML =   hours + "时" + minutes + "分" + seconds + "秒";


            document.getElementById(dom).children[0].innerHTML =   hours + "时" ;
            document.getElementById(dom).children[1].innerHTML =   minutes + "分" ;
            document.getElementById(dom).children[2].innerHTML =   seconds + "秒";

        }else if (type === 1){
            document.getElementById(dom).innerHTML =   '还剩：'+days + "天" + hours + "时" + minutes + "分" + seconds + "秒";

        }
        //延迟一秒执行自己
        let t=setTimeout(function () {

            if (hours === 0 && minutes === 0 && seconds === 0){
                clearTimeout(t);
                window.alert('二维码以失效！');
                return 0

            }

            TimeDown(dom, endDateStr,type);
        }, 1000)
    }


    export default {
        name: "Pay",

        data: () => {
            return {
                dt:{},
                type:'',
                logo:'',
                time:'',
                txt:'',
                show:false,
                msg:{}
            }
        },
        mounted() {
           this.dt=JSON.parse(this.$route.query.data);

           this.getdate();
           this.time=new Date();
           if (this.dt.type===3){
               this.type='https://p.ssl.qhimg.com/dmfd/120_120_80/t01465e54cb812cf7a7.webp';
               this.txt='微信';
               this.logo='https://codepay.fateqq.com/img/weixin.jpg'
           }else if(this.dt.type===1){
               this.type='https://p.ssl.qhimg.com/dmfd/120_120_80/t019fd6d8a186d430f3.png';

               this.txt='支付宝';
               this.logo='https://codepay.fateqq.com/img/alipay.jpg';
           }


            TimeDown('time',this.msg.endTime,0)

        },
        methods: {

            click(){
                let dom = document.getElementsByClassName('mod-ct')[0];
                if (!this.show){
                    dom.style.height='600px';
                }else{
                    dom.style.height='482px';
                }
                this.show = !this.show


            },
            getdate(){
                let creat =this.timestampToTime(this.dt.serverTime);
                let end = this.timestampToTime(this.dt.endTime);


                this.msg={
                    serverTime:creat,
                    endTime:end,
                    pay_id:this.dt.pay_id,
                    money:this.dt.money,
                    order_id:this.dt.order_id,
                }
            },
            timestampToTime(timestamp) {
                var  date =  new  Date(timestamp * 1000); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
                var Y = date.getFullYear() +  '-' ;
                var M = (date.getMonth()+1 < 10 ?  '0' +(date.getMonth()+1) : date.getMonth()+1) +  '-' ;
                var D = date.getDate() +  ' ' ;
                var h = date.getHours() +  ':' ;
                var m = date.getMinutes() +  ':' ;
                var s = date.getSeconds();
                return  Y+M+D+h+m+s;
            },

    },
    }
</script>

<style  scoped>

    .body{
        width:635px;
        margin: 0 auto;

    }
    .mod-title{
        margin-top:-50px;
        height: 63px;
        border:1px solid #e5e5e5;
        border-top: 0;
        background-color: #fff;
    }
    .amount{
        font-size: 48px;
        margin-top: 10px;
    }
    .ico_log{
        display: inline-block;
        width: 130px;
        height: 38px;
        vertical-align: middle;
        margin-right: 7px;
        background: no-repeat;
    }
    .mod-ct{
        position: relative;
        height: 482px;
        border:1px solid #e5e5e5;
        border-top: 0;
        background-color: #fff;

    }
    .order{
        width: 632px;
        height: 7px;
        margin: 0 auto;
        background-image:  url('../../assets/img/wave.png');
        background-position:-7px 0 ;
        text-align: center;
        color: #333;

    }

    .time-item h1{
        font-size: 15px;
    }
    #time strong{
        display: inline-block;
        width: 40px;
        margin: 5px;
        /*padding: 0 10px;*/
        background-color: #3ec742;
        color: #fff;
        font-family:Arial ;
        font-size: 15px;
        border-radius: 5px;

    }

    .tip{
        height: 1px;
        border-top: 1px dashed #e5e5e5;
    }

    .tip div{
        display: inline-block;
        vertical-align: middle;
        text-align: left;
    }
    .ico-scan{
        width:60px;
        height:55px;
        background: url('../../assets/img/pay.png') 0 0 no-repeat;
        margin-right: 10px;
    }
    .inner{
        font-size: 12px;
        color: #999;
    }

    .ico-arrow{

        position: absolute;
        bottom:0;
        left:45%;
        margin-bottom:5px ;
        padding: 6px 34px;
        border: 1px solid #e5e5e5;
        text-align: center;
        cursor: pointer;

    }
    .ico{
        display: block;
        width:20px;
        height:11px;
        background: url('../../assets/img/pay.png') -25px -100px no-repeat;
    }

    #desc{
        height:166px;
        margin: 0;
    }
    #desc div{
        display: inline-block;
        font-size: 12px;
    }
    .title{
        /*float: left;*/
        position: absolute;
        left:0;
        bottom:15px;
        text-align: left;
        margin-left: 10px;
    }
    .content{
        /*float: right;*/
        position: absolute;
        right:0;
        bottom:15px;
        text-align: right;
        margin-right: 10px;
    }

</style>
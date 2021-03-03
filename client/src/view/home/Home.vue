<template>
    <div class="Home">
        {{msg}}

        <!--<}

        <!"dt"></div>-->

        <div @click="typeClick" style="background-color: aqua">支付方式</div>

        <p>{{pay}}</p>
        <div>
            <span @click="click" class="button">1.00</span>
            <span @click="click" class="button">10.00</span>
            <span @click="click" class="button">30.00</span>
            <span @click="click" class="button">120.00</span>


            <div class="anment">{{time}}</div>
            <img :src="dt.qrcode" alt="">
        </div>
    </div>
</template>

<script>
    import {createShop,getStatus} from "api/api";

    export default {
        name: 'App',
        data:()=>{
            return {
                dt:{},
                time:'',
                msg:'',
                typ:['支付宝','QQ','微信'],
                pay:'',
                type:3

            }
        },
        components: {

        },
        mounted(){
            this.pay=this.typ[this.type-1]
        },
        methods:{
            click(e){
                //console.log(e.target.innerHTML);
                if (this.type===2){
                    window.alert('QQ支付需要先添加QQ好友，QQ：3183933510');

                }
                this.create(e.target.innerHTML);

            },
            typeClick(){
                this.type --;
                if (this.type===0){
                    this.type=3
                }
                this.pay=this.typ[this.type-1]
            },
            async create(m){
                let date=new Date().getTime();
                // console.log(date);


                let res = await  createShop(
                    {
                        price:m ,          //价格
                        pay_id:date,            //用户ID,订单ID,用户名确保是唯一
                        type:this.type,               //支付方式 1：支付宝 2：QQ钱包 3：微信支付

                    },
                    'http://licx.free.idcfengye.com/msg'
                );

                //fackpay
                /*

                {
                        fee:"1.00",                                         //$
                        timestamp:date, //Time
                        order_id:date,                                  //id
                        remark:"NTeen",                                      //备注
                        notice_url:"http://licx.free.idcfengye.com/",    //异步回调地址
                        cancel_url:"http://www.licx.world",                 //取消订单返回地址
                        return_url:"http://www.qq.com",                     //同步回调地址
                        paytype:"1"                                         //支付方式
                    }
                *
                * */

                if (res){
                    this.dt=res;
                    console.log(res);


                    this.$router.history.push({
                        path:'/pay',
                        query:{data:JSON.stringify(this.dt)}
                    });
                    this.msg='等待支付';
                    let status=setInterval(async ()=>{
                        let r = await getStatus({
                            order_id:this.dt.order_id,
                        });



                        if (r.pay_time !== 0){
                            window.clearInterval(status);
                            this.msg='支付成功';


                            let date=setTimeout(()=>{
                                this.msg='';
                            },3000)
                            window.clearInterval(date);

                        }
                    },5000);//服务端向浏览器 推送消息




                }
                let obj={
                    "userID": 639885,                                   //码支付id
                    "money": "0.05",                                    //实际付款金额
                    "price": "0.01",                                    //原价
                    "chart": "utf-8",                                   //编码
                    "pay_id": "1614362543911",                          //支付唯一标识
                    "type": 1,                                          //支付类型  支付宝，QQ，微信，
                    "call": "",
                    "trueID": 639885,                                   //码支付id
                    "tag": "0",                                         //备注
                    "qr_user": 0,
                    "come": 2,
                    "trade_no": "1161436267416398857556568371",
                    "endTime": 1614363034,                              //过期时间戳，超时过期
                    "order_id": "1753067161234",                        //云订单id
                    "status": 0,                                        //状态0成功，-1失败 -2参数错误
                    "msg": "ok",                                        //信息
                    "mode": 0,
                    "mobile": 0,
                    "qrcode": "https://qr.kjkl8.com/qr/639885/1/0/05_0.png?t=1614362675&sign=3d512935c5b827b5b699bd87be619a20&money=0.05",
                    //二维码地址
                    "kfqq": "",
                    "https": 0,
                    "notiry_host": "https://notify.yy2169.com:51889",
                    "serverTime": 1614362675,                           //云端时间戳（准确核对订单超时）
                    "notiry_key": "2eff42ee82ccd79201f0c4729dafa1c6"    //同步通知密匙
                }
            },


        }


    }

</script>

<style  scoped>


    .pay{
        display: inline-block;
    }
    .button{
        display: inline-block;
        width:80px;
        height: 30px;
        line-height: 30px;
        /*margin: 0 auto;*/
        margin:5px;
        border: 1px solid black;
        border-radius: 50px;
        background-color: lightseagreen;
    }
    .button:hover{
        background-color: aqua;
    }
</style>
const koa =require('koa');
const Router=require('koa-router');
const fs=require('fs');
const static =require('koa-static');
const bodyParser=require('koa-bodyparser');
const app=new koa();
const router=new Router();



app.use(bodyParser());
app.use(static('./public'));
app.use(router.routes());






router.post('/msg',async (cxt)=>{
    let{pay_id,pay_no}=cxt.request.body;


    console.log(pay_id,'订单流水',pay_no);





    cxt.body='success'
})


app.listen(6000,()=>{
    console.log(new Date,'6000端口启动');
})
# pay
自述文件
===========

demo所用接口为码支付提供，个人使用需到码支付平台进行配置所需关键参数
码支付官网地址：[[码支付]](https://codepay.fateqq.com/home.html)


```JavaScript
/*
  id=商户id
  token=平台提供
  price=价格
  pay_id=特征码（订单号，确保唯一）
  page=付款页面方式
  type=支付方式  （1支付宝，2QQ，3微信 ）
  ${r}=通知地址，比如说你的服务器后台地址
*/


//创建订单接口
api=‘http://api5.xiuxiu888.com/creat_order?id=639885&token=non4cbORURPqC1UGlRKRZSTlPF0tPHqn&price=${price}&pay_id=${pay_id}&page=3&type=${type}${r}’

//查询订单状态
api='http://api5.xiuxiu888.com/ispay?id=639885&order_id=${order_id}&token=non4cbORURPqC1UGlRKRZSTlPF0tPHqn'

```

本地测试时，由于服务端接口为 localhost:6000 类型地址，需要用到接口转发软件

百度搜索 sunny-Ngrok教程自行配置 官网地址：[[http转发]](https://www.ngrok.cc/)


其他问题请联系本人 或自行解决

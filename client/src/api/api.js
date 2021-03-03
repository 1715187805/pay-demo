
import request from './request'
//import  md5 from 'md5' //加密



//创建订单
export const createShop=(data,r)=>{
    let {price,pay_id,type}=data;
    r='&notify_url='+r;

    let url = `/api/creat_order?id=639885&token=non4cbORURPqC1UGlRKRZSTlPF0tPHqn&price=${price}&pay_id=${pay_id}&page=3&type=${type}${r}`;


    return request(url);
}


//查询订单状态
export const getStatus=(data)=>{
    let {order_id}=data;
    let url = `/api/ispay?id=639885&order_id=${order_id}&token=non4cbORURPqC1UGlRKRZSTlPF0tPHqn`;

    return request(url);
}




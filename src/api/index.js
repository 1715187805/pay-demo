
import request from './request'
import  md5 from 'md5' //加密



export const createShop=(data)=>{
    let url='/api/Pay/254/'; //882商户id
    let Token='5E998E97EA20F81F7CE485AC498BE610';       //商户Token

    let{fee,order_id,paytype,remark,notice_url,return_url,cancel_url,timestamp}=data;

    let string='Token=' + Token + '&fee='+fee+'&timestamp='+timestamp+'&order_id='+order_id;  //md5排序字符
    let st=Token+fee+''+timestamp+order_id;  //md5排序字符


    let SignKey = md5(st).toUpperCase();//加密并大写

    url=url+SignKey+`?fee=${fee}&order_id=${order_id}&paytype=${paytype}&remark=${remark}&notice_url=${notice_url}&return_url=${return_url}&cancel_url=${cancel_url}&timestamp=${timestamp}`;

    console.log(url);


    let s='/api/Pay/1/'+SignKey;

    console.log(string,st,s);
    //let a='/api/Pay/1/F88C2D6387EAD00AE85D600715AC81F2?fee=1.00&order_id=111&paytype=1&remark=demo&notice_url=http://licx.free.idcfengye.com/msg&return_url=http://www.licx.world&cancel_url=http://www.baidu.com&timestamp=1566790000395';
    return request(url);
}


// let a='/api/Pay/1/F88C2D6387EAD00AE85D600715AC81F2?fee=1.00&order_id=111&paytype=1&remark=demo&notice_url=http://licx.free.idcfengye.com/msg&return_url=http://www.licx.world&cancel_url=http://www.baidu.com&timestamp=1566790000395';
//
//
// console.log(a);






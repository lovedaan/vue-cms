/*
* @Author: Marte
* @Date:   2017-11-06 12:28:03
* @Last Modified by:   Marte
* @Last Modified time: 2017-11-06 14:54:58
*/

'use strict';

export const getCountNumber = (state)=>{
    let ret = state.countInfo;
    let count = 0;
    //累加所有加入购物车的商品的总和
    if(ret.length){
        for(let i = 0; i<ret.length;i++){
            count += parseInt(ret[i].count);
        }
    }
    return count;
}

/*
 * @Author: Marte
 * @Date:   2017-11-05 20:58:58
 * @Last Modified by:   Marte
 * @Last Modified time: 2017-11-08 10:15:20
 */

'use strict';
import * as types from './types'
import storage from 'util/storage'

function findCountIndex (arr,id) {
    if(!arr.length){
        return -1;
    }
    return arr.findIndex((item)=>{
        return item.id  === id;
    })
}

const mutations = {
    [types.setCount](state,info) {
        let oldData = storage('count') ? JSON.parse(storage('count')) : [];
        let index = findCountIndex(oldData,info.id);
        if(index >= 0){
            //已经存在了，累加count就行
            oldData[index].count = parseInt(oldData[index].count)+info.count;

        }else{
            //不存在，就增加进去
            oldData.push(info);
        }

        state.countInfo = oldData;
        storage('count',oldData);
    },
    [types.changeCarCount](state,info){

        let oldData = storage('count') ? JSON.parse(storage('count')) : [];
        let index = findCountIndex(oldData,info.id);
        console.log(info.count);
        oldData[index].count = info.count;
        state.countInfo = oldData;
        storage('count',oldData);
    },
    [types.setHeaderTitle](state,title){
        state.headerTitle = title;
    }
};

export default mutations
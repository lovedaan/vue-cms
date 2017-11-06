/*
 * @Author: Marte
 * @Date:   2017-11-05 20:59:17
 * @Last Modified by:   Marte
 * @Last Modified time: 2017-11-06 14:22:17
 */

'use strict';

import storage from 'util/storage'

/*检查是否是对象，对象是否为空，不是对象的和对象为空的都返回true,是对象就放回false*/
function isObject (obj) {
    if(typeof obj != 'object') return true;
    for(let k in obj)
        return false;
    return true;
}

let infos = storage('count') ? JSON.parse(storage('count')) : [];

const state = {
    countInfo: infos
};

export default state
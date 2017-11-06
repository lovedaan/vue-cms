/*
* @Author: Marte
* @Date:   2017-11-06 13:58:36
* @Last Modified by:   Marte
* @Last Modified time: 2017-11-06 14:03:00
*/

'use strict';
const storage = (key,val)=>{
    if(val){
        val = typeof val == 'object' ? JSON.stringify(val) : val;
        window.localStorage.setItem(key,val);
    }else if(val == ''){
        window.localStorage.removeItem(key);
    }else{
        return window.localStorage.getItem(key);
    }
}

export default storage
/*
* @Author: Marte
* @Date:   2017-11-02 11:54:00
* @Last Modified by:   Marte
* @Last Modified time: 2017-11-02 12:22:42
*/

'use strict';
/*
注册过滤器：
Vue.filter('formatDate',function (val) {

});
 */

const filterDefine = {
    /*
        格式化时间格式
        过滤器名称：formatDate
     */
    formatDate(val){
        let date = new Date(val);
        let y = date.getFullYear();
        let M = date.getMonth() + 1 + '';
        M = M.padStart(2,'0');
        let d = date.getDate() + '';
        d = d.padStart(2,'0');
        let h = date.getHours() + '';
        h = h.padStart(2,'0');
        let m = date.getSeconds() + '';
        m = m.padStart(2,'0');
        let s = date.getMinutes() + '';
        s = s.padStart(2,'0');

        return `${y}-${M}-${d} ${h}:${m}:${s}`;
    }
};

export default filterDefine;
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

import router from './router'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style'

import 'common/public/css/icons-extra.css'
import 'common/css/index'

Vue.use(MintUI);

Vue.config.productionTip = false


//注册全局过滤器
import filters from 'util/filter'

Object.keys(filters).forEach((key) => {
    return Vue.filter(key, filters[key]);
});


/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: {
        App
    }
})
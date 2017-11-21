// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import store from './store/index'

import router from './router'
import {Button,Field ,Swipe, SwipeItem,Switch ,Header ,DatetimePicker } from 'mint-ui'
//import 'mint-ui/lib/style'

import 'common/css/iconfont'
import 'common/css/index'

Vue.component(Button.name, Button);
Vue.component(Field.name, Field);
Vue.component(Switch.name, Switch);
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
Vue.component(Header.name, Header);
Vue.component(DatetimePicker.name, DatetimePicker);

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
    store,
    template: '<App/>',
    components: {
        App
    }
})
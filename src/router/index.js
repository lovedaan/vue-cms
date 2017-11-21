import Vue from 'vue'
import Router from 'vue-router'
import Main from 'components/main'
const home = (resolve)=>{
	import('components/home/home').then(module=>{
		resolve(module);
	});
}
const Home = (resolve)=>{
	import('components/home/home').then(module=>{
		resolve(module);
	});
}
const Me = (resolve)=>{
	import('components/me/me').then(module=>{
		resolve(module);
	});
}
const Cart = (resolve)=>{
	import('components/cart/cart').then(module=>{
		resolve(module);
	});
}
const Member = (resolve)=>{
	import('components/member/member').then(module=>{
		resolve(module);
	});
}
const Search = (resolve)=>{
	import('components/search/search').then(module=>{
		resolve(module);
	});
}
const NewsList = (resolve)=>{
	import('components/newslist/newslist').then(module=>{
		resolve(module);
	});
}
const NewsDetail = (resolve)=>{
	import('components/newsDetail/newsDetail').then(module=>{
		resolve(module);
	});
}
const pictureList = (resolve)=>{
	import('components/pictureList/pictureList').then(module=>{
		resolve(module);
	});
}
const picDetail = (resolve)=>{
	import('components/picDetail/picDetail').then(module=>{
		resolve(module);
	});
}
const goodsList = (resolve)=>{
	import('components/goodslist/goodslist').then(module=>{
		resolve(module);
	});
}
const GoodsDetail = (resolve)=>{
	import('components/goodsDetail/goodsDetail').then(module=>{
		resolve(module);
	});
}
/*import Home from 'components/home/home'
import Me from 'components/me/me'
import Cart from 'components/cart/cart'
import Member from 'components/member/member'
import Search from 'components/search/search'
import NewsList from 'components/newslist/newslist'
import NewsDetail from 'components/newsDetail/newsDetail'
import pictureList from 'components/pictureList/pictureList'
import picDetail from 'components/picDetail/picDetail'
import goodsList from 'components/goodslist/goodslist'
import GoodsDetail from 'components/goodsDetail/goodsDetail'*/
Vue.use(Router)

export default new Router({
    linkActiveClass: 'tui-nav-active',
    routes: [{
        path: '/',
        name: 'Main',
        component: Main,
        children: [{
            path: 'home',
            name: 'home',
            component: Home
        }, {
            path: 'cart',
            name: 'cart',
            component: Cart
        }, {
            path: 'me',
            name: 'me',
            component: Me
        }, {
            path: 'member',
            name: 'member',
            component: Member
        }, {
            path: 'search',
            name: 'search',
            component: Search
        }]
    }, {
        path: '/newslist',
        name: 'newslist',
        component: NewsList,
        children: [{
            path: 'newsDetail/:newid',
            name: 'newsDetail',
            component: NewsDetail
        }]
    }, {
        path: '/picList',
        name: 'pictureList',
        component: pictureList,
        children: [{
            path: 'picDetail/:imgid',
            name: 'picDetail',
            component: picDetail
        }]
    }, {
        path: '/goodslist',
        name: 'goodslist',
        component: goodsList,
        children: [{
            path: 'goodsDetail/:goodsid',
            name: 'goodsDetail',
            component: GoodsDetail
        }]
    }]
})
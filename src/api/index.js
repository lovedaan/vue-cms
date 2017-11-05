/*
 * @Author: Marte
 * @Date:   2017-11-02 10:26:29
 * @Last Modified by:   Marte
 * @Last Modified time: 2017-11-05 20:16:05
 */

'use strict';

import axios from 'axios';
import {
    Indicator
} from 'mint-ui';

//axios的一些配置
// 请求发出去的时候，显示loading
axios.interceptors.request.use(function(config) {
    console.log('请求发出了=============');
    Indicator.open({
        text: '数据加载中...',
        spinnerType: 'fading-circle'
    });

    return config;
}, function(error) {
    // Do something with request error
    return Promise.reject(error);
});

// 请求回来，结束loading
axios.interceptors.response.use(function(response) {
    console.log('请求回来了=============');
    setTimeout(() => {
        Indicator.close();
    }, 500);
    return response;
}, function(error) {
    // Do something with response error
    return Promise.reject(error);
});

//const baseURI = 'http://vue.studyit.io/';
axios.defaults.baseURL = 'http://vue.studyit.io/'; //设置请求根路径
//获取首页轮播图数据
export const getHomeBanner = () => {
    return new Promise((resolve, reject) => {
        const url = 'api/getlunbo';
        axios.get(url).then((res) => {
            if (res.data.status == 0) {
                resolve(res.data);
            } else {
                reject(res.data);
            }
        }).catch((err) => {
            reject(err);
        });
    });
}

//获取新闻列表数据
export const getNewsList = () => {
    return new Promise((resolve, reject) => {
        const url = 'api/getnewslist';
        axios.get(url).then((res) => {
            if (res.data.status == 0) {
                resolve(res.data);
            } else {
                reject(res.data);
            }
        }).catch((err) => {
            reject(err);
        });
    });
}

//获取图文资讯详情,接收一个newid参数
export const getNewsDetail = (newid) => {
    return new Promise((resolve, reject) => {
        const url = `api/getnew/${newid}`;
        axios.get(url).then((res) => {
            if (res.data.status == 0) {
                resolve(res.data);
            } else {
                reject(res.data);
            }
        }).catch((err) => {
            reject(err);
        });
    });
}

/*
 * 获取新闻的评论信息
 * @method: GET
 * @url: api/getcomments/:artid?pageIndex=1
 * @param: artid
 * @query: pageIndex
 */
export const getNewsComment = (artid, pageIndex) => {
    return new Promise((resolve, reject) => {
        const url = `api/getcomments/${artid}`;
        const opts = {
            pageindex: pageIndex
        };
        axios.get(url, {
            params: opts
        }).then((res) => {
            if (res.data.status == 0) {
                resolve(res.data);
            } else {
                reject(res.data);
            }
        }).catch((err) => {
            reject(err);
        });
    });
}

//提交评论信息
export const doNewsComment = (artid, content) => {
    return new Promise((resolve, reject) => {
        const url = `api/postcomment/${artid}`;
        const opts = {
            content
        };
        axios.post(url, opts, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then((res) => {
            if (res.data.status == 0) {
                resolve(res.data);
            } else {
                reject(res.data);
            }
        }).catch((err) => {
            reject(err);
        });
    });
}

//*****************   分享图片相关的接口   **********************//
/*
 * 1.获取图片分享的类别
 * @method: GET
 * @url: api/getimgcategory
 * @params:
 * @query:
 */
export const getPicTypesList = () => {
    return new Promise((resolve, reject) => {
        const url = 'api/getimgcategory';
        axios.get(url).then((res) => {
            if (res.data.status == 0) {
                resolve(res.data);
            } else {
                reject(res.data);
            }
        }).catch((err) => {
            reject(err);
        });
    });
}

/*
 * 2.获取图片分享的类别下的图片列表
 * @method: GET
 * @url: api/getimages/:cateid
 * @params:cateid 图片类别id
 * @query:
 */
export const getPicList = (cateid) => {
    return new Promise((resolve, reject) => {
        const url = `api/getimages/${cateid}`;
        axios.get(url).then((res) => {
            if (res.data.status == 0) {
                resolve(res.data);
            } else {
                reject(res.data);
            }
        }).catch((err) => {
            reject(err);
        });
    });
}

/*
 * 3.获取图片分享图片详情
 * @method: GET
 * @url: api/getimageInfo/:imgid
 * @params:imgid 图片id
 * @query:
 */
export const getTimageInfo = (imgid) => {
    return new Promise((resolve, reject) => {
        const url = `api/getimageInfo/${imgid}`;
        axios.get(url).then((res) => {
            if (res.data.status == 0) {
                resolve(res.data);
            } else {
                reject(res.data);
            }
        }).catch((err) => {
            reject(err);
        });
    });
}

/*
 * 4.获取图片分享详情中的缩略图数组
 * @method: GET
 * @url: api/getthumimages/:imgid
 * @params:imgid 图片类别id
 * @query:
 */
export const getThumImages = (imgid) => {
    return new Promise((resolve, reject) => {
        const url = `api/getthumimages/${imgid}`;
        axios.get(url).then((res) => {
            if (res.data.status == 0) {
                resolve(res.data);
            } else {
                reject(res.data);
            }
        }).catch((err) => {
            reject(err);
        });
    });
}


//*****************   商品列表相关的接口   **********************//

/*
 * 1.获取商品列表数据
 * @method: GET
 * @url: api/getgoods?pageindex=1
 * @params:
 * @query:pageindex 第几页的数据
 */
export const getGoodsList = (pageindex) => {
    return new Promise((resolve, reject) => {
        const url = 'api/getgoods';
        const opts = {
            pageindex
        }
        axios.get(url, {
            params: opts
        }).then((res) => {
            if (res.data.status == 0) {
                resolve(res.data);
            } else {
                reject(res.data);
            }
        }).catch((err) => {
            reject(err);
        });
    });
}

/*2.注意：获取商品详情的轮播图，和获取图片详情缩略图是同一个接口，这里需要传一个商品id*/


/*
 * 3.获取商品参数区和价格，标题等数据
 * @method: GET
 * @url: api/goods/getinfo/:id
 * @params: id 商品id
 * @query:
 */
export const getGoodsDetailInfo = (id) => {
    return new Promise((resolve, reject) => {
        const url = `api/goods/getinfo/${id}`;

        axios.get(url).then((res) => {
            if (res.data.status == 0) {
                resolve(res.data);
            } else {
                reject(res.data);
            }
        }).catch((err) => {
            reject(err);
        });
    });
}

/*
 * 4.获取商品商品图文介绍
 * @method: GET
 * @url: api/goods/getdesc/:id
 * @params: id 商品id
 * @query:
 */
export const getGoodsDescMessage = (id) => {
    return new Promise((resolve, reject) => {
        const url = `api/goods/getdesc/${id}`;

        axios.get(url).then((res) => {
            if (res.data.status == 0) {
                resolve(res.data);
            } else {
                reject(res.data);
            }
        }).catch((err) => {
            reject(err);
        });
    });
}
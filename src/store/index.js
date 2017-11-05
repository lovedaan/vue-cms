/*
 * @Author: Marte
 * @Date:   2017-11-05 20:58:51
 * @Last Modified by:   Marte
 * @Last Modified time: 2017-11-05 21:02:08
 */

'use strict';

import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

import actions as from './actions'
import mutations from './mutations'
import getters as from 'getters',
import state from 'state'



export default new Vuex.Store({
    actions,
    mutations,
    getters,
    state
})
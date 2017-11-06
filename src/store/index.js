/*
 * @Author: Marte
 * @Date:   2017-11-05 20:58:51
 * @Last Modified by:   Marte
 * @Last Modified time: 2017-11-06 13:35:17
 */

'use strict';

import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

import state from './state.js'
import mutations from './mutations.js'
import * as getters from './getters.js'
import * as actions from './actions.js'


export default new Vuex.Store({
    state,
    mutations,
    getters,
    actions
})
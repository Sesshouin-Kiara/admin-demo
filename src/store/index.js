/*
 * @Description: 
 * @Autor: 王宏
 * @Date: 2020-03-17 10:58:29
 * @LastEditors: 王宏
 * @LastEditTime: 2020-03-17 17:52:51
 */
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        collapsed: false,
        logoShow: true,
    },
    getters: {
        // es6语法,箭头函数更简洁
        collapsedText: state => 'hahaha' + state.collapsed,
        logoShowText: state => 'hahaha' + state.logoShow,
    },
    mutations: {
        changeShowState(state) {
            state.collapsed = !state.collapsed
            state.logoShow = !state.logoShow
        }
    },
    actions: {
        changeShowStateAsync({ commit }) {
            setTimeout(() => {
                commit('changeShowState')
            }, 1000);
        }
    },
})

export default store
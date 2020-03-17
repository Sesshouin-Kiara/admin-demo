/*
 * @Description: 
 * @Autor: 王宏
 * @Date: 2020-03-17 09:53:23
 * @LastEditors: 王宏
 * @LastEditTime: 2020-03-17 11:09:05
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import {
    Input,
    Button,
    Menu,
    Icon,
    Breadcrumb,
} from 'ant-design-vue';

// Vue.component和Vue.use这里作用都是注册组件
// Vue.component(Input.name, Input);
Vue.use(Input)
Vue.use(Button)
Vue.use(Menu)
Vue.use(Icon)
Vue.use(Breadcrumb)

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app')

<!--
 * @Description: 页面布局模板
 * @Autor: 王宏
 * @Date: 2020-03-16 14:16:04
 * @LastEditors: 王宏
 * @LastEditTime: 2020-03-16 15:09:07
 -->
<template>
    <div class="myMain">
        <Aside></Aside>
        <div class="right">
            <Header></Header>
            <Breadcrumb></Breadcrumb>
            <div class="content">
                <router-view></router-view>
            </div>
            <div class="footer">Copyright © 2020 alibaba</div>
        </div>
    </div>
</template>
 
 <script>
    import Aside from '../components/aside'
    import Header from '../components/header'
    import Breadcrumb from '../components/breadcrumb'
    export default {
        data() {
            return {
            };
        },

        components: {
            Aside,
            Header,
            Breadcrumb
        },

        computed: {},

        created() { },

        methods: {}
    }
 </script>
 
 <style lang="scss">
    .myMain {
        display: flex;
        flex-direction: row;
        .right {
            flex: 1;
            display: flex;
            flex-direction: column;
            .content {
                padding: 24px 24px 0 24px;
                flex: 1;  //头部和底部确定高度，内容区填满
            }
            .footer {
                height: 76px;
                line-height: 76px;
                text-align: center;
                font-size: 12px;
                color: #aaa;
            }
        }
    }
</style>
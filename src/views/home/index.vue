<!--
 * @Description: 
 * @Autor: 王宏
 * @Date: 2020-03-16 15:12:45
 * @LastEditors: 王宏
 * @LastEditTime: 2020-03-17 13:54:52
 -->
<template>
    <div class="home">
        <div class="text">欢迎使用阿里巴巴后台管理系统</div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
            };
        },

        components: {},

        created() { 
        },

        methods: {}
    }
</script>

<style lang="scss">
    .home {
        // 基本布局
        padding: 24px;
        background-color: white;
        min-height: 100%;
        // 页面其他样式
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        font-size: 24px;
    }
</style>
<!--  -->
<template>
    <div class="login">
        <div class="content">
            <div class="title">阿里巴巴后台管理系统</div>
            <a-input
                class="input"
                placeholder="请输入账号"
                size="large"
                v-model="account"
            />
            <a-input
                class="input"
                placeholder="请输入密码"
                size="large"
                v-model="password"
            />
            <a-button
                class="btn"
                size="large"
                type="primary"
                @click="login"
            >登录</a-button>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                account: '',
                password: ''
            };
        },

        components: {},

        computed: {},

        created() { },

        methods: {
            login(){
                this.$router.push({
                    name:'home'
                })
            }
        }
    }

</script>
<style lang="scss">
    .login {
        height: 100vh;
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding-top: 26vh;
        background: #f0f3f7;
        .content {
            width: 368px;
            .title {
                text-align: center;
                margin-bottom: 24px;
                font-size: 24px;
            }
            .input {
                margin-bottom: 24px;
            }
            .btn {
                width: 100%;
            }
        }
    }
</style>
<!--
 * @Description: 
 * @Autor: 王宏
 * @Date: 2020-03-17 09:53:23
 * @LastEditors: 王宏
 * @LastEditTime: 2020-03-17 17:51:58
 -->
<!--  -->
<template>
    <div class="myHeader">
        <a-button
            @click="toggleCollapsed"
            type="primary"
        >
            <a-icon :type="collapsed ? 'menu-unfold' : 'menu-fold'" />
        </a-button>
        <div class="myHeader-right">
            <div>马云</div>
            <div style="margin:0 16px;color:blue">退出登录</div>
        </div>
    </div>
</template>

<script>
    import { mapState, mapGetters, mapMutations,mapActions } from "vuex";
    export default {
        data() {
            return {
            };
        },

        components: {},

        computed: {
            ...mapState(["collapsed"]),
        },

        created() {
         },

        methods: {
            ...mapMutations(['changeShowState']),
            ...mapActions(['changeShowStateAsync']),
            toggleCollapsed() {
                // this.$store.commit('changeShowState')
                this.changeShowState()
                // this.$store.dispatch('changeShowStateAsync')
                // this.changeShowStateAsync()
            },
        }
    }

</script>
<style lang="scss">
    .myHeader {
        height: 66px;
        background-color: #fff;
        font-size: 14px;
        box-shadow: 5px 0px 10px #ccc;
        display: flex;
        padding: 0 24px;
        justify-content: space-between;
        align-items: center;
        &-right {
            display: flex;
            justify-content: space-between;
        }
    }
</style>
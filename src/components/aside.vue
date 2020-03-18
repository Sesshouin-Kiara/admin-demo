<!--  -->
<template>
    <div class="myAside">
        <div class="logo" v-if="logoShow">阿里巴巴后台管理系统</div>
        <!-- 菜单组件 -->
        <a-menu
            :defaultSelectedKeys="selectedKeys"
            :inlineCollapsed="collapsed"
            :openKeys.sync="openKeys"
            mode="inline"
            theme="dark"
        >
            <template v-for="item in routeData">
                <!-- 有children的路由 -->
                <a-sub-menu
                    :key="item.name"
                    v-if="item.meta.unfold"
                >
                    <span slot="title">
                        <a-icon type="folder" />
                        <span>{{item.meta.name}}</span>
                    </span>
                    <template v-for="childrenItem in item.children">
                        <a-menu-item
                            :key="childrenItem.name"
                            @click="gotoRoute(childrenItem.name)"
                        >{{childrenItem.meta.name}}</a-menu-item>
                    </template>
                </a-sub-menu>
                <!-- 无children的路由 -->
                <a-menu-item
                    :key="item.name"
                    @click="gotoRoute(item.name)"
                    v-else
                >
                    <a-icon type="folder" />
                    <span>{{item.meta.name}}</span>
                </a-menu-item>
            </template>
        </a-menu>
    </div>
</template>

<script>
    import { mapState,mapGetters } from "vuex";
    export default {
        data() {
            return {
                routeData: [],
                selectedKeys: [],
                openKeys: [],
            };
        },
        
        computed: {
            ...mapState(["collapsed","logoShow"]),
            ...mapGetters(["collapsedText","collapsedText"]),
        },

        created() {
            this.getMenuData()
            // console.log(this.collapsed,this.logoShow,this.collapsedText,this.collapsedText)
        },

        methods: {
            // 根据路由渲染菜单
            getMenuData() {
                //菜单项
                this.routeData = []
                let deepCloneRouteData = JSON.parse(JSON.stringify(this.$router.options.routes))
                // console.log(this.$router.history.current.name)
                deepCloneRouteData.forEach((val, index) => {
                    if ((val.path !== '/') && (val.path !== '*') && (val.path !== '/login')) {
                        this.routeData.push(val)
                    }
                })
                //默认选中项
                this.selectedKeys = [this.$router.history.current.name]
                //展开的子路由选中项
                this.openKeys = []
                this.openKeys = ['ios']
            },
            gotoRoute(name) {
                this.$router.push({
                    name: name
                })
            }
        }
    }

</script>
<style lang="scss">
    .myAside {
        // width: 256px;
        min-height: 100vh; //使菜单高度填满屏幕
        background-color: #001529;
        .menuBtn {
            position: fixed;
            top: 10px;
            left: 260px;
            z-index: 999;
        }
        .logo {
            width: 256px;
            height: 60px;
            background-color: #001529;
            font-size: 16px;
            font-weight: 500;
            line-height: 60px;
            text-align: center;
            color: white;
        }
    }
</style>
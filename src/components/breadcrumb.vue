<!--  -->
<template>
    <div class="myBreadCurmb">
        <a-breadcrumb>
            <a-breadcrumb-item
                :key="index"
                v-for="(item,index) in path"
            >{{item}}</a-breadcrumb-item>
        </a-breadcrumb>
        <div class="title">{{title}}</div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                title: '',
                path: []
            };
        },

        components: {},

        computed: {},

        created() {
            this.setTitleAndPath()
        },
        watch: {
            $route(to, from) {
                this.setTitleAndPath()
            }
        },

        methods: {
            setTitleAndPath() {
                this.title = this.$router.history.current.meta.name
                this.path = []
                this.$router.history.current.matched.forEach((val, index) => {
                    this.path.push(val.meta.name)
                });
            }
        }
    }

</script>

<style lang="scss">
    .myBreadCurmb {
        padding: 16px 32px;
        margin-top: 3px;
        background-color: white;
        .title {
            font-size: 26px;
            font-weight: 600;
            color: black;
            margin-top: 16px;
        }
    }
</style>
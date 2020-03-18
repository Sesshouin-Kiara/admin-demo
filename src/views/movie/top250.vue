<!--
 * @Description: 
 * @Autor: 王宏
 * @Date: 2020-03-12 17:55:23
 * @LastEditors: 王宏
 * @LastEditTime: 2020-03-16 15:14:56
 -->

<template>
    <div class="movie">
        <a-table
            :columns="columns"
            :dataSource="data"
            :rowKey="record => record.id"
            bordered
        >
            <div
                slot="images"
                slot-scope="text"
            >
                <div style="height:120px;">
                    <img
                        :src="text.small"
                        alt="img"
                        style="height:100%;"
                    />
                </div>
            </div>
            <div
                slot="rating"
                slot-scope="text"
            >{{text.average}}</div>
            <div
                slot="durations"
                slot-scope="text"
            >{{text[0]}}</div>
            <div
                slot="genres"
                slot-scope="text"
            >
                <a-tag
                    :key="index"
                    color="cyan"
                    v-for="(tag,index) in text"
                >{{tag}}</a-tag>
            </div>
            <div
                slot="action"
                slot-scope="record"
            >
                <a
                    @click="delMovie(record.id)"
                    slot="action"
                >收藏</a>
                <span style="color:#eee;padding:0 4px;">|</span>
                <a
                    @click="delMovie(record.id)"
                    slot="action"
                >喜欢</a>
                <span style="color:#eee;padding:0 4px;">|</span>
                <a
                    @click="delMovie(record.id)"
                    slot="action"
                >删除</a>
            </div>
        </a-table>
    </div>
</template>

<script>
    import axios from "axios";
    export default {
        data() {
            return {
                data: [],
                columns: [
                    {
                        title: "编号",
                        customRender: (text, record, index) =>
                            `${index + 1}`
                    },
                    { title: '名称', dataIndex: 'title' },
                    { title: '海报', dataIndex: 'images', scopedSlots: { customRender: 'images' } },
                    { title: '评分', dataIndex: 'rating', scopedSlots: { customRender: 'rating' } },
                    { title: '时长', dataIndex: 'durations', scopedSlots: { customRender: 'durations' } },
                    { title: '标签', dataIndex: 'genres', scopedSlots: { customRender: 'genres' } },
                    { title: '年份', dataIndex: 'year' },
                    {
                        title: '操作',
                        fixed: 'right',
                        width: 150,
                        scopedSlots: { customRender: 'action' },
                    }
                ]
            };
        },

        created() {
            this.getList()
            console.log(34567, this.$api.movie.getTop250)
        },

        methods: {
            getList() {
                this.$api.movie.getTop250({
                    count: 30
                }).then(data => {
                    this.data = data.subjects
                }).catch(err => {
                    //
                });
            },

            delMovie(id) { }
        }
    }
</script>

<style lang="scss">
    .movie {
        // 基本布局
        padding: 24px;
        background-color: white;
        min-height: 100%;
    }
</style>
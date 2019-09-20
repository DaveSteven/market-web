<template>
    <Card>
        <div class="text-right mb10">
            <Button type="primary" @click="handleAdd">进货</Button>
        </div>
        <Table :columns="columns" :data="data"></Table>
    </Card>
</template>
<script>
    export default {
        data () {
            return {
                columns: [
                    {
                        title: '编号',
                        slot: 'number'
                    },
                    {
                        title: '商品名称',
                        key: 'name'
                    },
                    {
                        title: '进货渠道',
                        key: 'channel'
                    },
                    {
                        title: '数量',
                        key: 'amount'
                    },
                    {
                        title: '价格',
                        key: 'price'
                    },
                    {
                        title: '进货时间',
                        key: 'createTime'
                    }
                ],
                data: []
            }
        },
        methods: {
            handleAdd () {

            }
        }
    }
</script>

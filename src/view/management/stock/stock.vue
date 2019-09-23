<template>
    <Card>
        <Table :columns="columns" :data="data">
            <template slot-scope="{ row, index }" slot="number">
                {{ index | getSerialNumber(start, limit) }}
            </template>
            <template slot-scope="{ row }" slot="goodsName">
                {{ getGoods(row.goodsId) }}
            </template>
        </Table>
    </Card>
</template>
<script>
    import {getSupplierList} from '../../../api/supplier'
    import {getGoodsList} from '../../../api/goods'

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
                        slot: 'goodsName'
                    },
                    {
                        title: '库存',
                        key: 'amount'
                    },
                    {
                        title: '更新时间',
                        key: 'updateTime'
                    }
                ],
                data: [],
                start: 1,
                limit: 10,
                total: 0
            }
        },
        created () {
            this.fetchData();
        },
        methods: {
            fetchData () {

            }
        }
    }
</script>

<template>
    <Card>
        <Table :columns="columns" :data="data" class="mb10">
            <template slot-scope="{ row, index }" slot="number">
                {{ index | getSerialNumber(start, limit) }}
            </template>
            <template slot-scope="{ row }" slot="goodsName">
                {{ getGoods(row.goodsId) }}
            </template>
            <template slot-scope="{ row }" slot="supplier">
                {{ getSupplier(row.channelId) }}
            </template>
            <template slot-scope="{ row }" slot="amount">
                <Tag color="green">{{ row.amount }}</Tag>
            </template>
            <template slot-scope="{ row }" slot="price">
                ¥{{ row.price | parseMoney }}
            </template>
        </Table>
        <Page :total="total" :page-size="limit" @on-change="toPage"></Page>
    </Card>
</template>
<script>
    import {getSupplierList} from '../../../api/supplier'
    import {getGoodsList} from '../../../api/goods'
    import {getInventoryList} from '../../../api/inventory'

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
                        title: '供应商',
                        slot: 'supplier'
                    },
                    {
                        title: '数量',
                        slot: 'amount'
                    },
                    {
                        title: '价格',
                        slot: 'price'
                    },
                    {
                        title: '进货时间',
                        key: 'createTime'
                    }
                ],
                data: [],
                goodsList: [],
                supplierList: [],
                start: 1,
                limit: 10,
                total: 0
            }
        },
        created () {
            this.fetchData();
        },
        methods: {
            getInventoryList() {
                getInventoryList({
                    start: (this.start - 1) * this.limit,
                    limit: this.limit
                }).then(res => {
                    this.data = res.data.list;
                    this.total = res.data.total;
                })
            },
            async fetchData () {
                const goodsResult = await getGoodsList({});
                const supplierResult = await getSupplierList({});
                const stockResult = await getInventoryList({
                    start: (this.start - 1) * this.limit,
                    limit: this.limit
                })
                this.goodsList = goodsResult.data.list;
                this.supplierList = supplierResult.data.list;
                this.data = stockResult.data.list;
                this.total = stockResult.data.total;
            },
            getGoods (id) {
                const goods = this.goodsList.find(item => {
                    return item.id === id;
                })
                return goods.name
            },
            getSupplier (id) {
                const supplier = this.supplierList.find(item => {
                    return item.id === id;
                })
                return supplier.name
            },
            toPage (page) {
                this.start = page;
                this.getInventoryList();
            }
        }
    }
</script>

<template>
    <Card>
        <div class="text-right mb10">
            <Button type="primary" @click="handleAdd">进货</Button>
        </div>
        <Table :columns="columns" :data="data" class="mb10">
            <template slot-scope="{ row, index }" slot="number">
                {{ index | getSerialNumber(start, limit) }}
            </template>
            <template slot-scope="{ row }" slot="goodsName">
                {{ getGoods(row.goodsId) }}
            </template>
            <template slot-scope="{ row }" slot="action">
                <Button type="success" @click="addStock(row)">补货</Button>
            </template>
        </Table>
        <Page :total="total" :page-size="limit" @on-change="toPage"></Page>
        <Modal v-model="stockModalVisible" title="进货" width="400" @on-cancel="cancel">
            <Form ref="stockForm" :model="stockForm" :rules="formValidate" :label-width="100">
                <FormItem label="商品编码" prop="code">
                    <Select v-model="stockForm.code" filterable prefix="ios-barcode-outline" @on-change="codeOnChange">
                        <Option v-for="item in goodsList" :value="item.code" :key="item.code">{{ item.code }}</Option>
                    </Select>
                </FormItem>
                <FormItem label="商品选择" prop="goodsId">
                    <Select v-model="stockForm.goodsId" filterable>
                        <Option v-for="item in goodsList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                    </Select>
                </FormItem>
                <FormItem label="供应商选择" prop="channelId">
                    <Select v-model="stockForm.channelId">
                        <Option v-for="item in supplierList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                    </Select>
                </FormItem>
                <FormItem label="数量" prop="amount">
                    <Input v-model.number="stockForm.amount" />
                </FormItem>
                <FormItem label="价格" prop="price">
                    <Input v-model="stockForm.price" />
                </FormItem>
            </Form>
            <div slot="footer">
                <Button type="primary" @click="submit">确定</Button>
            </div>
        </Modal>
    </Card>
</template>
<script>
    import {getSupplierList} from '../../../api/supplier'
    import {getGoodsList} from '../../../api/goods'
    import {getStockList} from '../../../api/stock'
    import {addInventory} from '../../../api/inventory'
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
                    },
                    {
                        title: '操作',
                        slot: 'action'
                    }
                ],
                data: [],
                goodsList: [],
                start: 1,
                limit: 10,
                total: 0,
                supplierList: [],
                stockModalVisible: false,
                stockForm: {
                    code: '',
                    goodsId: '',
                    channelId: '',
                    amount: '',
                    price: ''
                },
                formValidate: {
                    goodsId: [
                        { required: true, message: '请选择进货商品', trigger: 'change' }
                    ],
                    channelId: [
                        { required: true, message: '请选择供应商', trigger: 'change' }
                    ],
                    amount: [
                        { required: true, message: '请输入数量', trigger: 'blur', type: 'number' }
                    ],
                    price: [
                        { required: true, message: '请输入价格', trigger: 'blur' }
                    ]
                }
            }
        },
        created () {
            this.fetchData();
        },
        methods: {
            async fetchData () {
                const goodsResult = await getGoodsList({})
                const supplierResult = await getSupplierList({})
                const stockResult = await getStockList({
                    start: (this.start - 1) * this.limit,
                    limit: this.limit
                })
                this.goodsList = goodsResult.data.list
                this.supplierList = supplierResult.data.list
                this.data = stockResult.data.list
                this.total = stockResult.data.total
            },
            getStockList () {
                getStockList({
                    start: (this.start - 1) * this.limit,
                    limit: this.limit
                }).then(res => {
                    this.data = res.data.list
                    this.total = res.data.total
                })
            },
            handleAdd () {
                this.open();
            },
            open () {
                this.stockModalVisible = true
            },
            cancel () {
                this.stockModalVisible = false
                this.$refs.stockForm.resetFields()
            },
            submit () {
                this.$refs.stockForm.validate(valid => {
                    if (valid) {
                        addInventory({
                            ...this.stockForm
                        }).then(() => {
                            this.$Message.success('添加成功！');

                            setTimeout(() => {
                                this.cancel();
                                this.fetchData();
                            })
                        })
                    }
                })
            },
            addStock (stock) {
                const goods = this.goodsList.find(item => {
                    return item.id === stock.goodsId
                })
                this.stockForm.goodsId = goods.id
                this.stockForm.code = goods.code
                this.stockModalVisible = true
            },
            getGoods (id) {
                const goods = this.goodsList.find(item => {
                    return item.id === id
                })
                return goods.name
            },
            codeOnChange (code) {
                const goods = this.goodsList.find(item => {
                    return item.code === code
                })
                this.stockForm.goodsId = goods.id
            },
            toPage (page) {
                this.start = page
                this.getStockList()
            }
        }
    }
</script>

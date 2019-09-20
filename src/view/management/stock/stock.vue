<template>
    <Card>
        <div class="text-right mb10">
            <Button type="primary" @click="handleAdd">进货</Button>
        </div>
        <Table :columns="columns" :data="data">
            <template slot-scope="{ row, index }" slot="number">
                {{ index | getSerialNumber(start, limit) }}
            </template>
            <template slot-scope="{ row }" slot="goodsName">
                {{ getGoods(row.goodsId) }}
            </template>
            <template slot-scope="{ row }" slot="supplier">
                {{ getSupplier(row.channelId) }}
            </template>
            <template slot-scope="{ row }" slot="price">
                ¥{{ row.price | parseMoney }}
            </template>
        </Table>
        <Modal v-model="stockModalVisible" title="进货" width="400" @on-cancel="cancel">
            <Form ref="stockForm" :model="stockForm" :rules="formValidate" :label-width="100">
                <FormItem label="商品选择" prop="goodsId">
                    <Select v-model="stockForm.goodsId">
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
    import {addStock, getStockList} from '../../../api/stock'

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
                        title: '库存',
                        key: 'amount'
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
                stockModalVisible: false,
                stockForm: {
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
                },
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
            async fetchData () {
                const goodsResult = await getGoodsList({});
                const supplierResult = await getSupplierList({});
                const stockResult = await getStockList({
                    start: (this.start - 1) * this.limit,
                    limit: this.limit
                })
                this.goodsList = goodsResult.data.list;
                this.supplierList = supplierResult.data.list;
                this.data = stockResult.data.list;
                this.total = stockResult.data.total;
            },
            handleAdd () {
                this.open();
            },
            open () {
                this.stockModalVisible = true;
            },
            cancel () {
                this.stockModalVisible = false;
                this.$refs.stockForm.resetFields();
            },
            submit () {
                this.$refs.stockForm.validate(valid => {
                    if (valid) {
                        addStock({
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
            }
        }
    }
</script>

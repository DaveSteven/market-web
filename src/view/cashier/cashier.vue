<template>
    <Layout>
        <Header>ff</Header>
        <Content class="content">
            <Table :columns="columns" :data="cartList">
                <template slot-scope="{ row }" slot="price">
                    ¥{{ row.price | parseMoney }}
                </template>
                <template slot-scope="{ row }" slot="total">
                    ¥{{ getTotal(row) | parseMoney }}
                </template>
            </Table>
        </Content>
        <Footer class="footer-panel">
            <span class="price">¥{{ totalPrice }}</span>
            <Button type="success" size="large" @click="confirmOrder">结算</Button>
        </Footer>
        <Input class="goods-code-input" ref="goodsCode" v-model="goodsCode" @on-change="codeOnChange" />
        <Modal v-model="modalVisible" title="商品信息" width="400">
            <Form ref="goodsForm" :label-width="80">
                <FormItem label="商品编码">
                    <Input v-model="goods.code" />
                </FormItem>
                <FormItem label="商品名称">
                    <Input v-model="goods.name" />
                </FormItem>
                <FormItem label="商品价格">
                    <Input v-model="goods.price" />
                </FormItem>
                <FormItem label="商品数量">
                    <InputNumber :max="10" :min="1" v-model="goods.amount"></InputNumber>
                </FormItem>
            </Form>
        </Modal>
        <Modal v-model="settleAccountsModalVisible" title="结算" :mask-closable="false" :closeable="false">
            <Table :columns="columns" :data="cartList" class="mb20">
                <template slot-scope="{ row }" slot="price">
                    ¥{{ row.price | parseMoney }}
                </template>
                <template slot-scope="{ row }" slot="total">
                    ¥{{ getTotal(row) | parseMoney }}
                </template>
            </Table>
            <RadioGroup size="large" v-model="order.payment">
                <Radio label="0">
                    <span>现金</span>
                </Radio>
                <Radio label="1">
                    <span>支付宝</span>
                </Radio>
                <Radio label="2">
                    <span>微信</span>
                </Radio>
            </RadioGroup>
            <div class="f20 text-right pr30">
                总计：¥{{ totalPrice }}
            </div>
            <div slot="footer">
                <Button @click="settleAccountsModalVisible = false">取消</Button>
                <Button type="primary" @click="submitOrder">确定</Button>
            </div>
        </Modal>
    </Layout>
</template>
<script>
    import debounce from 'lodash.debounce'
    import { getGoodsByCode } from '../../api/goods'
    import { addOrder } from '../../api/order'
    import { mapActions, mapGetters } from 'vuex'

    export default {
        data() {
            return {
                columns: [
                    {
                        title: '商品名称',
                        key: 'name',
                        align: 'center'
                    },
                    {
                        title: '商品价格',
                        slot: 'price',
                        align: 'center'
                    },
                    {
                        title: '商品数量',
                        key: 'amount',
                        align: 'center'
                    },
                    {
                        title: '商品总价',
                        slot: 'total',
                        align: 'center'
                    }
                ],
                data: [],
                order: {},
                goods: {},
                goodsCode: '',
                modalVisible: false,
                settleAccountsModalVisible: false,
                codeOnChange: debounce(() => {
                    this.getGoodsByCode();
                }, 200)
            }
        },
        computed: {
            ...mapGetters([
                'cartList',
                'totalPrice'
            ])
        },
        methods: {
            getTotal(data) {
                const price = parseFloat(data.price)
                const amount = parseInt(data.amount)
                return price * amount
            },
            getGoodsByCode() {
                if (!this.goodsCode) {
                    return
                }
                const goods = this.findGoods(this.cartList, this.goodsCode)
                if  (goods) {
                    if (!this.modalVisible) {
                        this.modalVisible = true
                    }
                    this.addCart({goods})
                    this.goods = this.findGoods(this.cartList, this.goodsCode)
                    this.goodsCode = ''
                } else {
                    getGoodsByCode({
                        code: this.goodsCode
                    }).then(res => {
                        if (!this.modalVisible) {
                            this.modalVisible = true
                        }
                        this.addCart({goods: res.data})
                        this.goods = this.findGoods(this.cartList, res.data.code)
                        this.goodsCode = ''
                    }).catch(() => {
                        this.goodsCode = ''
                    })
                }
            },
            keydownListener() {
                document.onkeydown = (e) => {
                    let keycode = e.keyCode || e.which || e.charCode
                    if (keycode === 13) {
                        this.modalVisible = !this.modalVisible
                        this.$refs.goodsForm.resetFields()
                        e.preventDefault()
                    }
                };
            },
            findGoods(list, code) {
                return list.find(item => {
                    return item.code === code
                })
            },
            confirmOrder() {
                if (!this.cartList.length) {
                    this.$Message.warning('还没有购买任何商品哦！')
                    return;
                }
                this.settleAccountsModalVisible = true;
            },
            submitOrder() {
                addOrder({
                    ...this.order,
                    total: this.totalPrice,
                    cartList: JSON.stringify(this.cartList)
                }).then(() => {
                    this.$Message.success('结算成功！')
                    this.order.payment = ''
                    this.settleAccountsModalVisible = false
                    this.clearCart()
                })
            },
            ...mapActions([
                'addCart',
                'clearCart'
            ])
        },
        mounted() {
            this.keydownListener();

            const focus = () => {
                this.timer = setTimeout(() => {
                    this.$refs.goodsCode.focus()
                    focus()
                }, 300)
            }
            focus()
        }
    }
</script>
<style lang="less" src="./cashier.less" scoped></style>

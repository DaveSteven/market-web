<template>
    <Layout>
        <Header>
            <div class="text-right">
                <Dropdown @on-click="handleClick">
                    <a style="color: #fff;font-size: 16px" href="javascript:void(0)">
                        您好，{{ username }}
                        <Icon type="ios-arrow-down"></Icon>
                    </a>
                    <DropdownMenu slot="list">
                        <DropdownItem name="logout">退出</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </div>
        </Header>
        <Content class="content">
            <Table :columns="columns" :data="cartList" size="large">
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
        <Modal v-model="modalVisible" title="商品信息" width="400" footer-hide>
            <Form ref="goodsForm" :label-width="80">
                <FormItem label="商品编码">
                    <Input v-model="goods.code" size="large" />
                </FormItem>
                <FormItem label="商品名称">
                    <Input v-model="goods.name" size="large" />
                </FormItem>
                <FormItem label="商品价格">
                    <Input v-model="goods.price" size="large" />
                </FormItem>
                <FormItem label="商品数量">
                    <InputNumber :max="10" :min="1" v-model="goods.amount" size="large"></InputNumber>
                </FormItem>
            </Form>
        </Modal>
        <Modal v-model="settleAccountsModalVisible" title="结算" :mask-closable="false" :closeable="false" width="50%">
            <Table :columns="columns" :data="cartList" class="mb20" size="large">
                <template slot-scope="{ row }" slot="price">
                    ¥{{ row.price | parseMoney }}
                </template>
                <template slot-scope="{ row }" slot="total">
                    ¥{{ getTotal(row) | parseMoney }}
                </template>
            </Table>
            <div class="text-right mb20">
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
            </div>
            <div class="f20 text-right">
                总计：¥{{ totalPrice }}
            </div>
            <div slot="footer">
                <Button @click="settleAccountsModalVisible = false" size="large">取消</Button>
                <Button type="primary" @click="submitOrder" size="large">确定</Button>
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
                        title: '商品编码',
                        key: 'code',
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
            ]),
            userId () {
                return this.$store.state.user.userId
            },
            username () {
                return this.$store.state.user.userName
            }
        },
        methods: {
            getTotal (data) {
                const price = parseFloat(data.price)
                const amount = parseInt(data.amount)
                return price * amount
            },
            getGoodsByCode () {
                if (!this.goodsCode) {
                    return
                }
                getGoodsByCode({
                    code: this.goodsCode
                }).then(res => {
                    if (!this.modalVisible) {
                        this.modalVisible = true
                    }
                    this.addCart({
                        goods: Object.assign(res.data, {
                            goodsId: res.data.id
                        })
                    })
                    this.goods = this.findGoods(this.cartList, res.data.code)
                    this.goodsCode = ''
                }).catch(() => {
                    this.goodsCode = ''
                })
            },
            keydownListener () {
                document.onkeydown = (e) => {
                    let keycode = e.keyCode || e.which || e.charCode
                    if (keycode === 13) {
                        this.modalVisible = !this.modalVisible
                        this.$refs.goodsForm.resetFields()
                        e.preventDefault()
                    }
                };
            },
            findGoods (list, code) {
                return list.find(item => {
                    return item.code === code
                })
            },
            confirmOrder () {
                if (!this.cartList.length) {
                    this.$Message.warning('还没有购买任何商品哦！')
                    return;
                }
                this.settleAccountsModalVisible = true;
            },
            submitOrder () {
                addOrder({
                    ...this.order,
                    userId: this.userId,
                    total: this.totalPrice,
                    cartList: JSON.stringify(this.cartList)
                }).then(() => {
                    this.$Message.success('结算成功！')
                    this.order.payment = ''
                    this.settleAccountsModalVisible = false
                    this.clearCart()
                })
            },
            handleClick (name) {
                if (name === 'logout') {
                    this.handleLogOut().then(res => {
                        this.$router.replace({
                            path: '/login'
                        })
                    })
                }
            },
            ...mapActions([
                'addCart',
                'clearCart',
                'handleLogOut'
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

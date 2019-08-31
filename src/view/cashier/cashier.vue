<template>
    <Layout>
        <Header>header</Header>
        <Content class="content">
            <Table :columns="columns" :data="data">
                <template slot-scope="{ row }" slot="price">
                    ¥{{ row.price | parseMoney }}
                </template>
                <template slot-scope="{ row }" slot="total">
                    ¥{{ getTotal(row) | parseMoney }}
                </template>
            </Table>
        </Content>
        <Footer class="footer-panel">
            {{goodsCode}}
            <Button type="success" size="large">结算</Button>
        </Footer>
        <Input class="goods-code-input" ref="goodsCode" v-model="goodsCode" @on-change="codeOnChange" />
        <Modal v-model="modalVisible" title="商品信息" width="400">
            <Form :label-width="80">
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
                    <Input v-model="goods.amount" />
                </FormItem>
            </Form>
        </Modal>
    </Layout>
</template>
<script>
    import debounce from 'lodash.debounce'
    import { getGoodsByCode } from '../../api/goods'
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
                goods: {},
                goodsCode: '',
                modalVisible: false,
                codeOnChange: debounce(() => {
                    this.getGoodsByCode();
                }, 200)
            }
        },
        computed: {
          ...mapGetters([
              'cartList'
          ])
        },
        methods: {
            orderInfo(data) {
                console.log(data)
            },
            getTotal(data) {
                const price = parseFloat(data.price)
                const amount = parseInt(data.amount)
                return price * amount
            },
            getGoodsByCode() {
                if (!this.goodsCode) {
                    return
                }
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
            },
            sweepCodeListener() {
                document.onkeydown = (e) => {
                    let keycode = e.keyCode || e.which || e.charCode
                    this.nextTime = new Date()
                    this.code = ''
                    if (keycode === 13) {
                        if (this.lastTime && (this.nextTime - this.lastTime < 30)) {
                            // 扫码枪
                            // do something
                            console.log('扫码枪输入')
                        } else {
                            // 键盘
                            this.modalVisible = true;
                            console.log('键盘输入')
                        }
                        this.code = ''
                        this.lastTime = null;
                        e.preventDefault()
                    } else {
                        if (!this.lastTime) {
                            this.code = String.fromCharCode(keycode)
                        } else {
                            if (this.nextTime - this.lastTime < 30) {
                                this.code += String.fromCharCode(keycode)
                            } else {
                                this.code = ''
                            }
                        }
                        this.lastTime = this.nextTime
                    }
                };
            },
            findGoods(list, code) {
              return list.find(item => {
                  return item.code === code
              })
            },
            ...mapActions([
                'addCart'
            ])
        },
        mounted() {
            this.sweepCodeListener();

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

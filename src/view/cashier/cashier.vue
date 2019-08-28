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
            <Button type="success" size="large">结算</Button>
        </Footer>
        <Input class="goods-code-input" ref="goodsCode" v-model="goodsCode" />
    </Layout>
</template>
<script>
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
                data: [
                    {
                        name: '旺仔牛奶',
                        price: '3',
                        amount: '3'
                    }
                ],
                goodsCode: ''
            }
        },
        methods: {
            orderInfo(data) {
                console.log(data)
            },
            getTotal(data) {
                const price = parseFloat(data.price)
                const amount = parseInt(data.amount)
                return price * amount
            }
        },
        mounted() {
            const focus = () => {
                this.timer = setTimeout(() => {
                    this.$refs.goodsCode.focus()
                    console.log('已获取焦点')
                    focus()
                }, 300)
            }
            focus()
        }
    }
</script>
<style lang="less" src="./cashier.less" scoped></style>

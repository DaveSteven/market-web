<template>
    <Layout>
        <Header>header</Header>
        <Content class="content">
            <Table :columns="columns" :data="data">
                <template slot-scope="{ row }" slot="orderInfo">
                    <Button type="success" @click="orderInfo(row)">订单详情</Button>
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
                        title: '订单号',
                        key: 'orderId',
                        align: 'center'
                    },
                    {
                        title: '交易时间',
                        key: 'createTime',
                        align: 'center'
                    },
                    {
                        title: '交易金额',
                        key: 'total',
                        align: 'center'
                    },
                    {
                        title: '交易方式',
                        key: 'payment',
                        align: 'center'
                    },
                    {
                        title: '订单详情',
                        slot: 'orderInfo',
                        align: 'center'
                    }
                ],
                data: [
                    {
                        orderId: '2019082716230001',
                        createTime: '2019-08-27 16:24:44',
                        total: '199.2',
                        payment: '微信'
                    }
                ],
                goodsCode: ''
            }
        },
        methods: {
            orderInfo(data) {
                console.log(data)
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

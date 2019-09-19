<template>
    <div>
        <Row class="total-preview">
            <Col :span="4">
                <info-card shadow color="#19be6b" icon="md-remove-circle" :icon-size="36">
                    <CountTo :end="444" count-class="count-style" />
                    <p>今日收入</p>
                </info-card>
            </Col>
            <Col :span="4">
                <info-card shadow color="#ed4014" icon="md-remove-circle" :icon-size="36">
                    <CountTo :end="4344" count-class="count-style" />
                    <p>今日支出</p>
                </info-card>
            </Col>
        </Row>
        <Row>
            <Col :md="24" :lg="8" :style="{marginBottom: '10px', padding: '10px'}">
                <Card>
                    <ChartPie style="height: 300px;" :value="pieData" text="商品销售占比"></ChartPie>
                </Card>
            </Col>
        </Row>
        <Row>
            <Col :style="{marginBottom: '10px', padding: '10px'}">
                <Card>
                    <ChartLine style="height: 500px;" :value="lineData" :xAxisData="lineXAxisData" text="商品销售走势"></ChartLine>
                </Card>
            </Col>
        </Row>
    </div>
</template>
<script>
    import InfoCard from '_c/InfoCard'
    import CountTo from '_c/CountTo'
    import { ChartPie, ChartLine } from '_c/Charts'

    export default {
        components: {
            InfoCard,
            CountTo,
            ChartPie,
            ChartLine
        },
        data () {
            return {
                pieData: [
                    { value: 335, name: '南京' },
                    { value: 310, name: '邮件营销' },
                    { value: 234, name: '联盟广告' },
                    { value: 135, name: '视频广告' },
                    { value: 1548, name: '搜索引擎' }
                ],
                lineData: {
                    xAxisData: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
                    series: [
                        {
                            name: '运营商/网络服务',
                            type: 'line',
                            stack: '总量',
                            areaStyle: { normal: {
                                    color: '#2d8cf0'
                                } },
                            data: [120, 132, 101, 134, 90, 230, 210]
                        },
                        {
                            name: '银行/证券',
                            type: 'line',
                            stack: '总量',
                            areaStyle: { normal: {
                                    color: '#10A6FF'
                                } },
                            data: [257, 358, 278, 234, 290, 330, 310]
                        },
                        {
                            name: '游戏/视频',
                            type: 'line',
                            stack: '总量',
                            areaStyle: { normal: {
                                    color: '#0C17A6'
                                } },
                            data: [379, 268, 354, 269, 310, 478, 358]
                        },
                        {
                            name: '餐饮/外卖',
                            type: 'line',
                            stack: '总量',
                            areaStyle: { normal: {
                                    color: '#4608A6'
                                } },
                            data: [320, 332, 301, 334, 390, 330, 320]
                        },
                        {
                            name: '快递/电商',
                            type: 'line',
                            stack: '总量',
                            label: {
                                normal: {
                                    show: true,
                                    position: 'top'
                                }
                            },
                            areaStyle: { normal: {
                                    color: '#398DBF'
                                } },
                            data: [820, 645, 546, 745, 872, 624, 258]
                        }
                    ]
                }
            }
        }
    }
</script>
<style lang="less" src="./home.less" scoped></style>
<style lang="less">
    .count-style{
        font-size: 40px;
    }
</style>

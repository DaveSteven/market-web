<template>
    <div ref="dom"></div>
</template>

<script>
    import echarts from 'echarts'
    import tdTheme from './theme.json'
    import { on, off } from '@/libs/tools'
    echarts.registerTheme('tdTheme', tdTheme)
    export default {
        name: 'ChartLine',
        props: {
            value: Object,
            text: String,
            subtext: String
        },
        data () {
            return {
                dom: null
            }
        },
        methods: {
            resize () {
                this.dom.resize()
            }
        },
        mounted () {
            const option = {
                title: {
                    text: this.text,
                    x: 'center'
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross',
                        label: {
                            backgroundColor: '#6a7985'
                        }
                    }
                },
                grid: {
                    top: '3%',
                    left: '1.2%',
                    right: '1%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: [
                    {
                        type: 'category',
                        boundaryGap: false,
                        data: this.value.xAxisData
                    }
                ],
                yAxis: [
                    {
                        type: 'value'
                    }
                ],
                series: this.value.series
            }
            this.$nextTick(() => {
                this.dom = echarts.init(this.$refs.dom)
                this.dom.setOption(option)
                on(window, 'resize', this.resize)
            })
        },
        beforeDestroy () {
            off(window, 'resize', this.resize)
        }
    }
</script>

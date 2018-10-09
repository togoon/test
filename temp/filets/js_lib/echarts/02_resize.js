/*
 * 演示echarts自动调整尺寸的api: resize
 */
import React from 'react'
import { render, } from 'react-dom'
import echarts from 'echarts'

class Test extends React.PureComponent {
  componentDidMount(){
    const myChart = echarts.init(this.refs.chart);
    // 绘制图表
    const opt = {
      title: {
        text: 'ECharts 入门示例'
      },
      tooltip: {},
      xAxis: {
        data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
      },
      yAxis: {},
      series: [{
        name: '销量',
        type: 'bar',
        data: [5, 20, 36, 10, 10, 20]
      }]
    }
    myChart.setOption(opt)
    
    window.setInterval(()=>{
      myChart.resize() // 调整尺寸适应容器
    }, 1000)
  }

  render() {
    return <div>
      echarts会适应dom元素的尺寸进行画图，如果dom元素尺寸发生改变，图表默认不会自动调整
      <div style={{
        width : 500,
        height : 500,
        border : '1px solid gray',
      }} ref='chart' />
    </div>
  }
}

render(<Test />, document.getElementById('root'))



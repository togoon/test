/*
 * k线图初探
 */
import React from 'react'
import { render, } from 'react-dom'
import echarts from 'echarts'

class Test extends React.PureComponent {
  componentDidMount(){
    const myChart = echarts.init(this.refs.chart);
    // 绘制图表
    const opt = {
      xAxis: {
        data: ['2017-10-24', '2017-10-25', '2017-10-26', '2017-10-27']
      },
      yAxis: {},
      series: [{
        type: 'k',
        data: [
          [20, 30, 10, 35],
          [40, 35, 30, 55],
          [33, 38, 33, 40],
          [40, 40, 32, 42]
        ]
      }]
    };

    myChart.setOption(opt)
  }

  render() {
    return <div style={{
      width : 500,
      height : 500,
      border : '1px solid gray',
    }} ref='chart' />
  }
}

render(<Test />, document.getElementById('root'))



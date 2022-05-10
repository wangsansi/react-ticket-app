import React from "react";
import './dashbordSectionTwo.css'
import { DatePicker } from 'tdesign-react';
import ReactECharts from 'echarts-for-react';
class DashbordSectionTwo extends React.Component {
    render() {
        const option = {
            tooltip: {},
            legend: {
                data:['工单数']
            },
            xAxis: {
                data: ['周一', '周二', '周三', '周四', '周五', '周六']
            },
            yAxis: {},
            series: [{
                name: '工单数',
                type: 'bar',
                data: [5, 20, 36, 10, 10, 20],
                itemStyle: {
                    color: '#0052d9'
                },
            }]
        };
        return (
            <section className="ti-dashbord-section-two ti-section-wrapper">         
                <div className="ti-section-header">
                    <div className="ti-section-title-area">
                        <span className="ti-title">提交工单统计</span>
                        <span className="ti-sub-title">（个）</span>
                    </div>
                    <div className="ti-section-options">
                        <DatePicker mode="date" range style={{width:240}}></DatePicker>
                    </div>
                </div>
                <div className="ti-section-content">
                    <ReactECharts 
                      option={option}
                      style={{ height: 400 }}
                      opts={{ renderer: 'svg' }} />
                </div>
            </section>
        )
    }
}

export default DashbordSectionTwo
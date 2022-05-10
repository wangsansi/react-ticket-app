import React from "react";
import TiCard from '../../tiCard/tiCard'
import './dashbordSectionOne.css'
class DashbordSectionOne extends React.Component {
    render() {
        let dates = [
            {title:'总工单数', number:'88', remark:'自上周以来上升25%', mainColor: true},
            {title:'我创建的', number:'10', remark:'自上周以来上升15%'},
            {title:'我相关的', number:'4', remark:'自上周以来下降10%'},
            {title:'我的待办', number:'2', remark:'自上周以来上升12%'}
        ]
        
        return (
            <section className="ti-dashbord-section-one">         
                {dates.map((date,index)=>
                    <div key={index} className='ti-dashbord-section-one-block'>
                        <TiCard 
                            title={date.title}
                            number={date.number}
                            remark={date.remark}
                            mainColor={date.mainColor}
                        />
                    </div>
                )}
            </section>
        )
    }
}

export default DashbordSectionOne
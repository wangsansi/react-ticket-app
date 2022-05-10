import React from "react";
import './tiCard.css'
class TiCard extends React.Component {
    constructor (props){
        super(props)
    }
    render(){
        let cardFigure
        if (this.props.figure) {
            cardFigure = <div className="ti-card-figure"></div>
        }
        return (
            <div className={`ti-card-container ${this.props.mainColor ? 'mian-card-container' : null}`}>
                <p className="ti-card-title">
                    {this.props.title}
                </p>
                <p className="ti-card-number">
                    {this.props.number}
                </p>
                <p className="ti-card-remark">
                    {this.props.remark}
                </p>
                {cardFigure}
            </div>
        )
    }
}
export default TiCard
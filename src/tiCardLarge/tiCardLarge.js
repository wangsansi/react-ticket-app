import './tiCardLarge.css'
export default function TiCardLarge(props) {
    let title = props.title
    let clsns = 'ti-card-wrapper'
    let clsn =  props.className  
    if (clsn) {
        clsns += ' ' + clsn
    }
    let option
    if (props.option) {
        option = <div className="ti-card-options">
            {props.option}
        </div>
    }
    return (
        <div className={clsns}>         
            <div className="ti-card-header">
                <div className="ti-card-title-area">
                    <span className="ti-title">{title}</span>
                </div>
                {option}
            </div>
            <div className="ti-card-content">
                {props.children}
            </div>
        </div>
    )
}
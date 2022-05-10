
import './ticketList.css'
import { useState,useEffect } from 'react';
import { Input, Select, DatePicker, Button, DialogPlugin } from 'tdesign-react';
import TicketTable from '../ticketTable/ticketTable'
const { Option } = Select;

export default function TicketList(props) {
    const selectList = [
        {type:'input', title: '工单标题：',placeholder: '请输入工单标题'},
        {type:'date', title: '创建时间：'}
    ]
    if (props.page !== 'distribute' && props.page !== 'todo') {
        selectList.splice(1,0,{type:'select', title: '是否结束：',placeholder: '请选择状态'})
    }
    const {pageParmas} = props
    const [queryParams, setQueryParams] = useState(pageParmas);
    
    const [inputValue, setInputChange] = useState();
    const onInputChange = (value) => {
        setInputChange(value)
    }
    const [selectValue, setSelectValue] = useState();
    const onSelectChange = (value) => {
        setSelectValue(value);
    };
    const [dateValue, setDateValue] = useState();
    const onDateChange = (value) => {
        setDateValue(value);
    };
    const submit = ()=>{
        if (props.page !== 'distribute' || props.page !== 'todo') {
            setQueryParams(Object.assign({},queryParams,{
                title: inputValue,
                status: selectValue,
                time_scope: (dateValue && dateValue.length) ? dateValue : null
            }))
        } else {
            setQueryParams(Object.assign({},queryParams,{
                title: inputValue,
                time_scope: (dateValue && dateValue.length) ? dateValue : null
            }))
        }
    }
    const listItems = selectList.map((item,index) => {
        let selectType 
        if (item.type === 'input') {
            selectType = <Input placeholder={item.placeholder}
            onChange={onInputChange}
            clearable
        />
        } else if (item.type === 'select') {
            selectType = <div style={{ display: 'flex', flex: '1 1' }}>
                <Select value={selectValue} onChange={onSelectChange} clearable>
                    <Option key="true" label="是" value="2" />
                    <Option key="false" label="否" value="1" />
                </Select>
            </div>
        } else if (item.type === 'date') {
            selectType = <DatePicker clearable mode="date" range onChange={onDateChange} style={{flex: '1 1'}}></DatePicker>
        }
        return (
            <div key={index} className="ti-input-wapper" style={{width: item.width}}>
                <span className="ti-input-title">{item.title}</span>
                {selectType}
            </div> 
        )             
    });
    return (
        <section className="ti-section-wrapper ti-related-wrapper" style={{height: '100%'}}>
            <div className="ti-section-content">
                <div className="ti-input-area">
                    <div className="ti-input-container">
                    {listItems}
                    </div>
                    <div className="ti-input-operation-container">
                        <Button onClick={submit}>查询</Button>
                    </div>
                </div>
                <div className="ti-table-area">
                    <TicketTable queryParams={queryParams}></TicketTable>
                </div>
            </div>
        </section>
    )
}

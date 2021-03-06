import { Form, Input, Radio, Select, Button } from 'tdesign-react';
import React, { useRef, useState,useEffect } from 'react';
import api from '../api'
import './user.css'
const { FormItem } = Form;
const { Option } = Select;

export default function EmployeeForm (props) {
    const [deptData, setDeptData] = useState([]);
    const [positionData, setPositionData] = useState([]);
    const formRef = useRef();
    function onSubmit(e){
        if (e.validateResult === true) {
            let params = formRef.current.getFieldsValue(true)
            props.submitSuccess(params)
        } 
    }
    async function fetchDeptList() {
        try {  
            let {data} = await api.get('/admin/v1/system/property/dept/list')
            setDeptData(data)
        } catch (err) {
            setDeptData([]); 
        }
    }
    async function fetchPositionList() {
        try {  
            let {data} = await api.get('/admin/v1/system/property/position/list')
            setPositionData(data)
        } catch (err) {
            setPositionData([]); 
        }
    }
    let departmentOptions = deptData.map(item=>
        <Option key={item.id} label={item.name} value={item.id} />
    )
    let positionOptions = positionData.map(item=>
        <Option key={item.id} label={item.name} value={item.id} />
    )
    useEffect(()=>{
        fetchDeptList();
    },[])
    useEffect(()=>{
        fetchPositionList();
    },[])
    useEffect(()=>{
        if (props.data) {
            formRef.current.setFieldsValue({
                name: props.data.name,
                mobile: props.data.mobile,
                identity_num: props.data.identity_num,
                sex: props.data.sex,
                job_num: props.data.job_num,
                dept_id: props.data.dept_id,
                position_id: props.data.position_id,
            })
        }
        
    },[props.data])
    return (
        
        <Form ref={formRef} layout="vertical" onSubmit={onSubmit} labelWidth={100} scrollToFirstError='smooth'>
            <FormItem
                label="??????"   
                name="name"
                rules={[
                    { required: true, message: '????????????', type: 'error' },
                    { min: 2, message: '?????????????????????', type: 'error' },
                ]}
            >
                <Input />
            </FormItem>
            <FormItem 
                label="????????????" 
                name="mobile"
                rules={[
                    { required: true, message: '???????????????', type: 'error' },
                    { telnumber: true, message: '??????????????????????????????' }
                ]} 
            >
                <Input placeholder="??????????????????" />
            </FormItem>
            <FormItem 
                label="????????????" 
                name="identity_num"
                rules={[
                    { required: true, message: '??????????????????', type: 'error' },
                    { idcard: true, message: '?????????????????????????????????' }
                ]} 
            >
                <Input placeholder="?????????????????????" />
            </FormItem>
            <FormItem 
                label="??????" 
                name="sex" 
                rules={[{ required: true, message: '????????????', type: 'error' }]}
            >
                <Radio.Group>
                    <Radio value={1}>???</Radio>
                    <Radio value={0}>???</Radio>
                </Radio.Group>
            </FormItem>
            <FormItem 
                label="??????" 
                name="job_num" 
                rules={[{ required: true, message: '?????????4?????????', type: 'error' },
                        {pattern: /^\d{4}$/, message: '?????????????????????'}
                ]}
            >
                <Input placeholder="???????????????" />
            </FormItem>
            <FormItem 
                label="??????" 
                name="dept_id" 
                rules={[{ required: true, message: '??????', type: 'error' }]}
            >
                <Select style={{ width: '40%' }} clearable>
                    {departmentOptions}
                </Select>
            </FormItem>
            <FormItem
                // initialData={props.data.position_id}
                label="??????" 
                name="position_id" 
                // key={new Date().getTime()}
                rules={[{ required: true, message: '??????', type: 'error' }]}
            >
                <Select style={{ width: '40%' }} clearable>
                    {positionOptions}
                </Select>
            </FormItem>
            <FormItem statusIcon={false}>
                <Button size="large" theme="primary" type="submit" block>
                    {props.page ? '????????????': '??????'}
                </Button>
            </FormItem>
        </Form>
    )
}
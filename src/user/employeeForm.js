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
                label="姓名"   
                name="name"
                rules={[
                    { required: true, message: '姓名必填', type: 'error' },
                    { min: 2, message: '至少需要两个字', type: 'error' },
                ]}
            >
                <Input />
            </FormItem>
            <FormItem 
                label="手机号码" 
                name="mobile"
                rules={[
                    { required: true, message: '手机号必填', type: 'error' },
                    { telnumber: true, message: '请输入正确的手机号码' }
                ]} 
            >
                <Input placeholder="请输入手机号" />
            </FormItem>
            <FormItem 
                label="身份证号" 
                name="identity_num"
                rules={[
                    { required: true, message: '身份证号必填', type: 'error' },
                    { idcard: true, message: '请输入正确的身份证号码' }
                ]} 
            >
                <Input placeholder="请输入身份证号" />
            </FormItem>
            <FormItem 
                label="性别" 
                name="sex" 
                rules={[{ required: true, message: '性别必填', type: 'error' }]}
            >
                <Radio.Group>
                    <Radio value={1}>男</Radio>
                    <Radio value={0}>女</Radio>
                </Radio.Group>
            </FormItem>
            <FormItem 
                label="工号" 
                name="job_num" 
                rules={[{ required: true, message: '请输入4位工号', type: 'error' },
                        {pattern: /^\d{4}$/, message: '工号必须是数字'}
                ]}
            >
                <Input placeholder="请输入工号" />
            </FormItem>
            <FormItem 
                label="部门" 
                name="dept_id" 
                rules={[{ required: true, message: '必填', type: 'error' }]}
            >
                <Select style={{ width: '40%' }} clearable>
                    {departmentOptions}
                </Select>
            </FormItem>
            <FormItem
                // initialData={props.data.position_id}
                label="职位" 
                name="position_id" 
                // key={new Date().getTime()}
                rules={[{ required: true, message: '必填', type: 'error' }]}
            >
                <Select style={{ width: '40%' }} clearable>
                    {positionOptions}
                </Select>
            </FormItem>
            <FormItem statusIcon={false}>
                <Button size="large" theme="primary" type="submit" block>
                    {props.page ? '审核通过': '确定'}
                </Button>
            </FormItem>
        </Form>
    )
}
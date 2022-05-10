import React, { useRef } from 'react';
import { Form, Input, Button } from 'tdesign-react';
import { DesktopIcon, LockOnIcon } from 'tdesign-icons-react';
import api from '../api'
import './user.css'
const { FormItem } = Form;

export default function Register(props) {
    
    const formRef = useRef();
    const onSubmit = (e) => {
        if (e.validateResult === true) {
            let params = formRef.current.getFieldsValue(true)
            delete params.rePassword

            api.post('/admin/v1/user/register',params).then((data)=>{          
                api.message.success('注册成功，请重新登录')
                props.changeTab(0)
            }).catch((err)=>{
                api.message.error('注册失败')
            })
        }
    };

    
  
    function rePassword(val) {
        return new Promise((resolve) => {
            const timer = setTimeout(() => {
               resolve(formRef.current.getFieldValue('password') === val);
               clearTimeout(timer);
            });
        });
    }
    return (
        <Form ref={formRef} layout="vertical" onSubmit={onSubmit} labelWidth={0} colon={true} scrollToFirstError='smooth'>
            <FormItem             
                name="user_name" 
                rules={[
                    { required: true, message: '用户名必填', type: 'error' },
                    { pattern: /^[A-Za-z0-9]+$/, message: '用户名只能是英文和数字' },
                    { min: 4, message: '至少需要4个字符', type: 'error' },
                ]}
            >
                <Input placeholder="请输入用户名" size="large" clearable prefixIcon={<DesktopIcon />}/>
            </FormItem>
            <FormItem               
                name="password" 
                rules={[
                    { required: true, message: '密码必填', type: 'error' },
                    { min: 6, message: '至少需要6位', type: 'error' }
                ]}
            >
                <Input placeholder="请输入密码" type="password" size="large" type="password" prefixIcon={<LockOnIcon />} clearable/>
            </FormItem>
            <FormItem           
                name="rePassword"  
                rules={[
                    { required: true, message: '密码必填', type: 'error' },
                    { validator: rePassword, message: '两次密码不一致' }
                ]}>
                <Input placeholder="请重复密码" type="password" size="large" type="password" prefixIcon={<LockOnIcon />} clearable/>
            </FormItem>
         
            
            <FormItem statusIcon={false}>
                <Button size="large" theme="primary" type="submit" block>
                    注册
                </Button>
            </FormItem>
        </Form>      
    );
}



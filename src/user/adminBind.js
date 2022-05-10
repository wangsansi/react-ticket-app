import { useRef } from 'react'
import { Form, Input, Button } from 'tdesign-react';
import { DesktopIcon, LockOnIcon } from 'tdesign-icons-react';
import api from '../api'
import { useNavigate } from 'react-router-dom'
const { FormItem } = Form;
function AdminBind(props) {
    const formRef = useRef();
    const navigate = useNavigate();
    const rules = {
        user_name: [{ required: true, message: '必填', type: 'error' },{ min: 4, message: '用户名不少于4个字符', type: 'error' }],
        password: [{ required: true, message: '必填', type: 'error' },{ min: 6, message: '密码不少于6个字符', type: 'error' },]
    };
    const onSubmit = (e) => {
        if (e.validateResult === true) {
            let params = formRef.current.getFieldsValue(true)
            api.post('/admin/v1/user/admin/add',params).then((data)=>{        
                api.message.success('添加成功')
                setTimeout(()=>{
                    navigate(-1)
                },2000)
                
            }).catch((err)=>{
                if (err.code === 1001) {
                    api.message.error('账号或密码错误')
                } else if (err.code === 1002){
                    api.message.error('对不起，您还未提交员工信息')
                } else if (err.code === 1003){
                    api.message.error('对不起，您的用户信息审核失败')
                } else {
                    api.message.error('添加失败')
                }
                
            })
        }
    }
    return (
        <div className="ti-login-wrapper"> 
            <div className="ti-login-content">
                <div className="ti-bind-title" >
                    请添加管理员
                </div>
                <Form ref={formRef} className="ti-login-form" rules={rules} className="ti-login-form" onSubmit={onSubmit} colon={true} labelWidth={0}>
                    <FormItem name="user_name" className="ti-login-input-wrapper">
                        <Input className="ti-login-input" size="large" clearable={true} prefixIcon={<DesktopIcon />} placeholder="请输入用户名" />
                    </FormItem>
                    <FormItem name="password" className="ti-login-input-wrapper">
                        <Input className="ti-login-input" size="large" type="password" prefixIcon={<LockOnIcon />} clearable placeholder="请输入密码" />
                    </FormItem>
                    <FormItem statusIcon={false}>
                        <Button size="large" theme="primary" type="submit" block>
                          确认添加
                        </Button>
                    </FormItem>
            </Form>
            </div> 
        </div>
    )
}
export default AdminBind
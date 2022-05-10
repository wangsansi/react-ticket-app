import { useNavigate } from "react-router-dom";
import api from '../api'
import './user.css'
import EmployeeForm from "./employeeForm"
export default function Bind() {
    const navigate = useNavigate()
    const success = function(e){
        let params = e
        api.post('/admin/v1/user/property/employee/add',Object.assign({},params,{remark: '未审核'})).then((data)=>{
            api.message.success('操作成功')
            navigate('/status')
        }).catch((err)=>{
            if (err.code === 1003) {
                api.message.error('请填写真实的身份证')
            } else if (err.code === 1004) {
                api.message.error('该用户已存在')
            } else if (err.code === 1005) {
                api.message.error('该身份证已存在')
            } else if (err.code === 1006) {
                api.message.error('该手机号已存在')
            } else if (err.code === 1007) {
                api.message.error('该工号已存在')
            } else {
                api.message.error('操作失败')
            }
        })
    }
    return (
        <div className="ti-login-wrapper"> 
            <div className="ti-bind-content">
                <div className="ti-bind-title" >
                    完善员工信息
                </div>
                <EmployeeForm submitSuccess={success}/>
            </div>        
            
        </div>
    )
}
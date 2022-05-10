import EmployeeForm from "../user/employeeForm"
import React, { useState,useEffect } from 'react';
import {useParams, useNavigate} from "react-router-dom";
import api from '../api'
export default function EmployeeDetail() {
    const { userId } = useParams();
    const  [data,setData] = useState({})
    const navigate = useNavigate()
    // 请求内容
    async function fetchData(queryParams) {
        // setIsloading(true);
        try {
            let {data} = await api.get('/admin/v1/system/property/employee/details',queryParams)
            setData(data)
            // setIsloading(false);
        } catch (err) {
            console.log('err',err)
            setData({});
        }
    }
    useEffect(()=>{
        fetchData({user_id:userId});
    },[])
    const success = function(e){
        let params = Object.assign({},e,{remark: '审核通过',user_id:data.user_id})
        api.post('/admin/v1/user/property/employee/update',params).then((data)=>{
            api.message.success('操作成功')
            navigate(-1)
        }).catch((err)=>{
            if (err.code === 1003) {
                api.message.error('请填写真实的身份证')
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
        <section className="ti-section-wrapper ti-related-wrapper" style={{height: '100%'}}>
            <div className="ti-section-content">
                <div className="ti-table-area">
                    <EmployeeForm data={data} page='approve' submitSuccess={success}/>
                </div>
            </div>
        </section>
    )
}
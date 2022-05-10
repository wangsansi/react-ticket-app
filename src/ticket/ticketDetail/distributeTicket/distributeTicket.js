import api from '../../../api'
import { useState,useEffect } from 'react';
import { useParams } from "react-router-dom";
import {TicketContent,TicketBase,TicketDistribute} from '../ticketDetailBase/ticketDetailBase'



export default function TicketDetail() {
    const { ticketId } = useParams();
    const  [data,setData] = useState({})
    const [deptData, setDeptData] = useState([]);
    const [categoryData, setCategoryData] = useState([]);
    // 请求内容
    async function fetchData(queryParams) {
        // setIsloading(true);
        try {
            let {data} = await api.get('/admin/v1/ticket/details',queryParams)
            data.process_list = JSON.parse(data.process_list)
            setData(data)
            // setIsloading(false);
        } catch (err) {
            console.log('err',err)
            setData({});
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
    async function fetchCategoryList() {
        try {  
            let {data} = await api.get('/admin/v1/ticket/category')
            setCategoryData(data)
        } catch (err) {
            setCategoryData([]); 
        }
    }
    useEffect(()=>{
        fetchData({ticket_id:ticketId});
    },[])
    useEffect(()=>{
        fetchDeptList();
    },[])
    useEffect(()=>{
        fetchCategoryList();
    },[])
    return (
        <>
            <TicketContent data={data} />
            <TicketBase data={data} modifiable={true}/>
            <TicketDistribute deptData={deptData} categoryData={categoryData} data={data}/>
        </>
    )
}

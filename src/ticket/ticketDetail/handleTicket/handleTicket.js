import api from '../../../api'
import { useState,useEffect } from 'react';
import { useParams } from "react-router-dom";
import {TicketContent,TicketBase,TicketHandle,TicketHistory,TicketTask} from '../ticketDetailBase/ticketDetailBase'



export default function TicketDetail() {
    const { ticketId } = useParams();
    const  [data,setData] = useState({})
    const [deptData, setDeptData] = useState([]);
    const [employeeData, setEmployeeData] = useState([]);
    // 请求内容
    async function fetchData(queryParams) {
        try {
            let {data} = await api.get('/admin/v1/ticket/details',queryParams)
            data.process_list = JSON.parse(data.process_list)
            setData(data)
        } catch (err) {
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
    async function fetchEmployeeList() {
        try {  
            let {data} = await api.post('/admin/v1/system/property/employee/list',{type:2})
            setEmployeeData(data)
        } catch (err) {
            setEmployeeData([]); 
        }
    }
    useEffect(()=>{
        fetchData({ticket_id:ticketId});
    },[])
    useEffect(()=>{
        fetchDeptList();
    },[])
    useEffect(()=>{
        fetchEmployeeList();
    },[])
    return (
        <>
            <TicketTask data={data} />
            <TicketHandle data={data} employeeData={employeeData}/>
            <TicketContent data={data} />
            <TicketBase data={data} />
            <TicketHistory data={data} />
        </>
    )
}

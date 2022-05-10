import api from '../../api'
import { useState,useEffect } from 'react';
import { useParams } from "react-router-dom";
import {TicketProcess,TicketContent,TicketBase,TicketHistory} from './ticketDetailBase/ticketDetailBase'


export default function TicketDetail() {
    const { ticketId } = useParams();
    const  [data,setData] = useState({})
    // 请求内容
    async function fetchData(queryParams) {
        try {
            let {data} = await api.get('/admin/v1/ticket/details',queryParams)
            data.process_list = JSON.parse(data.process_list)
            setData(data)
        } catch (err) {
            console.log('err',err)
            setData({});
        }
    }
    useEffect(()=>{
        fetchData({ticket_id:ticketId});
    },[])
    return (
        <>
            <TicketProcess data={data} />
            <TicketContent data={data} />
            <TicketBase data={data} />
            <TicketHistory data={data} />
        </>
    )
}


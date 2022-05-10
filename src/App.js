import React from "react";
import {Login, Status} from './user/login'
import Bind from './user/bind'
import AdminBind from './user/adminBind'
import { Routes, Route } from "react-router-dom";
import "./App.css";
import {
  BasicDivider, 
  DashbordBase,
  DashbordDetails,
  MyTodo,
  RelatedToMe,
  CreatedByMe,
  AllTickets,
  Distribute,
  EmployeeApprove,
  RoleAdmin, 
  PositionAdmin,
  DepartmentAdmin,
  Personal
} from './layout/layout';
import TicketDetail from './ticket/ticketDetail/ticketDetail';
import CreateTicket from './ticket/createTicket/createTicket'
import DistributeTicket from './ticket/ticketDetail/distributeTicket/distributeTicket'
import HandleTicket from './ticket/ticketDetail/handleTicket/handleTicket'

import EmployeeDetail from "./system/employeeDetail";

export default function App() {
  return (
    <div className="App" style={{minHeight: '100vh'}}>
      <Routes>
        <Route path="/" element={<BasicDivider />} >
            <Route index element={<DashbordBase />}></Route> 
            <Route path="dashbord/base" element={<DashbordBase />} />
            <Route path="dashbord/details" element={<DashbordDetails />} />
            <Route path="/ticket/create" element={<CreateTicket />} />
            <Route path="/ticket/todo" element={<MyTodo />} />
            <Route path="/ticket/created-by-me" element={<CreatedByMe />} />
            <Route path="/ticket/related-to-me" element={<RelatedToMe />} />
            <Route path="/ticket/all" element={<AllTickets />} />
            <Route path="/ticket/distribute" element={<Distribute />} />
            <Route path="/ticket/todo/detail/:ticketId" element={<HandleTicket />} />
            <Route path="/ticket/created-by-me/detail/:ticketId" element={<TicketDetail />} />
            <Route path="/ticket/related-to-me/detail/:ticketId" element={<TicketDetail />} />
            <Route path="/ticket/all/detail/:ticketId" element={<TicketDetail />} />
            <Route path="/ticket/distribute/detail/:ticketId" element={<DistributeTicket />} />
            <Route path="/admin/approve/employee" element={<EmployeeApprove />} />
            <Route path="/admin/approve/employee/detail/:userId" element={<EmployeeDetail />} />
            <Route path="/admin/role" element={<RoleAdmin />} />
            <Route path="/admin/position" element={<PositionAdmin />} />
            <Route path="/admin/department" element={<DepartmentAdmin />} />
            <Route path="/personal" element={<Personal />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/bind" element={<Bind />} />
        <Route path="/admin-bind" element={<AdminBind />} />
        <Route path="/status" element={<Status />} />
      </Routes>
    </div>
  );
}
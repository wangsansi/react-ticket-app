import { Fragment,useState } from 'react';
import { Layout,Dialog,Breadcrumb, Dropdown, Button} from 'tdesign-react';
import { UserCircleIcon, ChevronDownIcon } from 'tdesign-icons-react';
import { Link,useLocation,Outlet,useNavigate,Navigate } from "react-router-dom";
import MultiSide from '../aside/aside'
import DashbordSectionOne from '../dashbord/dashbordSectionOne/dashbordSectionOne';
import DashbordSectionTwo from '../dashbord/dashbordSectionTwo/dashbordSectionTwo';
import DashbordSectionThree from '../dashbord/dashbordSectionThree/dashbordSectionThree';
import TicketList from '../ticket/ticketList/ticketList';
import ApproveTable from '../system/approveTable'

import './layout.css'
import api from '../api';


const { BreadcrumbItem } = Breadcrumb;

const { Header, Content, Footer, Aside } = Layout;


export function BasicDivider() {
    const user_id = window.sessionStorage.getItem('user_id')
    const token = window.localStorage.getItem('token')
    const user_info = window.sessionStorage.getItem('user_info')
    if (!user_id || !token || !user_info) {
        return <Navigate to="/login" />
    } else { 
        const name = JSON.parse(user_info).name
        return (
            <Layout>
                <Aside width="auto" style={{fontSize: 0}}>                
                    <MultiSide />
                </Aside>
                <Layout className="ti-flex">
                    <Header id="ti-header">
                        <BreadcrumbTicket />
                        <div className="ti-reference">
                            <BasicDropdown name={name}/>
                        </div>
                    </Header>
                    <div className="ti-content-and-footer-wrapper">
                        <Content style={{padding: 24}}>               
                            <Outlet />
                        </Content>
                        <Footer>Copyright @ 2019-2021 Tencent. All Rights Reserved</Footer>
                    </div>
                </Layout>
            </Layout>  
        )
    }
}
const breadcrumbNameMap = {
    '/ticket/create': '????????????',
    '/ticket/distribute': '????????????',
    '/ticket/distribute/detail': '????????????',
    '/ticket/all': '????????????',
    '/ticket/all/detail': '????????????',
    '/ticket/todo': '????????????',
    '/ticket/todo/detail': '????????????',
    '/ticket/related-to-me': '????????????',
    '/ticket/related-to-me/detail': '????????????',
    '/ticket/created-by-me': '????????????',
    '/ticket/created-by-me/detail': '????????????',
    '/admin/approve/employee': '????????????'
  };
function BreadcrumbTicket() {
    const location = useLocation();
    const pathSnippets = location.pathname.split('/').filter(i => i);
    const extraBreadcrumbItems = pathSnippets.map((item, index) => {
        const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
        if (!breadcrumbNameMap[url]) return null
        if (item === 'detail') return <BreadcrumbItem key={url}>{breadcrumbNameMap[url]}</BreadcrumbItem>
        if (pathSnippets.length === index+1) return <BreadcrumbItem key={url}>{breadcrumbNameMap[url]}</BreadcrumbItem>
        return (
            <BreadcrumbItem key={url}>
              <Link className='ti-ticket-link' to={url}>{breadcrumbNameMap[url]}</Link>
            </BreadcrumbItem>
        );
    });
    const breadcrumbItems = [
        <BreadcrumbItem key='/'>
          <Link className='ti-ticket-link' to="/" >??????</Link>
        </BreadcrumbItem>,
      ].concat(extraBreadcrumbItems);
    return <Breadcrumb>{breadcrumbItems}</Breadcrumb>
}

function BasicDropdown(props) {
    const navigate = useNavigate()
    const options = [
      {
        content: '????????????',
        value: 1,
      },
    ];
    const clickHandler = (data) => {
        api.dialog.confirm({
            title: '????????????',
            msg: '?????????????????????',
            confirm: [()=>{
                navigate('/login')         
            }]
        })
        
    };
    return (
      <Dropdown options={options} onClick={clickHandler} trigger={'click'}>
        <Button variant="text">
          <span style={{ display: 'inline-flex',justifyContent: 'center', alignItems: 'center'}}>
            <UserCircleIcon size="20px" />
            <span style={{margin: '0 10px'}}>{props.name}</span>
            <ChevronDownIcon />
          </span>
        </Button>
      </Dropdown>
    );
  }


export function DashbordBase() {
    const user_id = window.sessionStorage.getItem('user_id')
    return (
        <Fragment>
            <DashbordSectionOne />
            <DashbordSectionTwo />
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <DashbordSectionThree />
                <DashbordSectionThree />
            </div>  
        </Fragment>   
    )
}

export function DashbordDetails() {
    const user_id = window.sessionStorage.getItem('user_id')
    return (
        <Fragment>
           DashbordDetails
        </Fragment>   
    )
}
function WarningAlert(props) {
    const navigate = useNavigate()
    const {show,content} = props
    const [visibleWarning, setVisibleWarning] = useState(show);
    const onCloseWarning = () => {
        setVisibleWarning(false);
        navigate("/login")
    };  
    return (
        <Dialog
            header='????????????'
            body={content}
            cancelBtn={false} 
            visible={visibleWarning}
            onClose={onCloseWarning}
            onConfirm={onCloseWarning}
        ></Dialog> 
    )
}
export function MyTodo() {
    const user_id = window.sessionStorage.getItem('user_id')
    let content
    if (!user_id) {
        content= <WarningAlert show={true} content={'???????????????'}/>
    } else {
        content= 
            <TicketList 
                pageParmas={{
                    type: 2,
                    status: 1,
                    current_handler: user_id
                }} 
                page='todo' 
            />
    }
    return (
        content
    )
}
export function RelatedToMe() {
    const user_id = window.sessionStorage.getItem('user_id')
    let content
    if (!user_id) {
        content= <WarningAlert show={true} content={'???????????????'}/>
    } else {
        content= <TicketList pageParmas={{
            type: 2,
            relative_staff: user_id
        }}/>}
    return (
        content   
    )
}
export function CreatedByMe() {
    const user_id = window.sessionStorage.getItem('user_id')
    let content
    if (!user_id) {
        content= <WarningAlert show={true} content={'???????????????'}/>
    } else {
        content= <TicketList pageParmas={{
            type: 2,
            creator_id: user_id
        }}/>}
    return (
        content   
    )
}
export function AllTickets() {
    const user_id = window.sessionStorage.getItem('user_id')
    return (
        <Fragment>
           <TicketList pageParmas={{
                type: 1
           }}/>
        </Fragment>   
    )
}
export function Distribute() {
    const user_id = window.sessionStorage.getItem('user_id')
    let content
    if (!user_id) {
        content= <WarningAlert show={true} content={'???????????????'}/>
    } else {
        content= 
        <TicketList 
            pageParmas={{
                type: 2,
                status: 0
            }}
            page='distribute'
        />
    }
    return (
        content   
    )
}


export function EmployeeApprove() {
    const user_id = window.sessionStorage.getItem('user_id')
    let content
    if (!user_id) {
        content= <WarningAlert show={true} content={'???????????????'}/>
    } else {
        content= 
        <ApproveTable></ApproveTable>
    }
    return (
        content   
    )
}
export function RoleAdmin() {
    const user_id = window.sessionStorage.getItem('user_id')
    return (
        <Fragment>
           RoleAdmin
        </Fragment>   
    )
}
export function PositionAdmin() {
    const user_id = window.sessionStorage.getItem('user_id')
    return (
        <Fragment>
           PositionAdmin
        </Fragment>   
    )
}
export function DepartmentAdmin() {
    const user_id = window.sessionStorage.getItem('user_id')
    return (
        <Fragment>
           DepartmentAdmin
        </Fragment>   
    )
}
export function Personal() {
    const user_id = window.sessionStorage.getItem('user_id')
    return (
        <Fragment>
           Personal
        </Fragment>   
    )
}
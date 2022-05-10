import {useState, useEffect} from 'react'
import { Table, DialogPlugin } from 'tdesign-react';
import { Edit1Icon } from 'tdesign-icons-react';
import {
  Link,
  useLocation
} from "react-router-dom";
import TiCardLarge from '../tiCardLarge/tiCardLarge'
import api from '../api.js'

// 表头
export default function UserAdmin() {
  // const user_id = window.sessionStorage.getItem('user_id')
  const [isLoading, setIsloading] = useState(false);
  const [data, setData] = useState([]);
  const showDialog = () => {
    const alertDia = DialogPlugin.alert({
      header: '系统错误',
      body: '登录过期，请重新登录',
      onConfirm: ({ e }) => {
        alertDia.hide();
      },
      onClose: ({ e, trigger }) => {
        alertDia.hide();
      },
    });
  };
  const location = useLocation();
  const userPath = location.pathname
  const columns = [
    {
      align: 'center',
      colKey: 'index',
      title: '序号',
      width: '10%',
    },{
      align: 'center',
      colKey: 'user_id',
      title: '用户号',
      width: '10%',
    },{
      colKey: 'name',
      ellipsis: true,
      title: '姓名',
      width: '13%',
    },{
      align: 'center',
      ellipsis: true,
      colKey: 'sex',
      title: '性别',
      width: '10%',
    },{
        align: 'center',
        ellipsis: true,
        colKey: 'dept_name',
        title: '部门',
        width: '15%',
    },{
      align: 'center',
      ellipsis: true,
      colKey: 'mobile',
      title: '手机号',
      width: '17%',
    },{
      align: 'center',
      ellipsis: true,
      colKey: 'job_num',
      title: '工号',
      width: '10%',
    },{
      align: 'center',
      ellipsis: true,
      colKey: 'operation',
      title: '操作',
      cell: ({ col, row }) => {
        return (
          <span>
            <Edit1Icon></Edit1Icon>
            <Link className='ti-ticket-link' to={`${userPath}/detail/${row['user_id']}`}>查看</Link>
          </span>
        )
      },
      width: '15%',
    }
  ];
  const [totle, setTotle] = useState(5)
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  // 分页数据变化
  async function rehandleChange(pageInfo) {
    const { current, pageSize } = pageInfo;
    setCurrent(current);
    setPageSize(pageSize);
    await fetchData(pageInfo);
  }
  // 请求内容
  async function fetchData(pageInfo) {
    setIsloading(true);
    try {
        const { current, pageSize } = pageInfo;
        const parmas = {
            type: 1,
            remark: 1,
            pageIndex: current,
            pageSize
        }
        let tableData = []
        let {data} = await api.post('/admin/v1/system/property/employee/list',parmas)
        data.list.map((item,index)=>{
          tableData.push({
            index: index+=1,
            user_id: item.user_id,
            name: item.name,
            sex: item.sex == 0 ? '女' : '男',
            dept_name: item.dept_name,
            mobile: item.mobile,
            job_num: item.job_num
          })
        })
        setTotle(data.totle)
        setData(tableData)
        setIsloading(false);
    } catch (err) {
      if (!err) {
        setData([]);
        setIsloading(false);
      } else if (err.code === '10003' || err.code === '10003' || err.code === '10002') {
        showDialog()
        setData([]);
        setIsloading(false);
      } else {
        setData([]);
        setIsloading(false);
      }
    }
  }
  useEffect(()=>{
    fetchData({current,pageSize});
  },[])
  return (
    <TiCardLarge title="待审核列表">
        <Table 
          stripe={true} 
          bordered 
          data={data} 
          columns={columns} 
          rowKey="index" 
          loading={isLoading} 
          hover
          pagination={{
            current,
            pageSize,
            total: totle,
            showSizer: true,
            visibleWithOnePage: true,
            onChange(pageInfo) {
              rehandleChange(pageInfo);
            },
          }}
        />  
    </TiCardLarge>
  )
}

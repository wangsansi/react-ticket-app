import React from 'react';
import { Table } from 'tdesign-react';

const data = [];
const total = 10;
for (let i = 0; i < total; i++) {
  data.push({
    index: i,
    title: '楼道太脏了',
    department: '保洁部',
    spent: '1天'
  });
}

export default function TableBasic() {
  return (
    <Table
      data={data}
      columns={[
        {
          align: 'center',
          width: 20,
          minWidth: 40,
          className: 'ti-table-title',
          ellipsis: true,
          colKey: 'index',
          title: '排名',
        },
        {
          align: 'left',
          width: 140,
          minWidth: 140,
          className: 'ti-table-title',
          ellipsis: true,
          colKey: 'title',
          title: '标题',
        },
        {
          align: 'center',
          width: 80,
          minWidth: 80,
          className: 'ti-table-department',
          ellipsis: true,
          colKey: 'department',
          title: '部门',
        },
        {
          align: 'center',
          width: 60,
          minWidth: 60,
          className: 'ti-table-spent',
          ellipsis: true,
          colKey: 'spent',
          title: '耗时',
        }
      ]}
      rowKey="index"
      tableLayout="auto"
      verticalAlign="top"
      size="medium"
      hover
      stripe={false}
      rowClassName={(rowKey) => `${rowKey}-class`}
    />
  );
}

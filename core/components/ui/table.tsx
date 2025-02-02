"use client";

import cn from "@/core/utils/cn";
import { Table as AntdTable } from "antd";
import type { AnyObject } from "antd/es/_util/type";
import React from "react";

export type TableProps<RecordType = AnyObject> = React.ComponentPropsWithRef<typeof AntdTable<RecordType>>;

export default function Table<RecordType = AnyObject>({ scroll, pagination, ...props }: TableProps<RecordType>) {
  const paginationProps: TableProps["pagination"] =
    pagination !== false
      ? {
          responsive: true,
          showTotal: (total, range) => `แสดง ${range[0]}-${range[1]} จากทั้งหมด ${total} รายการ`,
          showQuickJumper: true,
          ...pagination,
          className: cn(pagination?.className, "[&>*:first-child]:!flex-1 flex items-center")
        }
      : false;

  return (
    <AntdTable
      size="large"
      scroll={{
        x: 1024,
        ...scroll
      }}
      pagination={paginationProps}
      {...props}
    />
  );
}

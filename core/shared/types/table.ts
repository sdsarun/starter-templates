import type { TableProps } from "@/core/components/ui/table";
import type { AnyObject } from "antd/es/_util/type";

export type UITableProps<RecordType = AnyObject> = {
  dataSource: Promise<TableProps<RecordType>["dataSource"]>;
  page?: number;
  pageSize?: number;
  total?: number;
  onPageChange?: (page: number, pageSize: number) => void;
};

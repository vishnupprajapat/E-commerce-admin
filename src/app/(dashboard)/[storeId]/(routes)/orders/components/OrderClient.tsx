"use client";

import Heading from "@/components/ui/Heading";
import { Separator } from "@/components/ui/separator";
import { OrderColumn, columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";

interface OrderClientProps {
  data: OrderColumn[];
}

const OrderClient: React.FC<OrderClientProps> = ({ data }) => {
  return (
    <>
      <Heading
        title={`Orders (${data.length})`}
        description="manage orders for your store"
      />
      <Separator />
      <DataTable searchKey="products" columns={columns} data={data}></DataTable>
    </>
  );
};

export default OrderClient;

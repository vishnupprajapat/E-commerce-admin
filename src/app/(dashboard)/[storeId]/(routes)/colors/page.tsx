import prismadb from "@/lib/prismadb";
import ColorClient from "./components/ColorClient";
import { ColorColumn } from "./components/columns";
import { format } from "date-fns";

const ColorsPage = async ({
  params,
}: {
  params: {
    storeId: string;
  };
}) => {
  const colors = await prismadb.color.findMany({
    where: {
      storId: params.storeId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  const formattedColors: ColorColumn[] = colors.map((item) => ({
    id: item.id,
    name: item.name,
    value: item.value,
    createdAt: format(item.createdAt, "MMM do, yyyy"),
  }));
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ColorClient data={formattedColors} />
      </div>
    </div>
  );
};

export default ColorsPage;

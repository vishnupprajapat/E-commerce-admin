import prismadb from "@/lib/prismadb";
import { formatter } from "@/lib/utils";
import ProductClient from "./components/ProductClient";
import { ProductColumn } from "./components/columns";
import { format } from "date-fns";

const ProductsPage = async ({
  params,
}: {
  params: {
    storeId: string;
  };
}) => {
  const products = await prismadb.product.findMany({
    where: {
      storId: params.storeId,
    },
    include: {
      category: true,
      color: true,
      size: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  const formattedProducts: ProductColumn[] = products.map((item) => ({
    id: item.id,
    name: item.name,
    isFeatured: item.isfeatured,
    isArchived: item.isArchived,
    price: formatter.format(item.price.toNumber()),
    category: item.category.name,
    color: item.color.value,
    size: item.size.name,
    createdAt: format(item.createdAt, "MMM do, yyyy"),
  }));
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ProductClient data={formattedProducts} />
      </div>
    </div>
  );
};

export default ProductsPage;

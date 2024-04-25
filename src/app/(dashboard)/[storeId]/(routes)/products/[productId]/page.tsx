import prismadb from "@/lib/prismadb";
import ProductsForm from "./components/ProductsForm";

const ProductPage = async ({
  params,
}: {
  params: {
    productId: string;
    storeId: string;
  };
}) => {
  const product = await prismadb.product.findUnique({
    where: {
      id: params.productId,
    },
    include: { images: true },
  });
  const categories = await prismadb.category.findMany({
    where: {
      storId: params.storeId,
    },
  });
  const colors = await prismadb.color.findMany({
    where: {
      storId: params.storeId,
    },
  });
  const sizes = await prismadb.size.findMany({
    where: {
      storId: params.storeId,
    },
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 pt-6 p-8">
        <ProductsForm
          categories={categories}
          colors={colors}
          sizes={sizes}
          initialData={product}
        />
      </div>
    </div>
  );
};

export default ProductPage;

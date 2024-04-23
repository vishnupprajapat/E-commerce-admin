import prismadb from "@/lib/prismadb";
import CategoryForm from "./components/CategoryForm";

const CategoryPage = async ({
  params,
}: {
  params: {
    categoryId: string;
    storeId: string;
  };
}) => {
  const category = await prismadb.category.findUnique({
    where: {
      id: params.categoryId,
    },
  });
  const billboards = await prismadb.billboard.findMany({
    where: {
      storId: params.storeId,
    },
  });
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 pt-6 p-8">
        <CategoryForm billboards={billboards} initialData={category} />
      </div>
    </div>
  );
};

export default CategoryPage;

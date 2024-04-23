"use client";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { useState } from "react";

import Heading from "@/components/ui/Heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Billboard, Category } from "@prisma/client";
import { Trash } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import AlertModal from "@/components/modals/alert-modal";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CategoryFormProps {
  billboards: Billboard[];
  initialData: Category | null;
}
const formScema = z.object({
  name: z.string().min(1),
  billboardId: z.string().min(1),
});
type CategoryFormValues = z.infer<typeof formScema>;
const CategoryForm: React.FC<CategoryFormProps> = ({
  initialData,
  billboards,
}) => {
  const params = useParams();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const title = initialData ? "Edit Category" : "Create Category";
  const description = initialData ? "Edit Category" : "Add a new Category";
  const tostMessage = initialData ? "Category updated." : "Category Created.";
  const action = initialData ? "Save changes" : "Create ";

  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(formScema),
    defaultValues: initialData || {
      name: "",
      billboardId: "",
    },
  });
  const onSbmit = async (data: CategoryFormValues) => {
    try {
      if (initialData) {
        await axios.patch(
          `/api/${params.storeId}/categories/${params.categoryId}`,
          data
        );
      } else {
        await axios.post(`/api/${params.storeId}/categories`, data);
      }
      router.push(`/${params.storeId}/categories`);
      router.refresh();
      toast.success(tostMessage);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  const onDelete = async () => {
    try {
      await axios.delete(
        `/api/${params.storeId}/categories/${params.categoryId}`
      );
      router.push(`/${params.storeId}/categories`);
      router.refresh();
      toast.success("category deleted.");
    } catch (error) {
      console.log(error);
      toast.error(
        "Make sure you removed all products using this categories first."
      );
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };
  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />

        {initialData && (
          <Button
            disabled={loading}
            variant="destructive"
            onClick={() => setOpen(true)}
          >
            <Trash className="h-4 w-4 mr-2" />
            Delete
          </Button>
        )}
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSbmit)}
          className="space-y-8 w-full"
        >
          <div className="grid grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={loading}
                      placeholder="Category name"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="billboardId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Billboard</FormLabel>
                  <Select
                    disabled={loading}
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          defaultValue={field.value}
                          placeholder="Select a billboard"
                        ></SelectValue>
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {billboards.map((select) => (
                        <SelectItem key={select.id} value={select.id}>
                          {select.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={loading} className="ml-auto " type="submit">
            {action}
          </Button>
        </form>
      </Form>
    </>
  );
};

export default CategoryForm;

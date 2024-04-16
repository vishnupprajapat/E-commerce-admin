"use client";
import * as z from "zod";
import axios from "axios";
import toast from "react-hot-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { Modal } from "@/components/ui/modal";
import { UseStoreModel } from "@/hooks/use-store-model";
import { useForm } from "react-hook-form";
import { useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
});

export const StoreModel = () => {
  const [lodaing, setLoading] = useState(false);
  const StoreModel = UseStoreModel();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);
      const respone = await axios.post("/api/stores", values);
      console.log(respone.data);
      // toast.success("Store added");
      window.location.assign(`/${respone.data.id}`);
      setLoading(false);
    } catch (error) {
      console.error(error);
      toast.error("Somthing went wrong");
    } finally {
      setLoading(false);
    }
  };
  return (
    <Modal
      title="Create Store "
      description="Add a new store to  manage products and categories"
      isOpen={StoreModel.isOpen}
      onClose={StoreModel.onClose}
    >
      <div>
        <div className="space-y-4 py-2 pb-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        disabled={lodaing}
                        placeholder="E-Commerce"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="pt-6 space-x-2 flex items-center justify-end w-full">
                <Button
                  disabled={lodaing}
                  variant="outline"
                  onClick={StoreModel.onClose}
                >
                  Cancel
                </Button>
                <Button disabled={lodaing} type="submit">
                  Continue
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </Modal>
  );
};

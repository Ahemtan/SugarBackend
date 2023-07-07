"use client";

import * as z from "zod";
import { Store } from "@prisma/client";
import { Trash } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";

import { Heading } from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { AlertModal } from "@/components/modals/aleart-modal";
import { ApiAlert } from "@/components/ui/api-aleart";
import { useOrigin } from "@/hooks/use-origin"

interface SettingFormProps {
  initialData: Store;
}

const formSchema = z.object({
  name: z.string().min(3),
});

type SettingFormValues = z.infer<typeof formSchema>;

export const SettingForm: React.FC<SettingFormProps> = ({ initialData }) => {
  const params = useParams();
  const router = useRouter();
  const origin = useOrigin()

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const form = useForm<SettingFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
  });

  const onSubmit = async (data: SettingFormValues) => {
    try {
      setLoading(true),
        await axios.patch(`/api/stores/${params.storeId}`, data);
      router.refresh();
      toast.success("Store updated!");
    } catch (error) {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/stores/${params.storeId}`);
      router.refresh();
      router.push("/");
      toast.success("Store delete!");
    } catch (error) {
      toast.error("Make sure to delete all product and category first!");
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
        <Heading title="Setting" description="Manage Store." />
        <Button
          variant={"destructive"}
          disabled={loading}
          size={"sm"}
          onClick={() => setOpen(true)}
        >
          <Trash className="h-4 w-4" />
        </Button>
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          <div className="grid grid-cols-1 gap-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl className="w-full">
                    <Input
                      disabled={loading}
                      placeholder="Store Name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button
            disabled={loading}
            className="ml-auto w-full sm:w-32"
            type="submit"
          >
            Save changes
          </Button>
        </form>
      </Form>
      <Separator />
      <ApiAlert title="NEXT_PUBLIC_API_URL"  description={`${origin}/api/${params.storeId}`} variant="public"/>
    </>
  );
};

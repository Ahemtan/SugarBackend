"use client";

import * as z from "zod";
import axios from "axios";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"

import { useStoreModal } from "@/hooks/use-store-modal";
import { Modal } from "@/components/ui/modal";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "react-hot-toast"

const formSchema = z.object({
    name: z.string().min(3),
})

export const StoreModal = () => {

    const storeModal = useStoreModal();

    const [lodaing, setLoading] = useState(false)
    
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
        }
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            
            setLoading(true);

            const response = await axios.post('/api/stores', values)

            window.location.assign(`/${response.data.id}`)
        } catch (error) {
            toast.error("Something Went Worng!")
        } finally {
            setLoading(false)
        }
    }

    return(
        <Modal title="Create Store" description="Add a new store!!" isOpen={storeModal.isOpen} onClose={storeModal.onClose}>
            <div>
                <div className="space-y-4 py-2 pb-4">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <FormField control={form.control} name="name" render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Name</FormLabel>
                                        <FormControl>
                                            <Input disabled={lodaing} placeholder="Sugar Design" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className="pt-6 space-x-2 flex items-center justify-end w-full ">
                                <Button disabled={lodaing} onClick={storeModal.onClose} variant="outline">Cancel</Button>
                                <Button disabled={lodaing} type="submit">Continue</Button>
                            </div>
                        </form>
                    </Form>
                </div>
            </div>
        </Modal>
    )
}
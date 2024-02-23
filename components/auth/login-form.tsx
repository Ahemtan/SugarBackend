"use client";

import React from 'react'
import * as z from "zod"

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { LoginSchema } from "@/schema"

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { CardWrapper } from "./card-wrapper";
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import toast from 'react-hot-toast';
import axios, { AxiosError } from 'axios';
import { useRouter } from "next/navigation"

export const LoginForm = () => {

  const router = useRouter();

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof LoginSchema>) => {
    try {
      await axios.post('/api/auth/login', values)
      toast.success("login successful");
      router.push('/');
    } catch (error: any) {
      if(error.response) {
       return toast.error(error.response.statusText);
      }
      toast.error("Something went wrong!");
      console.log(error);
    }
    
  }
  return (
    <CardWrapper headerLabel="Glad to see you again! 😄">

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
            <div className='space-y-4'>
              <FormField 
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder='hellp@sugar.com' type="email" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField 
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="********" type="password" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit" className='w-full'>
              Login
            </Button>
          </form>
        </Form>
    </CardWrapper>
  )
}
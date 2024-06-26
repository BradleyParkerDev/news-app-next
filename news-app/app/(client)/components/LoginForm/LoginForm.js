

"use client"
import React from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { loginUser } from '@client/lib'


import { useSelector, useDispatch } from 'react-redux'


import { Button } from "@client/components/ui/button"
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@client/components/ui/form"
import { Input } from "@client/components/ui/input"


const LoginForm = () => {
    const dispatch = useDispatch();

  	const news = useSelector((state) => state.news)
	const auth = useSelector((state) => state.auth)
	const user = useSelector((state) => state.user)

const formSchema = z.object({
    emailAddress: z.string().min(2,{message:'Email address must be atleast 2 characters long.'}).max(50),
    password: z.string().min(3,{message:'Password must be atleast 3 characters long.'}).max(8)
  })
// Define your form
const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
		emailAddress: "",
		password: ""
    },
  });
// Define a submit handler
function onSubmit(formData) {
    // Do something with the form formData.
    console.log("formData:", formData);
    loginUser(formData,  dispatch); // Corrected userDispatch argument

  }
    return(
        <div className='w-[400px]' >
            <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                control={form.control}
                name="emailAddress"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                        <Input placeholder="Email" {...field} />
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
                        <Input placeholder="password" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <Button type="submit">Login</Button>
            </form>
            </Form>
        </div>
    );
}

export default LoginForm;



// "use client"
import React from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { loginUser } from '@client/lib'

import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import {UserContext} from "../../context/UserContext"


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
    const { dispatch: userDispatch} = useContext(UserContext);
    const { state,  dispatch} = useContext(AuthContext);

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
    loginUser(formData, userDispatch , state , dispatch); // Corrected userDispatch argument

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
                    <FormDescription>
                        This is your public display name.
                    </FormDescription>
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
                    <FormDescription>
                        password
                    </FormDescription>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <Button type="submit">Submit</Button>
            </form>
            </Form>
        </div>
    );
}

export default LoginForm;



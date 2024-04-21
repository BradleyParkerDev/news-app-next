"use client"
import  { React, useContext, useState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { updateUserData } from '@client/lib'
import {uploadImage} from '@client/lib'

import { UserContext } from '@client/context/UserContext';
import { Button } from "@client/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@client/components/ui/form"
import { Input } from "@client/components/ui/input"



function UpdateForm() {
    const { state: userState, dispatch: userDispatch } = useContext(UserContext);

    const {id, firstName, lastName, emailAddress, userLoading, userImage} = userState;
    const [imageFile, setImageFile] = useState('');

    const formSchema = z.object({
        firstName: z.string(),
        lastName: z.string(),
        emailAddress: z.string(),
        password: z.string(),
        confirmPassword: z.string(),

    })


    // Define your form
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            firstName: '',
            lastName: '',
            emailAddress: '',
            password: '',
            confirmPassword: '',
        },
    });

    // Define a submit handler
    function onSubmit(formData) {
        // Do something with the form formData.
        console.log("formData:", formData);
        if(imageFile){
            handleImageUpload()
        }
        updateUserData(formData); // Corrected userDispatch argument

    }


    const handleImageChange = (event) => {
        const file = event.target.files[0];
        setImageFile(file);
    };

    const handleImageUpload = async () => {
        try {
            const uploadedUrl = await uploadImage(id, imageFile);
            await updateUserData({userImage: uploadedUrl})
            console.log("Uploaded image URL: ", uploadedUrl);
        } catch (error) {
            console.error("Error uploading image: ", error);
        }
    };   
          
    return (
        <div className='w-[400px]' >
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <div className='flex'>
                        <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>First Name</FormLabel>
                            <FormControl>
                                <Input placeholder="First Name" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                        <FormField
                        control={form.control}
                        name="lastName"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Last Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Last Name" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />                         
                    </div>
    
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
                    <div className='hidden'>
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
                        <FormField
                        control={form.control}
                        name="confirmPassword"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Confirm Password</FormLabel>
                            <FormControl>
                                <Input placeholder="confirm password" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />                        
                    </div>
                    <input type="file" accept="image/*" onChange={handleImageChange} />

                    <Button type="submit">Update</Button>
                </form>
            </Form>



            
        </div>
    )
}

export default UpdateForm;


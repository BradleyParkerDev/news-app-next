// "use client"
// import React from 'react'
// import { zodResolver } from "@hookform/resolvers/zod"
// import { useForm } from "react-hook-form"
// import { z } from "zod"
// import { registerUser } from '@client/lib'

// import { useContext } from "react";
// import { AuthContext } from "../../context/AuthContext";
// import {UserContext} from "../../context/UserContext"


// import { Button } from "@client/components/ui/button"
// import {
//   Form,
//   FormControl,
//   FormDescription,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@client/components/ui/form"
// import { Input } from "@client/components/ui/input"



// function RegistrationForm() {

//     const formSchema = z.object({
//         firstName: z.string().min(1,{message:''}),
//         lastName: z.string().min(1,{message:''}),
//         emailAddress: z.string().min(2,{message:'Email address must be atleast 2 characters long.'}).max(50),
//         password: z.string().min(3,{message:'Password must be atleast 3 characters long.'}).max(8),
//         confirmPassword: z.string().min(3,{message:'Password must be atleast 3 characters long.'}).max(8),

//     }).superRefine(({ confirmPassword, password }, ctx) => {
//         if (confirmPassword !== password) {
//           ctx.addIssue({
//             code: "custom",
//             message: "The passwords did not match"
//           });
//         }
//       });


//     // Define your form
//     const form = useForm({
//         resolver: zodResolver(formSchema),
//         defaultValues: {
//             firstName: '',
//             lastName: '',
//             emailAddress: '',
//             password: '',
//             confirmPassword: '',
//         },
//     });

//     // Define a submit handler
//     function onSubmit(formData) {
//         // Do something with the form formData.
//         console.log("formData:", formData);
//         registerUser(formData); // Corrected userDispatch argument

//     }

    
          
//     return (
//         <div className='w-[400px]' >
//             <Form {...form}>
//                 <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
//                     <div className='flex'>
//                         <FormField
//                         control={form.control}
//                         name="firstName"
//                         render={({ field }) => (
//                             <FormItem>
//                             <FormLabel>First Name</FormLabel>
//                             <FormControl>
//                                 <Input placeholder="First Name" {...field} />
//                             </FormControl>
//                             <FormMessage />
//                             </FormItem>
//                         )}
//                         />
//                         <FormField
//                         control={form.control}
//                         name="lastName"
//                         render={({ field }) => (
//                             <FormItem>
//                             <FormLabel>Last Name</FormLabel>
//                             <FormControl>
//                                 <Input placeholder="Last Name" {...field} />
//                             </FormControl>
//                             <FormMessage />
//                             </FormItem>
//                         )}
//                         />                         
//                     </div>
    
//                     <FormField
//                     control={form.control}
//                     name="emailAddress"
//                     render={({ field }) => (
//                         <FormItem>
//                         <FormLabel>Email Address</FormLabel>
//                         <FormControl>
//                             <Input placeholder="Email" {...field} />
//                         </FormControl>
//                         <FormMessage />
//                         </FormItem>
//                     )}
//                     />
//                     <FormField
//                     control={form.control}
//                     name="password"
//                     render={({ field }) => (
//                         <FormItem>
//                         <FormLabel>Password</FormLabel>
//                         <FormControl>
//                             <Input placeholder="password" {...field} />
//                         </FormControl>
//                         <FormMessage />
//                         </FormItem>
//                     )}
//                     />
//                     <FormField
//                     control={form.control}
//                     name="confirmPassword"
//                     render={({ field }) => (
//                         <FormItem>
//                         <FormLabel>Confirm Password</FormLabel>
//                         <FormControl>
//                             <Input placeholder="confirm password" {...field} />
//                         </FormControl>
//                         <FormMessage />
//                         </FormItem>
//                     )}
//                     />
//                     <Button type="submit">Sign Up</Button>
//                 </form>
//             </Form>



            
//         </div>
//     )
// }

// export default RegistrationForm


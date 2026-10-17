"use client";
import { useState } from "react";
import { useForm } from "react-hook-form"; 
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Card , CardContent , CardDescription , CardHeader , CardTitle } 
from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {Form,FormControl,FormField,FormItem,FormLabel,FormMessage} 
from "@/components/ui/form";
import { AlertCircle } from "lucide-react";


const formSchema = z.object({
    username : z
    .string()
    .min(3 , "Username must be at least 3 characters")
    .max(50 , "Username must be at most 50 characters"),
    password : z
    .string()
    .min(6 , "Password must be at least 6 characters")
    .max(100 , "Password must be at most 100 characters")

});

type FormValues = z.infer<typeof formSchema>;

export default function LoginForm() {
    const [isLogin , setIsLogin] = useState<boolean>(true);
    const [error , setError] = useState<string | null>(null);
    const [loading , setLoading] = useState<boolean>(false);

    const router = useRouter();

    const form = useForm<FormValues>({
        resolver : zodResolver(formSchema),
        defaultValues : {
            username : "",
            password : ""
        },
    });


    const onSubmit = async (values : FormValues) => {
        setLoading(true);
        setError(null);

        try {
            if(isLogin) {
                const result = await signIn("credentials" , {
                    username : values.username,
                    password : values.password,
                    redirect : false,
                });

                if(result?.error) {
                    setError("Invalid credential.");
                    return;
                }

                if(result?.ok) {
                    router.push("/");
                    router.refresh();
                }
            }

            else {
                const res = await 
                fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/register` ,
                    {
                        method : "POST",
                        headers : {"Content-Type": "application/json"},
                        body : JSON.stringify(values) ,

                    });
                if(!res.ok) {
                    const data = await res.json();
                    setError(data.message || "Registration failed.");
                    return;
                }
                await signIn("credentials" ,
                    {
                        username : values.username,
                        password : values.password,
                        redirect : false,
                    });

                    router.push("/");
                    router.refresh();
            }

        }
        catch{
            setError("Something went wrong. Please try again.");

        }
        finally {
            setLoading(false);
        }
    }


    return (
        <Card className="w-full max-w-md hover:shadow-2xl 
        hover:-translate-y-2 transition-all duration-300">
            <CardHeader>
                <CardTitle>{isLogin ? "Login" : "Register"}</CardTitle>
                <CardDescription>
                    {isLogin ? "Welcome back!" : "Create a new account"}
                </CardDescription>
            </CardHeader>
            <CardContent>
                {
                    error && (
                        <div className="mb-4 flex items-center gap-2 
                        rounded-md bg-red-50 p-3 text-sm text-red-600 border border-red-200">
                            <AlertCircle className="h-4 w-4 shrink-0" />
                            <span>{error}</span>
                        </div>
                    )
                }

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                        control={form.control}
                        name="username"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Username</FormLabel>
                                <FormControl>
                                    <Input type="text" placeholder="Enter username" 
                                    {...field} />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>)}
                         />
                        <FormField
                        control={form.control}
                        name="password"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input type="password" placeholder="Enter password" 
                                    {...field} />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>)}

                         />
                        <Button type="submit" className="w-full" disabled={loading}>
                            {loading ? "Please wait..." : isLogin ? "Login" : "Register"}
                        </Button>

                    </form>
                </Form>

                <div className="mt-4">
                    <Button variant="outline"
                     className="w-full"
                     disabled={loading}
                     onClick={() => signIn("google", { callbackUrl: "/" })}>
                        Continue with Google

                    </Button>
                </div>

                <p className="text-center text-sm mt-4 text-gray-600">
                    {isLogin ? "Don't have an account?" : "Already have an account?"}{""}
                    <button type="button"
                      onClick={() => {
                      setIsLogin(!isLogin);
                      setError(null);
                      form.reset();
                     }}
                     className="text-blue-600 hover:underline">
                        {isLogin ? "Register" : "Login"}

                    </button>

                </p>

            </CardContent>
        </Card>
    )
}


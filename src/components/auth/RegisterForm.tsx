import CardWrapper from "./CardWrapper";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input"

import { z } from "zod";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { RegisterSchema } from "@/schema/formSchema ";
import { Button } from "../ui/button";
import http from "../http/http";
import { User } from "@/types/user";
import { AlertCircle } from "lucide-react"

import {
    Alert,
    AlertDescription,
    AlertTitle,
} from "@/components/ui/alert"

export default function RegisterForm() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [message, setMessage] = useState("")
    const form = useForm({
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
    })
    const onSubmit = async (data: z.infer<typeof RegisterSchema>) => {
        setLoading(true);
        try {
            const users = (await http.get<User[]>("/users")).data;
            const userExists = users.some((user: User) => user.email === data.email);
            if (userExists) {
                setLoading(false);
                setError(true)
                setMessage("User already exists");
                return;
            }
            const response = await http.post("/users", data);
            navigate("/SignIn");
            return response;
        } catch (error) {
            console.error("Error registering user:", error);
        } finally {
            setLoading(false);
        }
    };




    return (
        <CardWrapper
            label="Create an account"
            title="Register"
            backButtontoHref="/SignIn"
            backButtononLabel="Already have account? Login here."
        >
            {error && <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>
                    {message}
                </AlertDescription>
            </Alert>}
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="space-y-4">
                        <FormField
                            control={form.control}
                            name="name"
                            render={(({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input {...field} placeholder="what your name" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            ))}
                        />
                        <FormField
                            control={form.control}
                            name="email"
                            render={(({ field }) => (
                                <FormItem>
                                    <FormLabel>email</FormLabel>
                                    <FormControl>
                                        <Input {...field} placeholder="eaxmple@gmail.com" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            ))}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={(({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input {...field} placeholder="******" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            ))}
                        />
                        <FormField
                            control={form.control}
                            name="confirmPassword"
                            render={(({ field }) => (
                                <FormItem>
                                    <FormLabel>Confirm Password</FormLabel>
                                    <FormControl>
                                        <Input {...field} placeholder="******" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            ))}
                        />
                    </div>
                    <Button type="submit" className="w-full" disabled={loading}>
                        {loading ? "Loading..." : "Register"}
                    </Button>
                </form>
            </Form>
        </CardWrapper>
    )
};

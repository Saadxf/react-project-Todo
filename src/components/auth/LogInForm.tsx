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
import { LoginSchema } from "@/schema/formSchema ";
import { Button } from "../ui/button";
import { User } from "@/types/user";
import http from "../http/http";

import { AlertCircle } from "lucide-react"

import {
    Alert,
    AlertDescription,
    AlertTitle,
} from "@/components/ui/alert"
import { useAuthStore } from "@/store";

export default function LogInForm() {
    const [error, setError] = useState(false)
    const [message, setMessage] = useState("")
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)
    const form = useForm({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })
    const signin = useAuthStore((state) => state.signin)
    const onSubmit = async (data: z.infer<typeof LoginSchema>) => {
        setLoading(true);
        try {
            const users = (await http.get<User[]>("/users")).data;
            const user = users.find((user: { email: string; password: string }) => user.email === data.email && user.password === data.password);
            if (user) {
                localStorage.setItem('user', JSON.stringify(user));
                signin(user);
                navigate("/");
            } else {
                setError(true)
                setMessage("Invalid email or password");
            }
        } catch (error) {
            console.error("Error during login:", error);
            setError(true)
            setMessage("An error occurred during login. Please try again.");
        } finally {
            setLoading(false);
        }
    };


    return (
        <CardWrapper
            label="Login to your account"
            title="Login"
            backButtontoHref="/SignUp"
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
                            name="email"
                            render={(({ field }) => (
                                <FormItem>
                                    <FormLabel>email</FormLabel>
                                    <FormControl>
                                        <Input {...field} type="email" placeholder="eaxmple@gmail.com" />
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
                                        <Input {...field} type="password" placeholder="******" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            ))}
                        />
                    </div>
                    <Button type="submit" className="w-full" disabled={loading}>
                        {loading ? "loading..." : "Login"}
                    </Button>
                </form>
            </Form>
        </CardWrapper>
    )
};

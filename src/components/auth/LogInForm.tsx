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

export default function LogInForm() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)
    const form = useForm({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    const onSubmit = (data: z.infer<typeof LoginSchema>) => {
        setLoading(true);
        const users = JSON.parse(localStorage.getItem("users") || "[]");
        const user = users.find((user: { email: string; password: string; }) => user.email === data.email && user.password === data.password);
        if (user) {
            
            navigate("/")
        } else {
            setLoading(false);
            alert("Invalid email or password");
        }
    }

    return (
        <CardWrapper
            label="Login to your account"
            title="Login"
            backButtontoHref="/SignUp"
            backButtononLabel="Already have account? Login here."
        >
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

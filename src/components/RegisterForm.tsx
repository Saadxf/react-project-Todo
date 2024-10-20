import CardWrapper from "./CardWrapper";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { RegisterSchema } from "../schema/formSchema "
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input"
import { Button } from "./ui/button";
import { z } from "zod";
import { useState } from "react";


export default function RegisterForm() {
    const [loading, setLoading] = useState(false)
    const form = useForm({
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
    })
    //TODO: store data
    const onSumbit = (data: z.infer<typeof RegisterSchema>) => {
        setLoading(true);
        console.log(data);
    }
    return (
        <CardWrapper
            label="Create an account"
            title="Register"
            backButtontoHref="/SignIn"
            backButtononLabel="Already have account? Login here."
        >
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSumbit)} className="space-y-6">
                    <div className="space-y-4">
                        <FormField
                            control={form.control}
                            name="name"
                            render={(({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input {...field} type="text" placeholder="what your name" />
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
                        <FormField
                            control={form.control}
                            name="confirmPassword"
                            render={(({ field }) => (
                                <FormItem>
                                    <FormLabel>Confirm Password</FormLabel>
                                    <FormControl>
                                        <Input {...field} type="password" placeholder="******" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            ))}
                        />
                    </div>
                    <Button type="submit" className="w-full">
                        {loading ? "Loading..." : "Register"}
                    </Button>
                </form>
            </Form>
        </CardWrapper>
    )
};

import CardWrapper from "./CardWrapper";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { LoginSchema } from "../schema/formSchema "
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input"
import { Button } from "./ui/button";
import { z } from "zod";
import { useState } from "react";



export default function LogInForm() {
    const [loading, setLoading] = useState(false)
    const form = useForm({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })
    //TODO: user auth
    const onSumbit = (data: z.infer<typeof LoginSchema>) => {
        setLoading(true);
        console.log(data);
    }


    return (
        <CardWrapper
            label="Login to your account"
            title="Login"
            backButtontoHref="/SignUp"
            backButtononLabel="Already have account? Login here."
        >
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSumbit)} className="space-y-6">
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
                    <Button type="submit" className="w-full">
                        {loading ? "loading..." : "Login"}
                    </Button>
                </form>
            </Form>
        </CardWrapper>
    )
};

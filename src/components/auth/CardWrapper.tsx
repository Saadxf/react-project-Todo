import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from "@/components/ui/card"
import AuthHeader from "./AuthHeader"
import BackButton from "./BackButton"
import { PropsWithChildren } from "react"


interface CardWrapperProps {
    label: string,
    title: string,
    backButtontoHref: string,
    backButtononLabel: string
}

export default function CardWrapper({ label, title, backButtontoHref, backButtononLabel, children }:PropsWithChildren< CardWrapperProps>) {
    return (
        <Card className="xl:w-1/4 md:w-1/2 shadow-md">
            <CardHeader>
                <AuthHeader label={label} title={title} />
            </CardHeader>
            <CardContent>
                {children}
            </CardContent>
            <CardFooter>
                <BackButton label={backButtononLabel} href={backButtontoHref} />
            </CardFooter>
        </Card>
    )
};

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Social from "./social";
export default function CardWrapper({
  children,
  title,
  description,
  backButtonLabel,
  backButtonHref,
  showSocial,
}: {
  children: React.ReactNode;
  title: string;
  description?: string;
  backButtonLabel: string;
  backButtonHref: string;
  showSocial: boolean;
}) {
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>{children}</CardContent>
      {showSocial && <Social />}
      <CardFooter className="mt-4 flex justify-center">
        <Button variant="link" asChild>
          <Link href={backButtonHref}>{backButtonLabel}</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

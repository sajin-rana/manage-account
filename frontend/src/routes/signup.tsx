import { Suspense } from "react";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { z } from "zod";
import { useToast } from "../components/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";

export const Route = createFileRoute("/signup")({
  component: Signup,
});

const schema = z.object({
  email: z.string().email(),
  username: z.string().email(),
  password: z.string().min(8),
  confirmpassword: z.string().min(8),
});

type FormFields = z.infer<typeof schema>;

function Signup() {
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<FormFields>({
    defaultValues: {},
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<FormFields> = async (formData: FormFields) => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      console.log("formData", formData);
      const { data } = await axios.post(`${apiUrl}/api/auth/signup`, formData);

      if (data.status === "success") {
        toast({ description: data.message });
        throw redirect({
          to: "/login",
        });
      }
    } catch (error) {
      if (error.response.data.status === "fail") {
        toast({
          variant: "destructive",
          description: error.response.data.error,
        });
      }
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen min-w-full ">
      <Suspense fallback={<div>Loading...</div>}>
        <Card className="mx-auto max-w-sm">
          <CardHeader>
            <CardTitle className="text-2xl">Sign up</CardTitle>
            <CardDescription>
              Enter your name and email to create account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="grid gap-4" onSubmit={handleSubmit(onSubmit)}>
              <div className="grid gap-2">
                <Label htmlFor="email">Name</Label>
                <Input
                  id="name"
                  type="name"
                  placeholder="name"
                  required
                  {...register("username")}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  {...register("email")}
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input
                  id="password"
                  type="password"
                  required
                  placeholder="********"
                  {...register("password")}
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Confirm Password</Label>
                </div>
                <Input
                  id="cnpassword"
                  type="password"
                  required
                  placeholder="********"
                  {...register("confirmpassword")}
                />
              </div>
              <Button type="submit" className="w-full">
                {isSubmitting ? "Loading..." : "Sign Up"}
              </Button>
            </form>
            <div className="mt-4 text-center text-sm">
              Already have an account?{" "}
              <Link to="/login" className="underline">
                Sign in
              </Link>
            </div>
          </CardContent>
        </Card>
      </Suspense>
    </div>
  );
}

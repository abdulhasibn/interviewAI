"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import Image from "next/image";
import { toast } from "sonner";
import Link from "next/link";
import FormField from "./FormField";
const getAuthFormSchema = (type: "signIn" | "signUp") => {
  return z.object({
    name: type === "signUp" ? z.string().min(2).max(3) : z.string().optional(),
    email: z.string().email(),
    password: z.string().min(3),
  });
};

type AuthFormProps = {
  type: "signIn" | "signUp";
};

const AuthForm = ({ type }: AuthFormProps) => {
  const formSchema = getAuthFormSchema(type);
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });
  const isSignIn = type === "signIn";
  // 2. Define a submit handler.
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    try {
      if (!isSignIn) {
        console.log("sign up", values);
      } else {
        console.log("sign in", values);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="card-border lg:min-w-[566px]">
      <div className="flex flex-col gap-6 card py-14 px-10">
        <div className="flex flex-row gap-2 justify-center">
          <Image src="/logo.svg" alt="logo" height={32} width={32} />
          <h2 className="text-primary-100">PrepWise</h2>
        </div>
        <h3 className="text-center">Practice job interview with AI</h3>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-6 mt-4 form"
          >
            {!isSignIn && (
              <FormField
                name="name"
                control={form.control}
                label="Name"
                placeholder="Your name"
              />
            )}
            <FormField
              name="email"
              control={form.control}
              label="Email"
              placeholder="Your email"
            />
            <FormField
              name="password"
              control={form.control}
              label="Password"
              type="password"
              placeholder="Your password"
            />

            <Button type="submit" className="btn">
              {isSignIn ? "Sign In" : "Sign Up"}
            </Button>
          </form>
        </Form>
        <p className="text-center">
          {isSignIn ? "Don't have an account? " : "Already have an account? "}
          <Link
            href={!isSignIn ? "/signIn" : "/signUp"}
            className="font-bold text-user-primary ml-1"
          >
            {!isSignIn ? "Sign In" : "Sign Up"}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default AuthForm;

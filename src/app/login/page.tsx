'use client'

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React from 'react'
import { cn } from "@/lib/utils"
import { Button } from '@/components/ui/button'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useToast } from '@/hooks/use-toast'
import {  useRouter } from 'next/navigation'


type CardProps = React.ComponentProps<typeof Card>;

function Page({ className, ...props }: CardProps) {
  const router = useRouter();

  const { toast } = useToast();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string().required("Required"),
    }),
    onSubmit: async (values) => {
      console.log("🚀 ~ onSubmit: ~ values:", values)
      try {
        const response = await fetch("/api/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });

        const data = await response.json(); // Parse JSON before checking response status
        console.log("🚀 ~ onSubmit: ~ data:", data)

        if (!response.ok) {
          throw new Error(data?.message || "Login failed"); // Use API error message if available
        }

        toast({
          description: "Login successful",
        });
        router.push("/main-page")
        console.log("Login successful:", data);
      } catch (error) {
        console.error("Login error:", error);
        let errorMessage = "Something went wrong";

        if (error instanceof Error) {
          errorMessage = error.message;
        } else if (typeof error === "object" && error !== null && "message" in error) {
          errorMessage = String(error.message);
        }

        toast({
          variant: "destructive",
          title: "Error",
          description: errorMessage,
        });
      }
    },
  });


  return (
    <Card className={cn("w-[380px]", className)} {...props}>
      <CardHeader>
        <CardTitle>Login Form</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-4">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              name="email"
              placeholder="Enter the email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.email && formik.errors.email && (
              <p className="text-red-500 text-sm">{formik.errors.email}</p>
            )}
          </div>
          <div className="mb-4">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              name="password"
              placeholder="Enter the password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.password && formik.errors.password && (
              <p className="text-red-500 text-sm">{formik.errors.password}</p>
            )}
          </div>
          <Button type="submit">Login</Button>
        </form>
      </CardContent>
      <CardFooter>
        <p>Card Footer</p>
      </CardFooter>
    </Card>
  );
}

export default Page;
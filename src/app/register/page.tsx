'use client'



import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useToast } from '@/hooks/use-toast';
import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import React from 'react'
// import * as Yup from 'yup';




type CardProps = React.ComponentProps<typeof Card>;

function Page({ className, ...props }: CardProps) {
  const router = useRouter();
  const { toast } = useToast();
  const formik = useFormik({
    initialValues: {
      gender: "",
      firstName: "",
      lastName: "",
      location: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    // validationSchema: Yup.object({
    //   email: Yup.string()
    //     .email("Invalid email address")
    //     .required("Email is required")
    //     .min(5, "Email must be at least 5 characters")
    //     .max(55, "Email cannot exceed 55 characters"),

    //   password: Yup.string()
    //     .required("Password is required")
    //     .min(8, "Password must be at least 8 characters")
    //     .max(50, "Password cannot exceed 50 characters")
    //     .matches(
    //       /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    //       "Password must include at least one uppercase, one lowercase, one number, and one special character"
    //     ),

    //   confirmPassword: Yup.string()
    //     .required("Confirm Password is required")
    //     .oneOf([Yup.ref("password")], "Passwords must match"),

    //   firstName: Yup.string()
    //     .required("First name is required")
    //     .min(2, "First name must be at least 2 characters")
    //     .max(55, "First name cannot exceed 55 characters"),

    //   lastName: Yup.string()
    //     .required("Last name is required")
    //     .min(3, "Last name must be at least 3 characters")
    //     .max(55, "Last name cannot exceed 55 characters"),

    //   gender: Yup.string()
    //     .required("Gender is required")
    //     .oneOf(["male", "female", "other"], "Invalid gender selection"),

    //   location: Yup.string()
    //     .required("Location is required")
    //     .min(2, "Location must be at least 2 characters")
    //     .max(55, "Location cannot exceed 55 characters"),
    // }),
    onSubmit: async (values) => {
      console.log("🚀 ~ onSubmit: ~ values:", values);
      try {
        const response = await fetch("/api/auth/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });

        const data = await response.json(); // Parse JSON before checking response status
        console.log("🚀 ~ onSubmit: ~ data:", data);

        if (!response.ok) {
          throw new Error(data?.message || "Registration failed"); // Use API error message if available
        }

        toast({
          description: "New user created successfully",
        });
        router.push("/login");
        console.log("New user created successfully:", data);
      } catch (error) {
        console.error("Registration error:", error);
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
    <Card className={`w-[380px] ${className}`} {...props}>
      <CardHeader>
        <CardTitle>Register Form</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={(e) => { e.preventDefault(); formik.handleSubmit(); console.log("Submit Clicked!"); }}>
          {/* First Name */}
          <div className="mb-4">
            <Label htmlFor="firstName">First Name</Label>
            <Input
              id="firstName"
              type="text"
              name="firstName"
              placeholder="Enter your first name"
              value={formik.values.firstName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.firstName && formik.errors.firstName && (
              <p className="text-red-500 text-sm">{formik.errors.firstName}</p>
            )}
          </div>

          {/* Last Name */}
          <div className="mb-4">
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              id="lastName"
              type="text"
              name="lastName"
              placeholder="Enter your last name"
              value={formik.values.lastName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.lastName && formik.errors.lastName && (
              <p className="text-red-500 text-sm">{formik.errors.lastName}</p>
            )}
          </div>

          {/* Email */}
          <div className="mb-4">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.email && formik.errors.email && (
              <p className="text-red-500 text-sm">{formik.errors.email}</p>
            )}
          </div>

          {/* Address */}
          <div className="mb-4">
            <Label htmlFor="location">Address</Label>
            <Input
              id="location"
              type="text"
              name="location"
              placeholder="Enter your address"
              value={formik.values.location}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.location && formik.errors.location && (
              <p className="text-red-500 text-sm">{formik.errors.location}</p>
            )}
          </div>

          <div className='mb-4'>
            <RadioGroup value={formik.values.gender}
              onValueChange={(value) => formik.setFieldValue("gender", value)}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="male" id="option-one" />
                <Label htmlFor="option-one">Male</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="female" id="option-two" />
                <Label htmlFor="option-two">Female</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="other" id="option-two" />
                <Label htmlFor="option-two">Other</Label>
              </div>
            </RadioGroup>

          </div>
          {/* Password */}
          <div className="mb-4">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.password && formik.errors.password && (
              <p className="text-red-500 text-sm">{formik.errors.password}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div className="mb-4">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              id="confirmPassword"
              type="password"
              name="confirmPassword"
              placeholder="Confirm your password"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.confirmPassword && formik.errors.confirmPassword && (
              <p className="text-red-500 text-sm">{formik.errors.confirmPassword}</p>
            )}
          </div>

          <Button type="submit">Sign up</Button>
        </form>
      </CardContent>
    </Card>
  );
}

export default Page;
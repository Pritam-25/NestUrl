import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FaGoogle } from "react-icons/fa";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import * as yup from "yup";
import Error from "./Error";

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  //* FormData interface for input values
  interface FormData {
    email: string;
    password: string;
  }

  //* input values state -->
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });

  //* handle the input value state change -->
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  //* Validation errors state
  const [errors, setErrors] = useState<Record<string, string>>({});
  //* Loading state
  const [loading, setLoading] = useState(false);

  //* handle login functionality -->
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setLoading(true);
    try {
      const formSchema = yup.object().shape({
        email: yup
          .string()
          .email("Invalid Email")
          .required("Email is Required"),
        password: yup
          .string()
          .min(6, "Password must be at least 6 Characters")
          .required("Password is Required"),
      });

      await formSchema.validate(formData, { abortEarly: false });
    } catch (error) {
      const newErrors: Record<string, string> = {};
      if (error instanceof yup.ValidationError) {
        error.inner.forEach((err) => {
          if (err.path) newErrors[err.path] = err.message;
        });
      }
      setErrors(newErrors);
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className={cn("flex flex-col gap-6", className)} {...props}>
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Login</CardTitle>
              <CardDescription>
                Enter your email below to login to your account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form>
                <div className="flex flex-col gap-6">
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="space-y-1">
                      <Input
                        id="email"
                        type="email"
                        name="email"
                        placeholder="m@example.com"
                        required
                        onChange={handleInputChange}
                      />
                      {errors.email && <Error message={errors.email} />}
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <div className="flex items-center">
                      <Label htmlFor="password">Password</Label>
                      <a
                        href="#"
                        className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                      >
                        Forgot your password?
                      </a>
                    </div>
                    <div className="space-y-1">
                      <Input
                        id="password"
                        name="password"
                        type="password"
                        required
                        onChange={handleInputChange}
                      />
                      {errors.password && <Error message={errors.password} />}
                    </div>
                  </div>
                  <Button
                    type="button"
                    className="w-full"
                    disabled={loading}
                    onClick={handleLogin}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />{" "}
                        Logging in...
                      </>
                    ) : (
                      "Login"
                    )}
                  </Button>
                  <Button variant="outline" className="w-full h-10 flex gap-4">
                    <FaGoogle />
                    <span>Login with Google</span>
                  </Button>
                </div>
                <div className="mt-4 text-center text-sm">
                  Don&apos;t have an account?{" "}
                  <a href="#" className="">
                    <span className="underline underline-offset-2 hover:text-primary">
                      Sign up
                    </span>
                  </a>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

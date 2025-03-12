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
import { Loader2, Upload } from "lucide-react";
import { useEffect, useState } from "react";
import * as yup from "yup";
import Error from "./Error";
import { useFetch } from "@/hooks/useFetch";
import { signup, SignUpData } from "@/db/apiAuth";
import { useNavigate, useSearchParams } from "react-router";

export function SignupForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  //* input values state -->
  const [signUpFormData, setSignUpFormData] = useState<SignUpData>({
    name: "",
    email: "",
    password: "",
    profile_pic: null,
  });

  const navigate = useNavigate();
  let [searchParams] = useSearchParams();
  const longLink = searchParams.get("createNew");

  //* handle the input value state change -->
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    setSignUpFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  //* Validation errors state
  const [errors, setErrors] = useState<Record<string, string>>({});

  const { data, error, loading, fn: signUpUser } = useFetch(signup);

  //* after login navigate back to dashboard
  // if longlink present then createnew=longlink either simpy ""
  useEffect(() => {
    console.log(data);
    if (!error && data) {
      navigate(`/dashboard?${longLink}` ? `createNew=${longLink}` : "");
    }
  }, [data, error]);

  //* handle login functionality -->
  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    try {
      const formSchema = yup.object().shape({
        name: yup.string().required("Name is required"),
        email: yup
          .string()
          .email("Invalid Email")
          .required("Email is Required"),
        password: yup
          .string()
          .min(6, "Password must be at least 6 Characters")
          .required("Password is Required"),
      });

      await formSchema.validate(signUpFormData, { abortEarly: false });
      console.log(`signUpFormData: ${signUpFormData}`);

      //* signup functionality -->
      await signUpUser(signUpFormData);
    } catch (error) {
      const newErrors: Record<string, string> = {};
      if (error instanceof yup.ValidationError) {
        error.inner.forEach((err) => {
          if (err.path) newErrors[err.path] = err.message;
        });
      }
      setErrors(newErrors);
    }
  };

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className={cn("flex flex-col gap-6", className)} {...props}>
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Sign Up</CardTitle>
              <div className="space-y-1">
                <CardDescription>
                  Create a new account if you have&rsquo;t already
                </CardDescription>
                {error && <Error message={error.message} />}
              </div>
            </CardHeader>
            <CardContent>
              <form>
                <div className="flex flex-col gap-6">
                  {/* name */}
                  <div className="grid gap-2">
                    <Label htmlFor="email">Name</Label>
                    <div className="space-y-1">
                      <Input
                        id="name"
                        type="name"
                        name="name"
                        placeholder="Enter your name"
                        required
                        onChange={handleInputChange}
                      />
                      {errors.email && <Error message={errors.email} />}
                    </div>
                  </div>
                  {/* email */}
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="space-y-1">
                      <Input
                        id="email"
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        required
                        onChange={handleInputChange}
                      />
                      {errors.email && <Error message={errors.email} />}
                    </div>
                  </div>
                  {/* password */}
                  <div className="grid gap-2">
                    <div className="flex items-center">
                      <Label htmlFor="password">Password</Label>
                    </div>
                    <div className="space-y-1">
                      <Input
                        id="password"
                        name="password"
                        type="password"
                        placeholder="Enter your password"
                        required
                        onChange={handleInputChange}
                      />
                      {errors.password && <Error message={errors.password} />}
                    </div>
                  </div>
                  {/* profile picture */}
                  <div className="grid gap-2">
                    <div className="flex items-center">
                      <Label htmlFor="profile_pic">Profile Pic</Label>
                    </div>
                    <div className="space-y-1">
                      <label
                        htmlFor="profile_pic"
                        className={cn(
                          "flex flex-col items-center justify-center gap-2 rounded-md border border-input bg-background px-4 py-4 text-xs shadow-xs transition-colors hover:bg-accent hover:text-accent-foreground",
                          "cursor-pointer" // Make it clickable
                        )}
                      >
                        {/* File Upload Icon from Lucide */}
                        <Upload className="h-4 w-4" />
                        <span className="text-xs font-medium">
                          Upload Profile Picture
                        </span>

                        <Input
                          id="profile_pic"
                          name="profile_pic"
                          type="file"
                          className="hidden" // Hide the default file input
                          onChange={handleInputChange}
                        />
                      </label>
                      {errors.profile_pic && (
                        <Error message={errors.profile_pic} />
                      )}
                    </div>
                  </div>
                  <Button
                    type="button"
                    className="w-full"
                    disabled={loading}
                    onClick={handleSignUp}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />{" "}
                        Signing in...
                      </>
                    ) : (
                      "Sign Up"
                    )}
                  </Button>
                </div>
                <div className="mt-4 text-center text-sm">
                  Already have an account?{" "}
                  <a href="#" className="">
                    <span className="underline underline-offset-2 hover:text-primary">
                      Login
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

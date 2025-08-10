import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../../../lib/utils";
import YellowImg from "../../../assets/pleasent Yellow.jpg"


import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function SignUpForm({ className, ...props }) {
  const navigate = useNavigate();
  const [signupInfo, setSignupInfo] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    const copySignupInfo = { ...signupInfo };
    copySignupInfo[name] = value;
    setSignupInfo(copySignupInfo);
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    const { name, email, password } = signupInfo;
    if (!name || !email || !password) {
      return handleError("name, email and password are required");
    }
    try {
      const url = `http://localhost:5173/auth/signup`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signupInfo),
      });
      const result = await response.json();
      const { success, message, error } = result;
      if (success) {
        handleSuccess(message);
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      } else if (error) {
        const details = error?.details[0].message;
        handleError(details);
      } else if (!success) {
        handleError(message);
      }
      console.log(result);
    } catch (err) {
      handleError(err);
    }
  };
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className="p-6 md:p-8" onSubmit={handleSignup}>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">Welcome</h1>
                <p className="text-muted-foreground text-balance">
                  Register to create your KanbanFlow account
                </p>
              </div>
              <div className="grid gap-3">
                <Label htmlFor="name">Name</Label>
                <Input
                  onChange={handleChange}
                  type="text"
                  name="name"
                  autoFocus
                  placeholder="Enter your name..."
                  value={signupInfo.name}
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  onChange={handleChange}
                  type="email"
                  name="email"
                  placeholder="Enter your email..."
                  value={signupInfo.email}
                />
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input
                  onChange={handleChange}
                  type="password"
                  name="password"
                  placeholder="Enter your password..."
                  value={signupInfo.password}
                />
              </div>
              <Button
                type="submit"
                className="w-full"
                onClick={() => navigate("/projects")}
              >
                Sign Up
              </Button>

              <div className="text-center text-sm">
                Already have an account? 
                <a
                  href="#"
                  className="underline underline-offset-4"
                  onClick={() => navigate("/Login")}
                >
                   Login
                </a>
              </div>
            </div>
          </form>
          <div className="bg-muted relative hidden md:block">
            <img
              src={YellowImg}
              alt="sign up"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>
          <ToastContainer />
        </CardContent>
      </Card>
    </div>
  );
}

"use client";

import { useState } from "react";
import Link from "next/link";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function Signup() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [input, setInput] = useState({
    username: "",
    email: "",
    password: "",
    location: "",
    budget: 0,
    interests: "",
  });
  const onChange = (e: any) => {
    setInput({ ...input, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const userData = {
      name: input.username,
      email: input.email,
      password: input.password,
      userPreferences: {
        location: input.location,
        interests: input.interests.split(","),
        budget: input.budget,
      },
    };
    try {
      // Send data to backend
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/users/register`,
        userData
      );
      localStorage.setItem("token", data.token);
      toast.success("Account created successfully");
      router.push("/dashboard");
    } catch (error: any) {
      console.error(error.message);
      toast.error("Failed to create account (User Already Exists)");
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-[#ff6b6b] to-[#ffa500] px-4 py-8 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 rounded-lg bg-background p-8 shadow-lg">
        {step === 1 && (
          <div>
            <div className="space-y-2 text-center">
              <h1 className="text-3xl font-bold tracking-tight text-foreground">
                Create an account
              </h1>
              <p className="text-muted-foreground">
                Already have an account?{" "}
                <Link
                  href="/signin"
                  className="font-medium underline"
                  prefetch={false}
                >
                  Sign in
                </Link>
              </p>
            </div>
            <form className="space-y-4">
              <div>
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  placeholder="Enter your username"
                  required
                  onChange={onChange}
                  value={input.username}
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  required
                  onChange={onChange}
                  value={input.email}
                />
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  required
                  onChange={onChange}
                  value={input.password}
                />
              </div>
              <Button
                type="button"
                onClick={() => {
                  setStep(2);
                  if (!input.username || !input.email || !input.password) {
                    toast.error("Please fill in all fields");
                    setStep(1);
                  }
                }}
                className="w-full"
              >
                Next
              </Button>
            </form>
          </div>
        )}
        {step === 2 && (
          <div>
            <div className="space-y-2 text-center">
              <h1 className="text-3xl font-bold tracking-tight text-foreground">
                Tell us about your travel preferences
              </h1>
              <p className="text-muted-foreground">
                Help us personalize your experience.
              </p>
            </div>
            <form className="space-y-4">
              <div>
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  placeholder="Enter your preferred travel destination"
                  required
                  onChange={onChange}
                  value={input.location}
                />
              </div>
              <div>
                <Label htmlFor="budget">Budget</Label>
                <Input
                  id="budget"
                  type="number"
                  placeholder="Enter your travel budget"
                  required
                  onChange={onChange}
                  value={input.budget}
                />
              </div>
              <div>
                <Label htmlFor="interests">Interests</Label>
                <Textarea
                  id="interests"
                  placeholder="Enter your travel interests"
                  required
                  onChange={onChange}
                  value={input.interests}
                />
              </div>
              <div className="flex justify-between">
                <Button
                  type="button"
                  onClick={() => setStep(1)}
                  variant="outline"
                >
                  Back
                </Button>
                <Button
                  type="submit"
                  className="w-full sm:w-auto"
                  onClick={handleSubmit}
                >
                  Create account
                </Button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

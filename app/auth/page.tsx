"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Container from "@/components/ui/container";
import { signup, login, UserCredentials } from "./actions";
import { FormEvent, useEffect, useState } from "react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

type handleSubmit = (
  e: FormEvent<HTMLFormElement>,
  fn: ({}: UserCredentials) => Promise<{
    error: string;
  }>
) => void;

export default function SignUp() {
  //state whether login form is current
  const [isLogin, setIsLogin] = useState(true);
  const [isLoginForm, setIsLoginForm] = useState(false);
  const [isSignupForm, setIsSignupForm] = useState(true);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  //2 above states are used to set buttons submit id
  //effect is setting this state after
  useEffect(() => {
    if (isLogin) {
      setIsLoginForm(true);
      setIsSignupForm(false);
    } else {
      setIsLoginForm(false);
      setIsSignupForm(true);
    }
  }, [isLogin]);

  //supabase signup/login as fn
  const handleSubmit: handleSubmit = async (e, fn) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData(e.target as HTMLFormElement);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const { error } = await fn({ email, password });
    if (error) {
      setError(error);
      setIsLoading(false);
    }
  };

  const onBtnClick = (state: boolean) => {
    setIsLogin(state);
    setError("");
  };

  //styles
  const borderBtnStyle = "border-dotted border-2 border-slate-500 ";
  const whiteBtnHover =
    "hover:bg-slate-900 hover:text-white hover:duration-300";
  const borderError = error && "border-red-600 border-[1.5px]";

  return (
    <Container className="flex flex-col justify-center items-center w-full h-full">
      <Alert
        className={`absolute top-5 min-w-[250px] w-fit max-w-[400px] my-2 transition-top duration-150 ${
          !error && "-top-[100px]"
        }`}
        variant="destructive"
      >
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
      <div
        className={`w-full max-w-[500px] md:mb-14 rounded-3xl overflow-hidden border-solid border-green-950 shadow-2xl shadow-green-900`}
      >
        {/* container for two forms */}
        <div
          className={`custom-grid relative transition-left  transition-all duration-500 ease-in-out ${
            isLogin ? "left-0" : "-left-full"
          }`}
        >
          {/* login form */}
          <div
            className={`flex flex-col justify-end gap-4 pt-6 pb-6 md:pb-8 pl-3 md:pl-12 transition-p transition-m duration-500 ${
              isLogin ? "pr-14 md:pr-28 mb-8" : "pr-0 mb-0"
            }`}
          >
            <h1 className="text-5xl font-extrabold tracking-tight">Login</h1>
            <form
              id="loginForm"
              className="flex flex-col relative justify-center gap-3"
              onSubmit={(e) => handleSubmit(e, login)}
            >
              <Label htmlFor="email" className="mt-4">
                Email
              </Label>
              <Input
                className={borderError}
                id="email"
                type="email"
                placeholder="xyz@gmail.com"
                name="email"
                required
              />
              <Label htmlFor="password" className="mt-4">
                Password
              </Label>
              <Input
                className={borderError}
                id="password"
                type="password"
                placeholder="Password"
                name="password"
                minLength={6}
                required
              />
            </form>
            <Button
              onClick={() => onBtnClick(true)}
              form={isLoginForm ? "loginForm" : undefined}
              disabled={isLoading}
              className={`self-end w-full mt-2 transition-all duration-500 ease-in-out ${borderBtnStyle} 
                  ${
                    isLogin
                      ? "bg-slate-900 border-none"
                      : `${whiteBtnHover} w-3/5 sm:w-1/2 h-8 -mr-0.5 rotate-90 -translate-y-14 bg-white text-slate-700`
                  } origin-bottom-right`}
            >
              Log in
            </Button>
          </div>
          {/* signup form */}
          <div
            className={`pt-6 pb-8 pr-3 md:pr-12 transition-padding duration-500 ${
              isLogin ? "pl-0" : "pl-14 md:pl-28"
            } `}
          >
            <h1 className="text-5xl font-extrabold tracking-tight">Register</h1>
            <form
              id="signupForm"
              className="flex flex-col justify-center gap-2"
              onSubmit={(e) => handleSubmit(e, signup)}
            >
              <Label htmlFor="name" className="mt-3 ">
                Name
              </Label>
              <Input
                className={borderError}
                id="name"
                type="name"
                placeholder="Michael"
                name="name"
                required
                minLength={3}
              />
              <Label htmlFor="email2" className="mt-3 ">
                Email
              </Label>
              <Input
                className={borderError}
                id="email2"
                type="email"
                placeholder="xyz@gmail.com"
                name="email"
                required
              />
              <Label htmlFor="password2" className="mt-3 ">
                Password
              </Label>
              <Input
                className={borderError}
                id="password2"
                type="password"
                name="password"
                minLength={6}
                required
              />
              <p className="text-xs -mt-2 mb-1 text-slate-500">
                Minimum length is 6 characters
              </p>
            </form>
            <Button
              onClick={() => onBtnClick(false)}
              form={isSignupForm ? "signupForm" : undefined}
              disabled={isLoading}
              className={`w-full bottom-0 mt-5 transition-all duration-500 ease-in-out ${borderBtnStyle} ${
                !isLogin
                  ? "bg-slate-900 border-none"
                  : `${whiteBtnHover} w-3/5 sm:w-1/2 h-8 -mr-51 -rotate-90 -ml-0.5 -translate-y-14 bg-white text-slate-700`
              } origin-bottom-left`}
            >
              {isLogin ? "Create account" : "Sign Up"}
            </Button>
          </div>
        </div>
      </div>
    </Container>
  );
}

"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Container from "@/components/ui/container";
import { signup } from "../actions";
import { FormEvent, useState } from "react";

export default function SignUp() {
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const res = await signup({ email, password });
  };

  return (
    <Container className="w-full h-full ">
      <form
        className="flex flex-col justify-center gap-2 max-w-lg mx-auto mt-10"
        onSubmit={handleSubmit}
      >
        <Label htmlFor="email" className="mt-4">
          Email
        </Label>
        <Input
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
          id="password"
          type="password"
          placeholder="Password"
          name="password"
          minLength={6}
          required
        />
        <Button type="submit" className="mt-2">
          Sign Up
        </Button>
      </form>
    </Container>
  );
}

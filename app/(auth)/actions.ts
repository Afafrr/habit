"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
type UserCredentials = {
  email: string;
  password: string;
};
export async function login(formData: UserCredentials) {
  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword(formData);

  if (error) {
    console.log("ERROR", error);
    return { error: error.message };
  }

  revalidatePath("/", "layout");
  redirect("/");
}

export async function signup(formData: UserCredentials) {
  const supabase = await createClient();
  const { error } = await supabase.auth.signUp(formData);

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/", "layout");
  redirect("/");
}

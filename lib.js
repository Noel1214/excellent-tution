"use server";
import { cookies } from "next/headers";

export async function logout() {
  console.log("killing cookies");
  //cookies().delete("token");
  console.log("killed cookies");
}

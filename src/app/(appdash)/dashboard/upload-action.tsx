"use server";
import fs from "node:fs/promises";
import { revalidatePath } from "next/cache";

export async function uploadFile(formData: FormData) {
  const file = formData.get("file") as File;
  const arrayBuffer = await file.arrayBuffer();
  const buffer = new Uint8Array(arrayBuffer);

  //Check if file exists
  const fileExists = await fs
    .access(`./public/uploads/${file.name}`)
    .then(() => true)
    .catch(() => false);

  //Create the new file
  await fs.writeFile(`./public/uploads/${file.name}`, buffer);

  revalidatePath("/");

  return file.name;
}

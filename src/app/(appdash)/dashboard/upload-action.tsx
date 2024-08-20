"use server";
import { storage } from "../../../firebaseConfig";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";

export async function uploadFile(formData: FormData) {
  const file = formData.get("file") as File;
  const fileExtension = file.name.split('.').pop();
  const fileName = `${uuidv4()}.${fileExtension}`;
  const storageRef = ref(storage, `uploads/${fileName}`);

  const arrayBuffer = await file.arrayBuffer();
  const fileBuffer = new Uint8Array(arrayBuffer);

  try {
    // Upload to Firebase Storage
    await uploadBytes(storageRef, fileBuffer);
    const downloadURL = await getDownloadURL(storageRef);

    console.log("File uploaded successfully:", fileName);
    console.log("Download URL:", downloadURL);

    return { fileName, downloadURL };
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error;
  }
}
"use client";
import { uploadFile } from "@/app/(appdash)/dashboard/upload-action";
import { SetStateAction } from "react";

interface UploadFormProps {
  fileNameHandler: (newFileName: String) => void;
}

export default function UploadForm(props: UploadFormProps) {
  return (
    <form
      action={async (formData) => {
        const fileName = await uploadFile(formData);
        props.fileNameHandler(fileName as string);
      }}
      className="flex flex-col gap-4"
    >
      <label>
        <span>Upload a file</span>
        <input type="file" name="file" />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
}

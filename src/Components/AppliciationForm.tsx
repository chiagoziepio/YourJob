import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { SubmitHandler, useForm } from "react-hook-form";
import { ApplicationFormSchema } from "@/Types/Types";
import { Textarea } from "./ui/textarea";
import { toast } from "sonner";
import { Cloud } from "lucide-react";

interface props {
  jobId: string;
  name: string;
}

const AppliciationForm = ({ name, jobId }: props) => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [dragging, setDragging] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const [theFile, setTheFile] = useState<File | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ApplicationFormSchema>();
  const onFinish: SubmitHandler<ApplicationFormSchema> = async (data) => {
    if (!theFile) {
      toast("error", {
        description: "Please upload a file",
        action: {
          onClick: () => toast.dismiss(),
          label: "Dismiss",
        },
      });
      return;
    }
    const formData = new FormData();
    formData.append("file", theFile!);
    formData.append("jobId", jobId);

    formData.append("coverLetter", data.cover_letter);
    formData.append("email", data.email);
    formData.append("phone", data.name);
  };
  const handleDrop = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    setDragging(false);

    if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
      const file = event.dataTransfer.files[0];
      processFile(file);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      processFile(file);
    }
  };

  const processFile = (file: File) => {
    // to match the file type / only accept pdf files,  word documents
    if (
      [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ].includes(file.type)
    ) {
      if (file.size < 3 * 1024 * 1024) {
        setFileName(file.name); // Update file name for display
        setTheFile(file);
      } else {
        toast("error", {
          description:
            "Your file is too large. Please upload a file smaller than 3MB.",
          action: {
            onClick: () => toast.dismiss(),
            label: "Dismiss",
          },
        });
      }
    } else {
      toast("error", {
        description: "Only PDF files are allowed.",
        action: {
          onClick: () => toast.dismiss(),
          label: "Dismiss",
        },
      });
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => {
    setDragging(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    setFileName(null);
    setTheFile(null);
    reset();
  };
  return (
    <Dialog
      open={isModalOpen}
      onOpenChange={(v) => {
        if (!v) {
          setIsModalOpen(v);
        }
      }}
    >
      <DialogTrigger onClick={() => setIsModalOpen(true)} asChild>
        <Button variant={"default"} className=" cursor-pointer">
          {" "}
          Apply now
        </Button>
      </DialogTrigger>
      <DialogContent
        className="max-h-[90vh] overflow-y-auto overflow-x-hidden"
        aria-describedby="Job application form"
      >
        <DialogTitle>
          <div className="flex items-center justify-between">
            <p>Apply for {name}</p>

            <Button
              onClick={handleCancel}
              variant={"ghost"}
              size={"sm"}
              className="cursor-pointer"
            >
              x
            </Button>
          </div>
        </DialogTitle>
        <DialogDescription>Sell yourself very high</DialogDescription>
        <div>
          <form
            action=""
            onSubmit={handleSubmit(onFinish)}
            className="w-full md:w-[400px] lg:w-[450px] flex flex-col gap-5"
          >
            <div className="flex flex-col gap-2 w-full">
              <label htmlFor="name">
                Fullname<span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                {...register("name", { required: true })}
                placeholder="John Doe"
                className="w-full h-[44px] outline-none border border-muted-foreground rounded-xl px-2"
              />
              {errors.name && (
                <p>{errors.name.message || "Provide your fullname"}</p>
              )}
            </div>
            <div className="flex flex-col gap-2 w-full">
              <label htmlFor="email">
                Email<span className="text-red-600">*</span>
              </label>
              <input
                type="email"
                {...register("email", { required: true })}
                placeholder="example@gmail.com"
                className="w-full h-[44px] outline-none border border-muted-foreground rounded-xl px-2"
              />
              {errors.email && (
                <p>{errors.email.message || "email required"}</p>
              )}
            </div>
            <div className="flex flex-col gap-2 w-full">
              <label htmlFor="cover_letter">
                Cover Letter<span className="text-red-600">*</span>
              </label>
              <Textarea
                cols={3}
                rows={4}
                typeof="text"
                {...register("cover_letter", {
                  required: true,
                  minLength: 300,
                  maxLength: 1000,
                })}
                placeholder="Write a cover letter"
                className="w-full h-30 !outline-none border border-muted-foreground rounded-xl px-2 "
              />
              {errors.cover_letter && (
                <p>{errors.cover_letter.message || "cover letter required"}</p>
              )}
            </div>
            <div className=" h-fit flex flex-col gap-2">
              <label
                htmlFor="resume"
                className={`block w-full border  p-2 ${
                  dragging ? "border-dashed" : "border-[#CCCDCE]"
                } rounded-[10px] h-[111px] cursor-pointer`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <div className="w-full h-full flex flex-col gap-2 justify-center items-center">
                  {fileName ? (
                    <span className=" text-sm truncate">{fileName}</span>
                  ) : (
                    <>
                      <p>
                        <Cloud />
                      </p>
                      <span className="dark:text-muted-foreground  text-sm">
                        Drag and Drop or Upload your resume
                      </span>
                    </>
                  )}
                </div>
              </label>
              <input
                type="file"
                {...register("resume", { required: true })}
                id="resume"
                accept=".pdf, .doc, .docx,,"
                className="hidden"
                onChange={handleFileChange}
              />
            </div>
            <div className="flex  items-center gap-2">
              <Button
                type="button"
                variant={"ghost"}
                size={"lg"}
                className="border border-muted-foreground"
                onClick={handleCancel}
              >
                Cancel
              </Button>
              <Button type="submit" variant={"default"} size={"lg"}>
                Submit
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AppliciationForm;

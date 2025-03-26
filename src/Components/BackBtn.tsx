"use client";
import React from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { FaAngleLeft } from "react-icons/fa6";

const BackBtn = () => {
  const router = useRouter();
  return (
    <Button
      onClick={() => router.back()}
      variant={"ghost"}
      className="cursor-pointer"
    >
      <FaAngleLeft size={20} /> Back
    </Button>
  );
};

export default BackBtn;

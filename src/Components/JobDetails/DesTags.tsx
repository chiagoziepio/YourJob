import React from "react";

interface props {
  heading: string;
  subtext: string | number;
}

const DesTags = ({ heading, subtext }: props) => {
  return (
    <div className="w-[230px] h-[70px] dark:bg-gray-300 bg-black/40 flex flex-col p-2 gap-1 rounded-xl">
      <p className="text-base dark:text-black/65 text-white/45 open-sans-semibold">
        {heading}
      </p>
      <span className="poppins-regular text-base">
        {heading === "Client's budget" && "$"}
        {subtext}
      </span>
    </div>
  );
};

export default DesTags;

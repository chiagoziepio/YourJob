import React from "react";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";

const SiteFilter = ({
  setJobMode,
}: {
  setJobMode: React.Dispatch<React.SetStateAction<number | string>>;
}) => {
  return (
    <div>
      <p className="text-sm text-muted-foreground open-sans-regular my-1.5">
        Job Mode
      </p>
      <RadioGroup defaultValue="it">
        <div
          onClick={() => setJobMode("")}
          className="flex items-center space-x-2"
        >
          <RadioGroupItem value="it" id="all" />
          <label htmlFor="all">All</label>
        </div>
        <div
          onClick={() => setJobMode(0)}
          className="flex items-center space-x-2 cursor-pointer"
        >
          <RadioGroupItem value="0" id="onsite" />
          <label htmlFor="onsite">OnSite</label>
        </div>
        <div
          onClick={() => setJobMode(1)}
          className="flex items-center space-x-2 cursor-pointer"
        >
          <RadioGroupItem value="1" id="remote" />
          <label htmlFor="remote">Remote</label>
        </div>
      </RadioGroup>
    </div>
  );
};

export default SiteFilter;

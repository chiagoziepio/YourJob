import React from "react";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";

const SalaryFilter = ({
  setSalary,
}: {
  setSalary: React.Dispatch<React.SetStateAction<string>>;
}) => {
  return (
    <div>
      <p className="text-sm text-muted-foreground open-sans-regular my-1.5">
        Salary ranges
      </p>
      <RadioGroup defaultValue="">
        <div
          onClick={() => setSalary("")}
          className="flex items-center space-x-2 cursor-pointer"
        >
          <RadioGroupItem value="" id="all" />
          <label htmlFor="all">All</label>
        </div>
        <div
          onClick={() => setSalary("56821_76953")}
          className="flex items-center space-x-2 cursor-pointer"
        >
          <RadioGroupItem value="56821_76953" id="option-one" />
          <label htmlFor="option-one">$56821 to $76953</label>
        </div>
        <div
          onClick={() => setSalary("89838_97281")}
          className="flex items-center space-x-2 cursor-pointer"
        >
          <RadioGroupItem value="89838_97281" id="option-two" />
          <label htmlFor="option-two">$89838 to $97281 </label>
        </div>
        <div
          onClick={() => setSalary("105712_118078")}
          className="flex items-center space-x-2 cursor-pointer"
        >
          <RadioGroupItem value="105712_118078" id="option-three" />
          <label htmlFor="option-three">$105712 to $118078 </label>
        </div>
        <div
          onClick={() => setSalary("119308_129308")}
          className="flex items-center space-x-2 cursor-pointer"
        >
          <RadioGroupItem value="119308_129308" id="option-four" />
          <label htmlFor="option-four">$119308 to $129308 </label>
        </div>
      </RadioGroup>
    </div>
  );
};

export default SalaryFilter;

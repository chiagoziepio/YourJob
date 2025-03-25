import React from "react";
import { IoIosSearch } from "react-icons/io";
interface Props {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}

const SearchInput = ({ search, setSearch }: Props) => {
  return (
    <div className="flex md:w-[350px] w-[200px] h-fit  items-center gap-2  p-2 rounded-[30px] bg-gray-200 dark:bg-transparent dark:border-gray-100 border-[1px]">
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="h-8 flex-1 outline-none border-none"
        placeholder="Search for jobs"
      />
      <IoIosSearch size={20} />
    </div>
  );
};

export default SearchInput;
